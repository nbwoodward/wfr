// Protocol content - loaded from markdown files
// This file maps slugs to their content

import matter from 'gray-matter';

// Import all markdown files as raw text
// @ts-ignore - markdown files imported as strings
import abcdeRaw from '../../content/assessment/abcde.md';
// @ts-ignore
import sampleRaw from '../../content/assessment/sample.md';
// @ts-ignore
import opqrstRaw from '../../content/assessment/opqrst.md';
// @ts-ignore
import anaphylaxisRaw from '../../content/medical/anaphylaxis.md';
// @ts-ignore
import asthmaRaw from '../../content/medical/asthma.md';
// @ts-ignore
import cardiacRaw from '../../content/medical/cardiac.md';
// @ts-ignore
import diabeticRaw from '../../content/medical/diabetic.md';
// @ts-ignore
import seizuresRaw from '../../content/medical/seizures.md';
// @ts-ignore
import strokeRaw from '../../content/medical/stroke.md';
// @ts-ignore
import bleedingControlRaw from '../../content/trauma/bleeding-control.md';
// @ts-ignore
import woundCareRaw from '../../content/trauma/wound-care.md';
// @ts-ignore
import fracturesRaw from '../../content/trauma/fractures.md';
// @ts-ignore
import spinalRaw from '../../content/trauma/spinal.md';
// @ts-ignore
import hypothermiaRaw from '../../content/environmental/hypothermia.md';
// @ts-ignore
import hyperthermiaRaw from '../../content/environmental/hyperthermia.md';
// @ts-ignore
import altitudeRaw from '../../content/environmental/altitude.md';
// @ts-ignore
import lightningRaw from '../../content/environmental/lightning.md';
// @ts-ignore
import bitesStingsRaw from '../../content/environmental/bites-stings.md';
// @ts-ignore
import decisionMakingRaw from '../../content/evacuation/decision-making.md';

export interface Protocol {
  slug: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  evacuate: string;
  content: string;
  tags: string[];
}

function parseMarkdown(raw: string, slug: string): Protocol {
  try {
    const { data, content } = matter(raw);
    return {
      slug: data.slug || slug,
      title: data.title || slug,
      category: data.category || 'unknown',
      severity: data.severity || 'standard',
      summary: data.summary || '',
      evacuate: data.evacuate || 'varies',
      content: content,
      tags: data.tags || [],
    };
  } catch (e) {
    // If gray-matter fails, return raw content
    return {
      slug,
      title: slug,
      category: 'unknown',
      severity: 'standard',
      summary: '',
      evacuate: 'varies',
      content: raw,
      tags: [],
    };
  }
}

// Parse all protocols
const protocolsMap: Record<string, Protocol> = {
  // Assessment
  'abcde': parseMarkdown(abcdeRaw, 'abcde'),
  'sample': parseMarkdown(sampleRaw, 'sample'),
  'opqrst': parseMarkdown(opqrstRaw, 'opqrst'),
  // Medical
  'anaphylaxis': parseMarkdown(anaphylaxisRaw, 'anaphylaxis'),
  'asthma': parseMarkdown(asthmaRaw, 'asthma'),
  'cardiac': parseMarkdown(cardiacRaw, 'cardiac'),
  'diabetic': parseMarkdown(diabeticRaw, 'diabetic'),
  'seizures': parseMarkdown(seizuresRaw, 'seizures'),
  'stroke': parseMarkdown(strokeRaw, 'stroke'),
  // Trauma
  'bleeding-control': parseMarkdown(bleedingControlRaw, 'bleeding-control'),
  'wound-care': parseMarkdown(woundCareRaw, 'wound-care'),
  'fractures': parseMarkdown(fracturesRaw, 'fractures'),
  'spinal': parseMarkdown(spinalRaw, 'spinal'),
  // Environmental
  'hypothermia': parseMarkdown(hypothermiaRaw, 'hypothermia'),
  'hyperthermia': parseMarkdown(hyperthermiaRaw, 'hyperthermia'),
  'altitude': parseMarkdown(altitudeRaw, 'altitude'),
  'lightning': parseMarkdown(lightningRaw, 'lightning'),
  'bites-stings': parseMarkdown(bitesStingsRaw, 'bites-stings'),
  // Evacuation
  'decision-making': parseMarkdown(decisionMakingRaw, 'decision-making'),
};

export function getProtocol(slug: string): Protocol | undefined {
  return protocolsMap[slug];
}

export function getAllProtocolsContent(): Protocol[] {
  return Object.values(protocolsMap);
}
