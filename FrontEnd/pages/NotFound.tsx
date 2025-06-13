import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const NotFound = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', route.name);
  }, [route.name]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.message}>Oops! Page not found</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.link}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // gray-100
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 20,
    color: '#4b5563', // gray-600
    marginBottom: 16,
  },
  link: {
    fontSize: 16,
    color: '#3b82f6', // blue-500
    textDecorationLine: 'underline',
  },
});
