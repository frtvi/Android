import './gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProviderList } from './teste';
import MessageModal from './MessageModal';
import { initDatabase, registerUser, authenticateUser } from './database'; // Importando funções do banco de dados

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

  // State for custom message modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showMessage = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideMessage = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Initialize the database when the component mounts
    initDatabase().catch(error => {
      console.error('Failed to initialize database:', error);
      showMessage('Erro no Banco de Dados', 'Não foi possível inicializar o banco de dados.');
    });
  }, []);

  const handleLogin = async () => {
    try {
      const authenticated = await authenticateUser(username, password);
      if (authenticated) {
        setIsLoggedIn(true);
      } else {
        showMessage('Falha no Login', 'Credenciais inválidas, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      showMessage('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };

  const handleNavigate = () => {
    if (inputUrl.trim() === '') {
      showMessage('Erro', 'Por favor, insira um URL válido.');
      return;
    }
    const formattedUrl = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
    setUrl(formattedUrl);
  };

  const handleBack = () => {
    if (webViewRef.current && canGoBack) {
      (webViewRef.current as WebView).goBack();
    }
  };

  const handleForward = () => {
    if (webViewRef.current && canGoForward) {
      (webViewRef.current as WebView).goForward();
    }
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require('./assets/RedMoonPNG.png')} // Usando a imagem local
          style={styles.image}
        />
        <Text style={styles.title}>RedMoon Browser</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Não tem uma conta? Registre-se</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>RedMoon 2025</Text>

        <MessageModal
          visible={modalVisible}
          title={modalTitle}
          message={modalMessage}
          onClose={hideMessage}
        />
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
          placeholder="Inserir URL"
          value={inputUrl}
          onChangeText={setInputUrl}
          onSubmitEditing={handleNavigate}
          autoCapitalize="none"
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
  const [username, setUsername] = useState(''); // Adicionado para o registro
  const [password, setPassword] = useState('');

  // State for custom message modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showMessage = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideMessage = () => {
    setModalVisible(false);
  };

  const handleRegister = async () => {
    if (firstName && lastName && email && username && password) {
      try {
        const success = await registerUser(username, password, email, firstName, lastName);
        if (success) {
          showMessage('Registro Bem-Sucedido', 'Você se registrou com sucesso!');
          navigation.navigate('Login');
        } else {
          showMessage('Erro no Registro', 'Não foi possível registrar o usuário.');
        }
      } catch (error: any) {
        console.error('Erro ao registrar usuário:', error);
        showMessage('Erro no Registro', error.message || 'Ocorreu um erro ao registrar o usuário.');
      }
    } else {
      showMessage('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Primeiro Nome"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Último Nome"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.registerLink}>Voltar para o Login</Text>
      </TouchableOpacity>

      <MessageModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        onClose={hideMessage}
      />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProviderList> {/* Wrapping the NavigationContainer with AuthProviderList */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProviderList>
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
