// Filename: index.js
// Combined code from App.js and ContactList.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ContactList from './ContactList';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://apihub.p.appply.xyz:3300/chatgpt');
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Tracker</Text>
      <ContactList contacts={contacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  contactText: {
    fontSize: 18,
  },
});

// Filename: ContactList.js

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ContactList = ({ contacts }) => (
  <FlatList
    data={contacts}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.contactItem}>
        <Text style={styles.contactText}>{item.name}</Text>
        <Text style={styles.contactText}>{item.phone}</Text>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  contactItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 18,
  },
});

export default ContactList;