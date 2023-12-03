/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 200px;
  height: 105px;
`;

export const ImageBg = styled.ImageBackground`
  flex: 1;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const Text = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin: 10px 0;
`;

export const DangerText = styled.Text`
  color: #ff375b;
  margin: 8px 0;
  font-weight: bold;
  background-color: rgba(0,0,0,0.7);
`;

export const TextInput = styled.TextInput`
  padding: 20px 30px;
  width: 300px;
  border-radius: 50px;
  background-color: #fff;
  color: rgba(0,0,0,0.8);
`;

export const Button = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 30px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 100px;
  border-radius: 20px;
`;
