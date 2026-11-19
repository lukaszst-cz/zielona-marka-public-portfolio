import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=(p)=>fs.readFileSync(path.join(root,p),'utf8');
test('Manifest PWA jest poprawny i zawiera ikony',()=>{
 const m=JSON.parse(read('manifest.webmanifest'));
 assert.equal(m.display,'standalone');assert.equal(m.lang,'pl');assert.equal(m.scope,'/');
 for(const ico of m.icons)assert.ok(fs.statSync(path.join(root,ico.src.slice(1))).size>500);
});
test('Service worker ma aplikacyjny precache i fallback offline',()=>{const sw=read('sw.js');for(const file of ['/','/index.html','/app.js','/core.mjs','/styles.css','/manifest.webmanifest'])assert.ok(sw.includes(file));assert.ok(sw.includes("caches.match('/index.html')"));});
test('Źródła modułów poprawnie importowane przez aplikację',()=>{const app=read('app.js');assert.ok(app.includes("from './core.mjs'"));assert.ok(app.includes("navigator.serviceWorker?.register('/sw.js'"));assert.ok(read('index.html').includes('type="module"'));});
test('Aplikacja deklaruje ograniczenia bezpieczeństwa i noindex',()=>{assert.ok(read('index.html').includes('noindex'));assert.ok(read('app.js').includes('nie jest autoryzacją'));assert.ok(read('vercel.json').includes('frame-ancestors'))});