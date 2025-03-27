import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Tela de Login
function LoginScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('https://www.google.com');
  const [inputUrl, setInputUrl] = useState('');
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Login Failed', 'Invalid credentials, try again.');
    }
  };

  const handleNavigate = () => {
    if (inputUrl.trim() === '') {
      Alert.alert('Error', 'Please enter a valid URL.');
      return;
    }
    const formattedUrl = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
    setUrl(formattedUrl);
  };

  const handleBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  const handleForward = () => {
    if (webViewRef.current && canGoForward) {
      webViewRef.current.goForward();
    }
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={{ uri: 'https://github.com/frtvi/Android/blob/main/RedMoonPNG.png?raw=true' }}
          style={styles.image}
        />
        <Text style={styles.title}>RedMoon Browser</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>RedMoon 2025</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.browserContainer}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={handleBack} disabled={!canGoBack}>
          <Ionicons name="arrow-back-outline" size={24} color={canGoBack ? "#007AFF" : "#A0A0A0"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForward} disabled={!canGoForward}>
          <Ionicons name="arrow-forward-outline" size={24} color={canGoForward ? "#007AFF" : "#A0A0A0"} />
        </TouchableOpacity>
        <TextInput
          style={styles.urlInput}
          placeholder="Enter URL"
          value={inputUrl}
          onChangeText={setInputUrl}
          onSubmitEditing={handleNavigate}
        />
        <TouchableOpacity onPress={handleNavigate}>
          <Ionicons name="arrow-up-circle-outline" size={30} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <WebView 
        ref={webViewRef}
        source={{ uri: url }} 
        style={{ flex: 1 }} 
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
          setCanGoForward(navState.canGoForward);
        }}
      />
    </SafeAreaView>
  );
}

// Tela de Registro
function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (firstName && lastName && email && password) {
      Alert.alert('Registration Successful', 'You have successfully registered!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.registerLink}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    width: '80%',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
  registerLink: {
    marginTop: 10,
    color: '#007AFF',
    fontSize: 14,
  },
  browserContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  urlInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    marginHorizontal: 10,
  },
});
