/**
 * Generate content index from markdown files
 * Run with: npx ts-node scripts/generate-content-index.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

interface ProtocolIndex {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  severity: string;
  evacuate: string;
  quickRef: boolean;
  order: number;
}

interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  function walkDir(currentDir: string) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  walkDir(dir);
  return files;
}

function getCategoryFiles(dir: string): string[] {
  const files: string[] = [];

  function walkDir(currentDir: string) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (item === '_category.json') {
        files.push(fullPath);
      }
    }
  }

  walkDir(dir);
  return files;
}

async function generateIndex() {
  const contentDir = path.join(__dirname, '../content');
  const outputDir = path.join(__dirname, '../src/lib');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const markdownFiles = getAllMarkdownFiles(contentDir);
  const categoryFiles = getCategoryFiles(contentDir);

  const protocols: ProtocolIndex[] = [];
  const categories: Record<string, Category> = {};

  // Process markdown files
  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);

    if (!data.slug || !data.title) {
      console.warn(`Skipping ${file}: missing required frontmatter (slug, title)`);
      continue;
    }

    protocols.push({
      slug: data.slug,
      title: data.title,
      category: data.category || 'uncategorized',
      tags: data.tags || [],
      summary: data.summary || '',
      severity: data.severity || 'standard',
      evacuate: data.evacuate || 'varies',
      quickRef: data.quickRef || false,
      order: data.order ?? 999,
    });

    console.log(`Indexed: ${data.title} (${data.slug})`);
  }

  // Process category files
  for (const file of categoryFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(content) as Category;

    if (data.slug) {
      categories[data.slug] = data;
      console.log(`Category: ${data.name} (${data.slug})`);
    }
  }

  // Sort protocols by category and order
  protocols.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.order - b.order;
  });

  const output = {
    protocols,
    categories,
    generatedAt: new Date().toISOString(),
  };

  const outputPath = path.join(outputDir, 'content-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\nGenerated content index with ${protocols.length} protocols and ${Object.keys(categories).length} categories`);
  console.log(`Output: ${outputPath}`);
}

generateIndex().catch(console.error);
