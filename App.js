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
            headerTintColor: "#F92E6A",
            headerTitleAlign: "left",
            headerTitle: "Bela & Bronze",
          }}
        />
        <Stack.Screen
          name="New Task"
          component={NewTask}
          options={{
            headerTintColor: "#F92E6A",
            headerBackTitle: "voltar",
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            headerTintColor: "#F92E6A",
            headerBackTitle: "voltar",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
