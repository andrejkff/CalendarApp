import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './firebase';

import RegisterLoginComponent from './components/screens/auth/RegisterLogin';
import CalendarComponent from './components/screens/calendar/Calendar';
import HeaderComponent from './components/screens/header/Header';
import ProfileComponent from './components/screens/profile/Profile';

import { onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect, useRef } from 'react';
import { SCREEN_NAMES } from './constants/appNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <AppContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [screen, setScreen] = useState<string>(
    SCREEN_NAMES.CALENDAR
  );

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);

      if (!user) {
        setScreen(SCREEN_NAMES.AUTH);
      } else {
        setScreen(SCREEN_NAMES.CALENDAR);
      }
    });
  }, []);

  function changeScreen(newScreen: string) {
    if (newScreen === screen) {
      return;
    }

    Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setScreen(newScreen);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  }

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        onNavSelected={changeScreen}
        user={user}
      />

      <Animated.View
        style={[
          styles.screen,
          {
            opacity,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
        >
          {screen === SCREEN_NAMES.AUTH && (
            <RegisterLoginComponent />
          )}

          {screen === SCREEN_NAMES.CALENDAR && (
            <CalendarComponent user={user!} />
          )}

          {screen === SCREEN_NAMES.PROFILE && (
            <ProfileComponent user={user!} />
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },
});

export default App;
