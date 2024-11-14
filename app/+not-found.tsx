import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';



export default function NotFoundScreen() {
  return (
    <>
      <Text>not found</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
