import fs from 'fs';
import path from 'path';

// Delete package-lock.json and yarn.lock if they exist in the root
['package-lock.json', 'yarn.lock'].forEach(f => {
  const filePath = path.resolve(f);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Removed ${f}`);
    } catch (e) {
      console.warn(`Could not remove ${f}:`, e.message);
    }
  }
});

// Enforce use of pnpm
const userAgent = process.env.npm_config_user_agent || '';
const execPath = process.env.npm_execpath || '';
const hasPnpmEnv = Object.keys(process.env).some(key => key.toLowerCase().includes('pnpm'));

const isPnpm = userAgent.startsWith('pnpm/') || 
               execPath.toLowerCase().includes('pnpm') || 
               hasPnpmEnv;

if (!isPnpm) {
  console.error('\x1b[31m%s\x1b[0m', `Error: Use pnpm instead of npm or yarn.`);
  process.exit(1);
}
