import { View, Text, ScrollView, Pressable } from 'react-native';
import { ChevronRight, Bookmark, Info, FileText, ExternalLink } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
          <Pressable className="p-4 flex-row items-center border-b border-gray-100 active:bg-gray-50">
            <View className="w-10 h-10 rounded-lg bg-blue-50 items-center justify-center mr-3">
              <Bookmark size={20} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">Bookmarks</Text>
              <Text className="text-sm text-gray-500">Your saved protocols</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>
        </View>

        <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2 px-1">
          About
        </Text>
        <View className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
          <View className="p-4 border-b border-gray-100">
            <Text className="text-base font-medium text-gray-900">WildMed</Text>
            <Text className="text-sm text-gray-500">Version 1.0.0</Text>
          </View>
          <Pressable className="p-4 flex-row items-center border-b border-gray-100 active:bg-gray-50">
            <Info size={20} color="#6b7280" className="mr-3" />
            <Text className="flex-1 text-base text-gray-900 ml-3">About</Text>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>
          <Pressable className="p-4 flex-row items-center border-b border-gray-100 active:bg-gray-50">
            <FileText size={20} color="#6b7280" className="mr-3" />
            <Text className="flex-1 text-base text-gray-900 ml-3">Disclaimer</Text>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>
          <Pressable className="p-4 flex-row items-center active:bg-gray-50">
            <ExternalLink size={20} color="#6b7280" className="mr-3" />
            <Text className="flex-1 text-base text-gray-900 ml-3">Source Code</Text>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>
        </View>

        <View className="px-4 py-6">
          <Text className="text-center text-sm text-gray-400">
            This app is for educational reference only.{'\n'}
            Always follow your training and local protocols.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
