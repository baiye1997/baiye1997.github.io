#!/usr/bin/env node
// Prebuild script: generate git-lastmod.json mapping file paths to last commit timestamps
// Usage:
//   node scripts/git-lastmod.mjs                     # Use blog repo git history
//   node scripts/git-lastmod.mjs --vault /tmp/vault  # Use vault repo git history (for CI)
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const vaultIdx = args.indexOf('--vault');
const vaultDir = vaultIdx !== -1 ? args[vaultIdx + 1] : null;

const notesDir = 'src/content/notes';
const outputFile = 'src/data/git-lastmod.json';

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(notesDir);
const lastmod = {};

for (const file of files) {
  try {
    let stdout;
    if (vaultDir) {
      const relPath = file.replace(/^src\/content\/notes\//, '');
      stdout = execFileSync('git', ['-C', vaultDir, 'log', '-1', '--format=%aI', '--', relPath], {
        encoding: 'utf-8',
        timeout: 5000,
      }).trim();
    } else {
      stdout = execFileSync('git', ['log', '-1', '--format=%aI', '--', file], {
        encoding: 'utf-8',
        timeout: 5000,
      }).trim();
    }
    // Validate: must look like an ISO timestamp
    if (stdout && /^\d{4}-\d{2}-\d{2}T/.test(stdout)) {
      lastmod[file] = stdout;
    }
  } catch {
    // File might not be committed yet, skip
  }
}

writeFileSync(outputFile, JSON.stringify(lastmod));
console.log(`✅ Generated ${outputFile} with ${Object.keys(lastmod).length} entries`);
