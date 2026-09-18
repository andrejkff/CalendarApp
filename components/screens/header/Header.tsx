import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { User } from '@react-native-firebase/auth';
import Navbar from './Navbar';
import { useRef, useState } from 'react';

interface Props {
  onNavSelected: (location: string) => void;
  user: User | null;
}

export default function Header({ onNavSelected, user }: Props) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;

  function openNavbar() {
    setNavbarOpen(true);

    Animated.timing(animation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  function closeNavbar(callback?: () => void) {
    Animated.timing(animation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setNavbarOpen(false);
      callback?.();
    });
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>

        <Pressable
          style={styles.menuButton}
          onPress={() => {
            if (navbarOpen) {
              closeNavbar();
            } else {
              openNavbar();
            }
          }}
        >
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </Pressable>
      </View>

      {navbarOpen && (
        <Animated.View
          style={[
            styles.navbar,
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-128, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Navbar
            user={user}
            onClose={() => closeNavbar()}
            onNavSelected={(value) => {
              closeNavbar(() => onNavSelected(value));
            }}
          />
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 64,
    paddingHorizontal: 12,
    paddingVertical: 36,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 24,
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },

  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuLine: {
    width: 24,
    height: 2,
    marginVertical: 2,
    backgroundColor: 'white',
  },

  navbar: {
    position: 'absolute',
    top: 72,
    left: 0,
    bottom: 0,
    width: 128,
    zIndex: 999,
  },
});
