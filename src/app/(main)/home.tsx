import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

import { Experiment } from '@/components/common/experiment';
import { ROUTES } from '@/constants/routes';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
      <View className="flex-1 gap-6 p-6 pt-20">
        <View>
          <Text className="text-3xl font-bold text-foreground">Home Page</Text>
          <Text className="text-muted-foreground">You are logged in!</Text>
        </View>

        <View className="rounded-2xl border border-secondary bg-secondary/20 p-6">
          <Text className="mb-2 text-lg font-semibold text-foreground">Welcome to your dashboard</Text>
          <Text className="text-muted-foreground">This is a placeholder for your main application content.</Text>
        </View>

        <Experiment />

        <Link href={ROUTES.AUTH.LOGIN} asChild>
          <TouchableOpacity className="h-14 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10">
            <Text className="text-lg font-bold text-destructive">Logout (Go to Login)</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}
