import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

import { AuthScreen } from '@/components/AuthScreen';
import { BrowserInterface } from '@/components/BrowserInterface';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe?.(); // Verifica se unsubscribe existe
    };
  }, []);

  const handleAuthSuccess = () => {
    // Nada aqui: o listener de auth já cuida disso
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return user ? (
    <BrowserInterface />
  ) : (
    <AuthScreen onAuthSuccess={handleAuthSuccess} />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a237e', // azul escuro
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 18,
  },
});

export default Index;
