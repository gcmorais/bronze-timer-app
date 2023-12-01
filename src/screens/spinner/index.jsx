/* eslint-disable global-require */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from './style';

export default function Spinner() {
  return (
    <Container>
      <ActivityIndicator
        color="#fff"
        size="large"
      />
    </Container>
  );
}
