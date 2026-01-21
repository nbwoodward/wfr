import { View, Text, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { AlertTriangle, Heart, Thermometer, Bone, Truck } from 'lucide-react-native';

const quickActions = [
  {
    title: 'Patient Assessment',
    subtitle: 'ABCDE, SAMPLE, OPQRST',
    icon: Heart,
    color: '#dc2626',
    href: '/category/assessment',
  },
  {
    title: 'Medical Emergencies',
    subtitle: 'Anaphylaxis, Cardiac, Diabetic',
    icon: AlertTriangle,
    color: '#f97316',
    href: '/category/medical',
  },
  {
    title: 'Trauma',
    subtitle: 'Bleeding, Fractures, Spinal',
    icon: Bone,
    color: '#8b5cf6',
    href: '/category/trauma',
  },
  {
    title: 'Environmental',
    subtitle: 'Hypo/Hyperthermia, Altitude',
    icon: Thermometer,
    color: '#0891b2',
    href: '/category/environmental',
  },
  {
    title: 'Evacuation',
    subtitle: 'Decision criteria',
    icon: Truck,
    color: '#16a34a',
    href: '/category/evacuation',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="gap-3">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href as any} asChild>
              <Pressable className="bg-white rounded-xl p-4 flex-row items-center shadow-sm active:opacity-70">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon size={24} color={action.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {action.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {action.subtitle}
                  </Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
