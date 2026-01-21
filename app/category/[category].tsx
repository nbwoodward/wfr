import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Link, Stack } from 'expo-router';
import { AlertTriangle } from 'lucide-react-native';

// Placeholder data - will be replaced with content loader
const categoryData: Record<string, { name: string; color: string; protocols: { slug: string; title: string; summary: string; severity: string }[] }> = {
  assessment: {
    name: 'Patient Assessment',
    color: '#dc2626',
    protocols: [
      { slug: 'abcde', title: 'ABCDE Assessment', summary: 'Primary survey: Airway, Breathing, Circulation, Disability, Exposure', severity: 'standard' },
      { slug: 'sample', title: 'SAMPLE History', summary: 'Signs/symptoms, Allergies, Medications, Past history, Last oral intake, Events', severity: 'standard' },
      { slug: 'opqrst', title: 'OPQRST Pain Assessment', summary: 'Onset, Provocation, Quality, Radiation, Severity, Time', severity: 'standard' },
    ],
  },
  medical: {
    name: 'Medical Emergencies',
    color: '#f97316',
    protocols: [
      { slug: 'anaphylaxis', title: 'Anaphylaxis', summary: 'Life-threatening allergic reaction requiring immediate epinephrine', severity: 'critical' },
      { slug: 'asthma', title: 'Asthma', summary: 'Acute bronchospasm and respiratory distress', severity: 'urgent' },
      { slug: 'cardiac', title: 'Cardiac Emergencies', summary: 'Chest pain, heart attack, cardiac arrest', severity: 'critical' },
      { slug: 'diabetic', title: 'Diabetic Emergencies', summary: 'Hypoglycemia and hyperglycemia', severity: 'urgent' },
      { slug: 'seizures', title: 'Seizures', summary: 'Convulsive and non-convulsive seizure management', severity: 'urgent' },
      { slug: 'stroke', title: 'Stroke', summary: 'Recognition and response to cerebrovascular accident', severity: 'critical' },
    ],
  },
  trauma: {
    name: 'Trauma',
    color: '#8b5cf6',
    protocols: [
      { slug: 'bleeding-control', title: 'Bleeding Control', summary: 'Direct pressure, wound packing, tourniquet application', severity: 'critical' },
      { slug: 'wound-care', title: 'Wound Care', summary: 'Cleaning, irrigation, and dressing wounds', severity: 'standard' },
      { slug: 'fractures', title: 'Fractures & Dislocations', summary: 'Splinting and immobilization techniques', severity: 'urgent' },
      { slug: 'spinal', title: 'Spinal Injuries', summary: 'Assessment and immobilization of potential spine injuries', severity: 'critical' },
    ],
  },
  environmental: {
    name: 'Environmental',
    color: '#0891b2',
    protocols: [
      { slug: 'hypothermia', title: 'Hypothermia', summary: 'Core body temperature below 95°F (35°C)', severity: 'critical' },
      { slug: 'hyperthermia', title: 'Hyperthermia', summary: 'Heat exhaustion and heat stroke', severity: 'critical' },
      { slug: 'altitude', title: 'Altitude Illness', summary: 'AMS, HACE, and HAPE recognition and treatment', severity: 'urgent' },
      { slug: 'lightning', title: 'Lightning Injuries', summary: 'Assessment and treatment of lightning strike victims', severity: 'critical' },
      { slug: 'bites-stings', title: 'Bites & Stings', summary: 'Snake, spider, insect, and marine envenomation', severity: 'urgent' },
    ],
  },
  evacuation: {
    name: 'Evacuation',
    color: '#16a34a',
    protocols: [
      { slug: 'decision-making', title: 'Evacuation Decision Making', summary: 'When and how urgently to evacuate a patient', severity: 'standard' },
    ],
  },
};

const severityColors = {
  critical: '#dc2626',
  urgent: '#f97316',
  standard: '#3b82f6',
};

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const data = categoryData[category || ''];

  if (!data) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-4">
        <Text className="text-gray-500">Category not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: data.name,
          headerStyle: { backgroundColor: data.color },
          headerTintColor: '#ffffff',
        }}
      />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="p-4">
          <View className="gap-3">
            {data.protocols.map((protocol) => (
              <Link key={protocol.slug} href={`/protocol/${protocol.slug}` as any} asChild>
                <Pressable className="bg-white rounded-xl p-4 active:opacity-70 shadow-sm">
                  <View className="flex-row items-start">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-1">
                        <Text className="text-lg font-semibold text-gray-900">
                          {protocol.title}
                        </Text>
                        {protocol.severity === 'critical' && (
                          <AlertTriangle size={16} color={severityColors.critical} className="ml-2" />
                        )}
                      </View>
                      <Text className="text-sm text-gray-500">
                        {protocol.summary}
                      </Text>
                    </View>
                    <View
                      className="px-2 py-1 rounded-full ml-2"
                      style={{ backgroundColor: `${severityColors[protocol.severity as keyof typeof severityColors]}15` }}
                    >
                      <Text
                        className="text-xs font-medium capitalize"
                        style={{ color: severityColors[protocol.severity as keyof typeof severityColors] }}
                      >
                        {protocol.severity}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
