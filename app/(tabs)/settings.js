import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import * as Updates from 'expo-updates';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true); 
    await Updates.reloadAsync(); 
    router.replace('/');
  };

  if (loading) {
    return (
      <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
        <Text style={[styles.title, { color: isDarkTheme ? 'white' : 'black' }]}>
          Logging out...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, { color: isDarkTheme ? 'white' : 'black' }]}>
        Settings
      </Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.label, { color: isDarkTheme ? 'white' : 'black' }]}>
          Dark Theme
        </Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
        />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  logoutButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
