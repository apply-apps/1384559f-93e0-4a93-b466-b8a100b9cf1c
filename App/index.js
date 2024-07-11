// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Please provide answers for given requests.' },
          { role: 'user', content: 'Generate a list of contacts with names, birthdays and last contacted dates.' }
        ],
        model: 'gpt-4o',
      });

      const data = response.data.response;
      setContacts(JSON.parse(data));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.contactContainer}>
      {contacts.map((contact, index) => (
        <View key={index} style={styles.contactItem}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactDetail}>Birthday: {contact.birthday}</Text>
          <Text style={styles.contactDetail}>Last Contacted: {contact.lastContacted}</Text>
        </View>
      ))}
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Network Tracker</Text>
      <ScrollView>
        <ContactList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  contactContainer: {
    padding: 20,
  },
  contactItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactDetail: {
    fontSize: 16,
  },
});

export default App;