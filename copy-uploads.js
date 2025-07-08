import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, 'uploads');
const destDir = path.resolve(__dirname, 'dist/public/uploads');

console.log('Copying uploads to build directory...');

if (fs.existsSync(srcDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('✓ Uploads copied successfully');
} else {
  console.log('⚠ Warning: uploads directory not found');
}