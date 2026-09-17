import { View, Text, StyleSheet, Pressable } from 'react-native';

import Navbar from './Navbar';

import { useState } from 'react';

interface Props { onNavSelected: (location: string) => void };

export default function Header({ onNavSelected }: Props) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <Pressable
          style={styles.menuButton}
          onPress={() => setNavbarOpen(navbarOpen => !navbarOpen)}
        >
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </Pressable>
      </View>
      {
        navbarOpen &&
        <Navbar
          onClose={() => setNavbarOpen(false)}
          onNavSelected={(value) => {
            setNavbarOpen(false);
            onNavSelected(value);
          }}
        />
      }
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#d7d7d7'
  },
  title: {
    textAlign: 'center',
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
    backgroundColor: '#222',
  },
});
