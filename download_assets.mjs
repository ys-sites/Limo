import fs from 'fs';
import path from 'path';

const urls = [
  'https://limoraf.com/wp-content/uploads/2023/07/logo-limo-raf.png',
  'https://limoraf.com/wp-content/uploads/2023/07/logo-18.png',
  'https://limoraf.com/wp-content/uploads/2023/07/1-slide-escalade.jpg',
  'https://limoraf.com/wp-content/uploads/2023/07/1-slide-gmc-yukon-limo-0.jpg',
  'https://limoraf.com/wp-content/uploads/2023/07/Cadillac-xt6-min.jpg',
  'https://limoraf.com/wp-content/uploads/2026/05/chauffeur-voiture-de-luxe.png',
  'https://limoraf.com/wp-content/uploads/2026/06/service-limo.png',
  'https://limoraf.com/wp-content/uploads/2023/07/Airport-transfert-1.jpg',
  'https://limoraf.com/wp-content/uploads/2023/07/personnel-3.1.1.jpg',
  'https://limoraf.com/wp-content/uploads/2023/07/personnel-4-1-1.jpg',
  'https://limoraf.com/wp-content/uploads/2023/07/personnel-8-1.jpg',
  'https://limoraf.com/wp-content/uploads/2023/07/personne-9.jpg',
  'https://limoraf.com/wp-content/uploads/2023/07/wordwide-768x576-1.jpg'
];

const destDir = path.join(process.cwd(), 'public', 'client_assets');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

async function downloadAll() {
  for (const url of urls) {
    try {
      const filename = path.basename(url);
      const dest = path.join(destDir, filename);
      console.log(`Downloading ${url}...`);
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        console.warn(`Failed ${url}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${filename} (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${url}:`, e.message);
    }
  }
}

downloadAll();
