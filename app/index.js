import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Page() {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (password === '12345') {
      await SecureStore.setItemAsync('userPassword', password);
      router.push('/(tabs)/');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <View style={styles.container}>

      <Image
        style={{ width: 350, height: 200 }}
        source={require('../assets/pokedex_logo.png')}  
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="black"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    width: '90%',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4c539c', 
    padding: 10,
    borderRadius: 10, 
    elevation: 5, 
    width: 150
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
});
