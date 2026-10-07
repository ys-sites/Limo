import fs from 'fs';

async function fetchVehicle(url, name) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    const imgs = [...html.matchAll(/https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp)/gi)].map(m => m[0]);
    console.log(`=== ${name} ===`);
    console.log([...new Set(imgs)].filter(u => u.includes('wp-content')).join('\n'));
  } catch(e) {
    console.error(e);
  }
}

async function main() {
  await fetchVehicle('https://limoraf.com/en/cadillac-escalade/', 'Cadillac Escalade');
  await fetchVehicle('https://limoraf.com/en/gmc-yukon-denali/', 'GMC Yukon Denali');
  await fetchVehicle('https://limoraf.com/en/cadillac-xt6/', 'Cadillac XT6');
}

main();
