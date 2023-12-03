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
  margin-top: 40px;
`;

export const ImageBg = styled.ImageBackground`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Text = styled.Text`
  color: #9D9D9D;
  font-size: 26px;
`;

export const View = styled.View`
  position: absolute;
  width: 100%;
  height: 80%;
  bottom: 0;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

export const Header = styled.View`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1;
  border-color: #eeeeee;
`;

export const Logo = styled.Image`
  width: 30px;
  height: 30px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 20px;
  padding-bottom: 18px;
`;

export const Icon = styled.View`
  display: flex;
  align-items: center;
  background-color: yellow;
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

export const TextIcon = styled.Text`
  font-size: 30px;
  padding: 10px;
  font-weight: bold;
  color: #707070;
`;
