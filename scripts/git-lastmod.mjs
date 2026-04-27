#!/usr/bin/env node
// Prebuild script: generate git-lastmod.json mapping file paths to last commit timestamps
import { execSync } from 'node:child_process';
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

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
    // Get the last commit timestamp for this file
    const stdout = execSync('git log -1 --format="%aI" -- "' + file + '"', {
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
    if (stdout) {
      lastmod[file] = stdout;
    }
  } catch {
    // File might not be committed yet, skip
  }
}

writeFileSync(outputFile, JSON.stringify(lastmod, null, 2));
console.log(`✅ Generated ${outputFile} with ${Object.keys(lastmod).length} entries`);
