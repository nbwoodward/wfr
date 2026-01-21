export type Severity = 'critical' | 'urgent' | 'standard';
export type EvacuationLevel = 'immediate' | 'urgent' | 'delayed' | 'field-treatable' | 'varies';

export interface ProtocolFrontmatter {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  severity: Severity;
  lastUpdated: string;
  version: string;
  quickRef: boolean;
  order: number;
  summary: string;
  evacuate: EvacuationLevel;
  subcategory?: string;
}

export interface Protocol extends ProtocolFrontmatter {
  content: string;
}

export interface ProtocolIndex {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  severity: Severity;
  evacuate: EvacuationLevel;
  quickRef: boolean;
  order: number;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface ContentIndex {
  protocols: ProtocolIndex[];
  categories: Record<string, Category>;
  generatedAt: string;
}
