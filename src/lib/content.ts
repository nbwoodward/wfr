import contentIndex from './content-index.json';
import type { ProtocolIndex, Category, ContentIndex } from '../types/protocol';

// Type assertion for the JSON import
const index = contentIndex as ContentIndex;

/**
 * Get all protocols from the content index
 */
export function getAllProtocols(): ProtocolIndex[] {
  return index.protocols;
}

/**
 * Get a protocol by its slug
 */
export function getProtocolMeta(slug: string): ProtocolIndex | undefined {
  return index.protocols.find((p) => p.slug === slug);
}

/**
 * Get all protocols for a specific category
 */
export function getProtocolsByCategory(category: string): ProtocolIndex[] {
  return index.protocols
    .filter((p) => p.category === category)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get protocols marked as quickRef
 */
export function getQuickRefProtocols(): ProtocolIndex[] {
  return index.protocols
    .filter((p) => p.quickRef)
    .sort((a, b) => a.order - b.order);
}

/**
 * Search protocols by query string
 */
export function searchProtocols(query: string): ProtocolIndex[] {
  if (!query.trim()) {
    return index.protocols;
  }

  const q = query.toLowerCase().trim();

  return index.protocols.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return Object.values(index.categories).sort((a, b) => a.order - b.order);
}

/**
 * Get a category by its slug
 */
export function getCategory(slug: string): Category | undefined {
  return index.categories[slug];
}

/**
 * Get the severity color for a protocol
 */
export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: '#dc2626',
    urgent: '#f97316',
    standard: '#3b82f6',
  };
  return colors[severity] || colors.standard;
}

/**
 * Get the evacuation color for a protocol
 */
export function getEvacuationColor(evacuate: string): string {
  const colors: Record<string, string> = {
    immediate: '#dc2626',
    urgent: '#f97316',
    delayed: '#eab308',
    'field-treatable': '#22c55e',
    varies: '#6b7280',
  };
  return colors[evacuate] || colors.varies;
}
