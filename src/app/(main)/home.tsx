import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';

import { Button } from '@/components/primitives';
import { ROUTES } from '@/constants/routes';
import { toast } from '@/utils';

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

        <Link href={ROUTES.AUTH.LOGIN} asChild>
          <TouchableOpacity className="h-14 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10">
            <Text className="text-lg font-bold text-destructive">Logout (Go to Login)</Text>
          </TouchableOpacity>
        </Link>

        <View className="mt-20 gap-4">
          <Button variant="default" label="Success Toast" onPress={() => toast.success('This is a success toast')} />
          <Button variant="destructive" label="Error Toast" onPress={() => toast.error('This is an error toast')} />
          <Button variant="outline" label="Info Toast" onPress={() => toast.info('This is an info toast')} />
          <Button variant="secondary" label="Warning Toast" onPress={() => toast.warning('This is a warning toast')} />
        </View>
      </View>
    </ScrollView>
  );
}
