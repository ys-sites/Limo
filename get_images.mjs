import fs from 'fs';

const html1 = fs.readFileSync('limoraf_fr.html', 'utf8');
const html2 = fs.readFileSync('limoraf_en.html', 'utf8');
const allHtml = html1 + html2;

const matches = allHtml.match(/https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp)/gi) || [];
const unique = [...new Set(matches)];
console.log('Total images found:', unique.length);
console.log(unique.filter(u => u.includes('wp-content')).join('\n'));
