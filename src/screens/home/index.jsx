/* eslint-disable global-require */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { } from 'react-native';

import {
  Container,
  ImageBg,
  Image,
  Text,
  View,
  TouchableOpacity,
  Header,
  Icon,
  TextIcon,
  Logo,
} from './style';

export default function Home() {
  return (
    <Container>
      <ImageBg source={require('../../../assets/background-img.png')} resizeMode="cover">
        <Image
          source={require('../../../assets/logo.png')}
        />
      </ImageBg>
      <View>
        <Header>
          <TouchableOpacity>
            <Icon>
              <TextIcon>+</TextIcon>
            </Icon>
            <Text>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Logo source={require('../../../assets/config-icon.png')} resizeMode="cover" />
          </TouchableOpacity>
        </Header>
      </View>
    </Container>
  );
}
