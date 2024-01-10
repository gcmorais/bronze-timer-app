import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
  onAuthStateChanged,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Loading";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";

import app from "../../config/firebaseconfig";
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);

  function LoginFirebase() {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Task", { idUser: user.uid });
      })
      .catch((error) => {
        setErrorLogin(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  useEffect(() => {
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigation.navigate("Task", { idUser: uid });
      }
    });
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ImageBackground
          source={require("../../../assets/background.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.topcontainer}>
            <Text style={styles.title}>Bronze{"\n"}Timer</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#FFF"
              type="text"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Senha"
              placeholderTextColor="#FFF"
              type="number"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            {errorLogin && (
              <View style={styles.contentAlert}>
                <MaterialCommunityIcons
                  name="alert-circle"
                  size={24}
                  color="#bdbdbd"
                />
                <Text style={styles.textAlert}>
                  Ocorreu algum erro!{"\n"}
                  tente novamente.
                </Text>
              </View>
            )}

            {email === "" || password === "" ? (
              <TouchableOpacity disabled={true} style={styles.buttonLogin}>
                <Text style={styles.textButtonLogin}>Acessar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={LoginFirebase}
              >
                <Text style={styles.textButtonLogin}>Acessar</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.footerText}>
              Não tem uma conta ainda ?{"\n"}
              Ver planos
            </Text>
            <View style={{ height: 100 }} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
}
