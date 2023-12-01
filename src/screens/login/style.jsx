/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ImageBg = styled.ImageBackground`
  flex: 1;
  width: 100%;
  justify-content: center;
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
  font-size: 18px;
  background-color: rgba(0,0,0,0.7);
  padding: 0 40px;
`;

export const TextInput = styled.TextInput`
  padding: 20px 30px;
  width: 300px;
  border-radius: 50px;
  background-color: #fff;
  color: rgba(0,0,0,0.8);
`;
