import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Suponha que você tenha esses componentes adaptados para React Native
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Toast notification system (substituto do Toaster/Sonner) */}
      <Toast />

      {/* Navegação principal */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Index} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFound} options={{ title: '404' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
