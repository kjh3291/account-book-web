// Capacitor의 webDir(www/)에 넣을 실제 앱 런타임 파일만 복사합니다.
// index.html/script.js 등 원본은 프로젝트 루트에 그대로 두고(Live Server 등 웹 개발용),
// www/는 매 실행마다 새로 생성되는 빌드 산출물이라 git에 커밋하지 않습니다.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'www');

const entries = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'service-worker.js',
  'icons',
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  const src = path.join(root, entry);
  if (!fs.existsSync(src)) {
    console.warn(`[build-www] skip missing: ${entry}`);
    continue;
  }
  fs.cpSync(src, path.join(outDir, entry), { recursive: true });
}

console.log(`[build-www] wrote ${entries.length} entries to ${path.relative(root, outDir)}/`);
