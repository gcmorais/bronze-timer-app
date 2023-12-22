import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  query,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { View, Text, TouchableOpacity, FlatList, Animated } from "react-native";
import CountDown from "../../components/Countdown";
import app from "../../config/firebaseconfig";
import { Entypo, AntDesign } from "@expo/vector-icons";

import styles from "./style";

export default function Task({ navigation, route }) {
  const [task, setTask] = useState([]);
  const [icon_1] = useState(new Animated.Value(1));
  const [icon_2] = useState(new Animated.Value(1));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 140,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 70,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const database = getFirestore(app);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  useEffect(() => {
    const q = query(collection(database, route.params.idUser));
    const valores = onSnapshot(q, (querySnapshot) => {
      const list = [];

      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setTask(list);
    });
  }, []);

  async function deleteTask(id) {
    await deleteDoc(doc(database, route.params.idUser, id));
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={task}
        renderItem={({ item }) => {
          const timerEsquerdo = new Date();
          timerEsquerdo.setSeconds(
            timerEsquerdo.getSeconds() + 60 * item.esquerdo
          );

          const timerDireito = new Date();
          timerDireito.setSeconds(
            timerDireito.getSeconds() + 60 * item.direito
          );

          const timerFrente = new Date();
          timerFrente.setSeconds(timerFrente.getSeconds() + 60 * item.frente);

          const timerCostas = new Date();
          timerCostas.setSeconds(timerCostas.getSeconds() + 60 * item.costas);

          return (
            <View style={styles.Tasks}>
              <View style={styles.TasksContainer}>
                <View>
                  <Text style={styles.mainTextTask}>{item.description}</Text>
                </View>
                <View style={styles.TasksContainerLineTwo}>
                  <View>
                    <Text>Esquerdo</Text>
                    <View style={styles.TimerContainer}>
                      <CountDown expiryTimestamp={timerEsquerdo} />
                    </View>

                    <Text>Direito</Text>
                    <View style={styles.TimerContainer}>
                      <CountDown expiryTimestamp={timerDireito} />
                    </View>
                  </View>

                  <View>
                    <Text>Frente</Text>
                    <View style={styles.TimerContainer}>
                      <CountDown expiryTimestamp={timerFrente} />
                    </View>

                    <Text>Costas</Text>
                    <View style={styles.TimerContainer}>
                      <CountDown expiryTimestamp={timerCostas} />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.ButtonsContainer}>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <AntDesign name="delete" size={26} color="#f92e6a" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editTaskIcon}
                  onPress={() => {
                    navigation.navigate("Details", {
                      id: item.id,
                      description: item.description,
                      frente: item.frente,
                      costas: item.costas,
                      esquerdo: item.esquerdo,
                      direito: item.direito,
                      idUser: route.params.idUser,
                    });
                  }}
                >
                  <AntDesign name="edit" size={26} color="#f92e6a" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <Animated.View style={{ bottom: icon_2 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("New Task", { idUser: route.params.idUser })
          }
        >
          <Text style={styles.iconButton}>+</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ bottom: icon_1 }}>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Entypo name="log-out" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => (pop === false ? popIn() : popOut())}
      >
        <Entypo name="menu" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
