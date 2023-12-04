/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';

import {
  Container,
  ImageBg,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from './style';

export default function Login({ setUser }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <Container>
      <ImageBg source={require('../../../assets/background-img.png')} resizeMode="cover">
        <Image
          source={require('../../../assets/logo.png')}
        />

        <View>
          <Text>Email: </Text>
          <TextInput
            placeholder="Insira seu email"
            onChangeText={(val) => {
              setEmail(val);
            }}
            value={email}
          />

          <Text>Senha: </Text>
          <TextInput
            placeholder="Insira sua senha"
            secureTextEntry
            onChangeText={(val) => {
              setPassword(val);
            }}
            value={password}
          />
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <Button>Entrar</Button>
        </TouchableOpacity>
      </ImageBg>
    </Container>
  );
}
