
import React, { useState, useEffect } from 'react';
import { AuthScreen } from "@/components/AuthScreen";
import { BrowserInterface } from "@/components/BrowserInterface";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    // The auth state change will handle updating the user state
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return user ? (
    <BrowserInterface />
  ) : (
    <AuthScreen onAuthSuccess={handleAuthSuccess} />
  );
};

export default Index;
