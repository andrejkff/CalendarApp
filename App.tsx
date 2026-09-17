import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { auth } from './firebase';

import RegisterLoginComponent from './components/auth/registerLogin';
import CalendarComponent from './components/calendar/Calendar';
import HeaderComponent from './components/header/Header';
import ProfileComponent from './components/profile/Profile';

import { onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { SCREEN_NAMES } from './constants/appNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [screen, setScreen] = useState<string>(SCREEN_NAMES.CALENDAR);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
      if (!user)
        setScreen(SCREEN_NAMES.AUTH)
      else
        setScreen(SCREEN_NAMES.CALENDAR);
    });
  }, []);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <HeaderComponent onNavSelected={setScreen}/>
      {screen === SCREEN_NAMES.AUTH && <RegisterLoginComponent />}
      {screen === SCREEN_NAMES.CALENDAR && <CalendarComponent user={user!} />}
      {screen === SCREEN_NAMES.PROFILE && <ProfileComponent user={user!} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
