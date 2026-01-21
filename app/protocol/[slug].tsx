import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { AlertTriangle } from 'lucide-react-native';
import { getProtocol } from '@/lib/protocols';

export default function ProtocolScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const protocol = getProtocol(slug || '');

  if (!protocol) {
    return (
      <>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <View className="flex-1 bg-gray-50 items-center justify-center p-4">
          <Text className="text-gray-500">Protocol not found</Text>
          <Text className="text-gray-400 text-sm mt-2">Looking for: {slug}</Text>
        </View>
      </>
    );
  }

  const severityColors: Record<string, string> = {
    critical: '#dc2626',
    urgent: '#f97316',
    standard: '#3b82f6',
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: protocol.title,
          headerStyle: {
            backgroundColor: severityColors[protocol.severity] || '#3b82f6',
          },
          headerTintColor: '#ffffff',
        }}
      />
      <ScrollView className="flex-1 bg-white">
        {protocol.severity === 'critical' && (
          <View className="bg-red-50 border-b border-red-200 px-4 py-3 flex-row items-center">
            <AlertTriangle size={20} color="#dc2626" />
            <Text className="text-red-800 font-medium ml-2">Critical - Time Sensitive</Text>
          </View>
        )}

        <View className="p-4">
          <MarkdownRenderer content={protocol.content} />
        </View>
      </ScrollView>
    </>
  );
}

// Helper to parse inline bold (**text**) formatting
function parseInlineFormatting(text: string, baseKey: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={`${baseKey}-${idx}`} className="font-semibold">
          {part.slice(2, -2)}
        </Text>
      );
    }
    return part;
  });
}

// Enhanced markdown renderer with support for custom blocks
function MarkdownRenderer({ content }: { content: string }) {
  // Remove frontmatter if present
  const cleanContent = content.replace(/^---[\s\S]*?---\n/, '');
  const lines = cleanContent.split('\n');

  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Handle custom blocks (:::warning, :::checklist, etc.)
    if (line.startsWith(':::')) {
      const blockType = line.slice(3).split('[')[0].trim();
      const blockLines: string[] = [];
      i++;

      while (i < lines.length && !lines[i].startsWith(':::')) {
        blockLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing :::

      const blockContent = blockLines.join('\n');

      if (blockType === 'warning') {
        elements.push(
          <View key={`block-${i}`} className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4 rounded-r-lg">
            <View className="flex-row items-center mb-2">
              <AlertTriangle size={18} color="#f59e0b" />
              <Text className="ml-2 font-bold text-amber-800">Warning</Text>
            </View>
            <Text className="text-amber-900">{parseInlineFormatting(blockContent.trim(), `warn-${i}`)}</Text>
          </View>
        );
      } else if (blockType === 'checklist') {
        elements.push(
          <View key={`block-${i}`} className="bg-gray-50 p-4 my-4 rounded-lg">
            {blockLines.filter(l => l.trim()).map((item, idx) => (
              <View key={idx} className="flex-row items-start py-1">
                <Text className="text-gray-400 mr-2">☐</Text>
                <Text className="flex-1 text-gray-700">{parseInlineFormatting(item.replace(/^-\s*\[\s*\]\s*/, '').trim(), `check-${i}-${idx}`)}</Text>
              </View>
            ))}
          </View>
        );
      } else if (blockType === 'dosage') {
        elements.push(
          <View key={`block-${i}`} className="bg-blue-50 p-4 my-4 rounded-lg">
            <Text className="font-semibold text-blue-800 mb-2">Dosing Information</Text>
            {blockLines.filter(l => l.trim() && !l.includes('---')).map((row, idx) => {
              const cells = row.split('|').filter(c => c.trim());
              if (cells.length === 0) return null;
              return (
                <View key={idx} className="flex-row border-b border-blue-100 py-2">
                  {cells.map((cell, j) => (
                    <Text key={j} className="flex-1 text-sm text-blue-900">{cell.trim()}</Text>
                  ))}
                </View>
              );
            })}
          </View>
        );
      } else if (blockType.startsWith('evacuation')) {
        const level = line.match(/\[(\w+)\]/)?.[1] || 'standard';
        const levelColors: Record<string, { bg: string; border: string; text: string }> = {
          immediate: { bg: 'bg-red-50', border: 'border-red-600', text: 'text-red-900' },
          urgent: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-900' },
          delayed: { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-900' },
        };
        const colors = levelColors[level] || { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-900' };
        elements.push(
          <View key={`block-${i}`} className={`${colors.bg} border-l-4 ${colors.border} p-4 my-4 rounded-r-lg`}>
            <Text className={`font-bold ${colors.text} mb-2`}>Evacuation: {level.charAt(0).toUpperCase() + level.slice(1)}</Text>
            <Text className={colors.text}>{parseInlineFormatting(blockContent.trim(), `evac-${i}`)}</Text>
          </View>
        );
      } else {
        // Generic block
        elements.push(
          <View key={`block-${i}`} className="bg-gray-100 p-4 my-4 rounded-lg">
            <Text className="text-gray-700">{parseInlineFormatting(blockContent.trim(), `block-${i}`)}</Text>
          </View>
        );
      }
      continue;
    }

    // Regular markdown parsing
    if (line.startsWith('# ')) {
      elements.push(
        <Text key={i} className="text-2xl font-bold text-gray-900 mb-4 mt-2">
          {line.slice(2)}
        </Text>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <Text key={i} className="text-xl font-semibold text-gray-800 mb-3 mt-6 pb-2 border-b border-gray-200">
          {line.slice(3)}
        </Text>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <Text key={i} className="text-lg font-medium text-gray-700 mb-2 mt-4">
          {line.slice(4)}
        </Text>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <View key={i} className="flex-row mb-1 pl-2">
          <Text className="text-gray-400 mr-2">•</Text>
          <Text className="flex-1 text-gray-700">{parseInlineFormatting(line.slice(2), `list-${i}`)}</Text>
        </View>
      );
    } else if (line.startsWith('|')) {
      const cells = line.split('|').filter(c => c.trim());
      if (!cells.some(c => c.includes('---'))) {
        elements.push(
          <View key={i} className="flex-row border-b border-gray-100 py-2">
            {cells.map((cell, j) => (
              <Text key={j} className="flex-1 text-sm text-gray-700 px-1">
                {parseInlineFormatting(cell.trim(), `table-${i}-${j}`)}
              </Text>
            ))}
          </View>
        );
      }
    } else if (line.match(/^\d+\./)) {
      elements.push(
        <View key={i} className="flex-row mb-1 pl-2">
          <Text className="text-gray-400 mr-2 w-5">{line.match(/^\d+/)?.[0]}.</Text>
          <Text className="flex-1 text-gray-700">{parseInlineFormatting(line.replace(/^\d+\.\s*/, ''), `num-${i}`)}</Text>
        </View>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <Text key={i} className="font-semibold text-gray-800 mb-1 mt-3">
          {line.slice(2, -2)}
        </Text>
      );
    } else if (line.trim() === '') {
      elements.push(<View key={i} className="h-2" />);
    } else if (line.trim()) {
      elements.push(
        <Text key={i} className="text-gray-700 mb-1 leading-6">
          {parseInlineFormatting(line, `text-${i}`)}
        </Text>
      );
    }

    i++;
  }

  return <View>{elements}</View>;
}
