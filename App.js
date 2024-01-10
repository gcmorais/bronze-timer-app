import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Task from "./src/pages/Task";
import NewTask from "./src/pages/NewTask";
import Details from "./src/pages/Details";
import Login from "./src/pages/Login";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Task"
          component={Task}
          options={{
            headerTitleAlign: "left",
            headerShown: false,
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="New Task"
          component={NewTask}
          options={{
            headerTitle: "Adicionar",
            headerTintColor: "#4787A7",
            headerBackTitle: "voltar",
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTitle: "Detalhes",
            headerTintColor: "#4787A7",
            headerBackTitle: "voltar",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
