/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login';
import Home from '../screens/home';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  );
}
