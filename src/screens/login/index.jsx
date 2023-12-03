/* eslint-disable global-require */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Container,
  ImageBg,
  Image,
  Text,
  TextInput,
  DangerText,
  Button,
  TouchableOpacity,
} from './style';

const schema = yup.object({
  username: yup.string().required('Informe seu username'),
  password: yup.string().min(6, 'A senha deve conter pelo menos 6 dígitos.').required('Informe uma senha'),
});

export default function Login() {
  const [username, setUsername] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSignIn(data) {
    console.log(data);
  }
  return (
    <Container>
      <ImageBg source={require('../../../assets/background-img.png')} resizeMode="cover">
        <Image
          source={require('../../../assets/logo.png')}
        />

        <View>
          <Text>Usuário: </Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Insira seu usuário"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.username && <DangerText>{errors.username?.message}</DangerText>}

          <Text>Senha: </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Insira sua senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.password && <DangerText>{errors.password?.message}</DangerText>}
        </View>

        <TouchableOpacity onPress={handleSubmit(handleSignIn)}>
          <Button>Entrar</Button>
        </TouchableOpacity>
      </ImageBg>
    </Container>
  );
}