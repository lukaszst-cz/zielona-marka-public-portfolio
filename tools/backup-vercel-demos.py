#!/usr/bin/env python3
"""Zapisuje zasoby trzech demonstracji, kontrolując SHA1/SHA256."""
import base64, hashlib, io, json, pathlib, re, shutil, stat, time, urllib.request, urllib.parse, zipfile
ROOT=pathlib.Path(__file__).resolve().parents[1]
MAN=json.loads((ROOT/"tools/backup-vercel-demos-manifest.json").read_text())
DEST=ROOT/"demos"
BLOCKED=re.compile("real[\\s_-]?jk", re.I)
TEXT={".html",".js",".mjs",".css",".json",".svg",".txt",".md",".xml",".webmanifest",".yaml",".yml"}
def valid(name):
    p=pathlib.PurePosixPath(name)
    if not name or name.startswith("/") or "\\" in name or any(x in ("",".","..") for x in name.split("/")):
        raise ValueError("Niedozwolona sciezka")
    if any(x in {".git",".github","node_modules","__pycache__",".env",".env.local",".env.production",".npmrc","id_rsa"} for x in p.parts):
        raise ValueError("Niedozwolony plik w archiwum")
    if BLOCKED.search(name): raise ValueError("Material wykluczony z zapisu")
    return p
def save(dest,name,data):
    p=valid(name)
    if p.suffix.lower() in TEXT:
        t=data.decode("utf-8","replace")
        if BLOCKED.search(t): raise ValueError("Material wykluczony w "+str(p))
        if re.search("AKIA[A-Z0-9]{16}|sk-[A-Za-z0-9_-]{30,}",t):
            raise ValueError("Podejrzenie sekretu w "+str(p))
    target=dest.joinpath(*p.parts)
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_bytes(data)
def fetch(url):
    if not (url.startswith("https://") and (".vercel.app/" in url or url.startswith("https://d2ol7oe51mr4n9.cloudfront.net/"))):
        raise ValueError("Niedozwolony host")
    for attempt in range(3):
        try:
            req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 ZielonaMarkaBackup"})
            with urllib.request.urlopen(req,timeout=60) as res:
                if res.status!=200: raise ValueError("HTTP "+str(res.status))
                content=res.read(75000001)
                if not content or len(content)>75000000: raise ValueError("Zly rozmiar pobranego pliku")
                return content
        except Exception:
            if attempt==2: raise
            time.sleep(2*(attempt+1))
def archive_static(p):
    dest=DEST/p["slug"]
    if dest.exists(): shutil.rmtree(dest)
    dest.mkdir(parents=True)
    for f in p["files"]:
        name=str(valid(f["path"]))
        url=p["site"].rstrip("/")+"/"+urllib.parse.quote(name,safe="/")
        data=fetch(url)
        if hashlib.sha1(data).hexdigest()!=f["sha1"]:
            raise ValueError("SHA1 niezgodne: "+p["slug"]+"/"+name)
        save(dest,name,data)
    for f in p.get("inline_files", []):
        data=base64.b64decode(f["data"])
        if hashlib.sha1(data).hexdigest()!=f["sha1"]: raise ValueError("SHA1 config: "+f["path"])
        save(dest,f["path"],data)
    if not (dest/"index.html").is_file(): raise ValueError("Brak index.html")
    note=(("UWAGA: oryginalny plik vercel.json nie jest publiczny. Wymaga osobnego odzyskania.\n")
          if p.get("unavailable_source_files") else "")
    (dest/"README.md").write_text(
        "# "+p["slug"]+"\n\nNieoficjalna demonstracja Zielonej Marki. "+
        "Brak potwierdzonej relacji z rzeczywistą firmą.\n\n"+
        "Podgląd: "+p["site"]+"/\n\nDeployment: "+p["deployment"]+
        "\n\nPliki strony wraz z grafikami sprawdzono SHA1 względem Vercel. "+
        "Manifest: ../../tools/backup-vercel-demos-manifest.json.\n\n"+note+
        "\nFunkcje sprzedażowe, formularze lub katalog mogą być demonstracyjne.\n",encoding="utf-8")
    print("OK",p["slug"],len(p["files"]),"plikow z potwierdzonym SHA1")
def archive_beata(p):
    raw=fetch(p["archive_url"])
    digest=hashlib.sha256(raw).hexdigest()
    if digest!=p["sha256"]: raise ValueError("BEATA: zły SHA256 ZIP")
    dest=DEST/p["slug"]
    if dest.exists(): shutil.rmtree(dest)
    dest.mkdir(parents=True)
    with zipfile.ZipFile(io.BytesIO(raw)) as z:
        files=[]
        for e in z.infolist():
            if e.is_dir() or e.filename.startswith("__MACOSX/") or e.filename.endswith("/.DS_Store"):
                continue
            if stat.S_IFMT(e.external_attr>>16)==stat.S_IFLNK: raise ValueError("Link symboliczny w ZIP")
            name=str(valid(e.filename))
            if e.file_size>50000000: raise ValueError("Plik zbyt duzy")
            files.append((name,e))
        if sum(e.file_size for _,e in files)>100000000: raise ValueError("ZIP za duzy")
        names=[n for n,_ in files]; tops={n.split("/")[0] for n in names}
        strip=next(iter(tops))+"/" if len(tops)==1 and all("/" in n for n in names) else ""
        for name,e in files:
            rel=name[len(strip):]
            if rel: save(dest,rel,z.read(e))
    if not (dest/"index.html").is_file(): raise ValueError("BEATA: brak index.html w archiwum")
    (dest/"README.md").write_text(
        "# BEATA Beauty Atelier\n\nNieoficjalna demonstracja Zielonej Marki.\n\n"+
        "Komplet plików z ZIP używanego w wdrożeniu Vercel, suma SHA256 zweryfikowana.\n"+
        "Podgląd: https://beata-beauty-atelier.vercel.app/\n\n"+
        "Rezerwacje są demonstracyjne i nie wysyłają danych do systemu rezerwacji.\n"+
        "SHA256 ZIP: "+digest+"\n",encoding="utf-8")
    print("OK BEATA",len(files),"plikow, SHA256 potwierdzone")
for p in MAN["projects"]: archive_static(p)
archive_beata(MAN["beata"])
print("KONIEC")
