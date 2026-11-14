// Node.js 20+. Pobiera graficzne pliki opublikowanego dema SOLIDOM.
// Dokumentację i aktualną paczkę ZIP zachowujemy również na Dysku Google.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const source = "https://solidom.vercel.app/";
const names = [
  'assets/contact.webp',
  'assets/facade.webp',
  'assets/favicon.svg',
  'assets/hero.webp',
  'assets/house-build.webp',
  'assets/installations.webp',
  'assets/interior-design.webp',
  'assets/interior-finish.webp',
  'assets/og-preview.jpg',
  'assets/project-bath.webp',
  'assets/project-build.webp',
  'assets/project-house.webp',
  'assets/project-living.webp',
  'assets/project-management.webp',
  'assets/renovation.webp',
  'assets/team-lead.webp',
  'assets/team.webp',
  'icons/icon-192.png', 'icons/icon-512.png'
];
for (const name of names) {
  const response = await fetch(new URL(name, source));
  if (!response.ok) throw Error(name + ": HTTP " + response.status);
  await mkdir(path.dirname(name), {recursive: true});
  await writeFile(name, Buffer.from(await response.arrayBuffer()));
  console.log("Pobrano", name);
}
