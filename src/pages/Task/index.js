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

import app from "../../config/firebaseconfig";
import { FontAwesome, Entypo } from "@expo/vector-icons";

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
    console.log("teste");
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
          return (
            <View style={styles.Tasks}>
              <TouchableOpacity
                style={styles.deleteTasks}
                onPress={() => deleteTask(item.id)}
              >
                <FontAwesome
                  name="star"
                  size={23}
                  color="#f92e6a"
                ></FontAwesome>
              </TouchableOpacity>
              <Text
                style={styles.DescriptionTask}
                onPress={() => {
                  navigation.navigate("Details", {
                    id: item.id,
                    description: item.description,
                    idUser: route.params.idUser,
                  });
                }}
              >
                {item.description}
              </Text>
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
