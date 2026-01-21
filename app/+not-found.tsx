import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center p-5 bg-gray-50">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Page Not Found
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          The page you're looking for doesn't exist.
        </Text>
        <Link href="/" className="py-3 px-6 bg-red-600 rounded-lg">
          <Text className="text-white font-medium">Go to Home</Text>
        </Link>
      </View>
    </>
  );
}
