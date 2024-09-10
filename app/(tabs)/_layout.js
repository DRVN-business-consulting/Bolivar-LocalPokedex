import { Tabs } from 'expo-router';
import { Image, StyleSheet,Text } from 'react-native';
import React from 'react';


export default function PokeTabs() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'All Pokemons',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../../assets/pokeball-active.png') 
                : require('../../assets/pokeball.png')
              }
              style={{ width: 45, height: 45 }}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>
              All Pokemons
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name ='favorites'
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../../assets/heart-active.png') 
                : require('../../assets/heart.png')
              }
              style={{ width: 50, height: 45 }}
            />
          ),
           tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>
              Favorites
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'App Settings',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../../assets/settings-active.png') 
                : require('../../assets/settings.png')
              }
              style={{ width: 50, height: 45 }}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabLabel, { color }]}>
                Settings
            </Text>
          ),
          
        }}
      />
    </Tabs>
  );
}



const styles = StyleSheet.create({
    tabLabel: {
      fontSize: 12, 
      fontWeight: 'bold', 
    },
  });