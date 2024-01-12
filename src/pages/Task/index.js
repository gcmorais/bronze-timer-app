import React, { useState, useEffect, useRef } from "react";
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

import { Modalize } from "react-native-modalize";

import styles from "./style";
import Loading from "../Loading";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Task({ navigation, route }) {
  const [task, setTask] = useState([]);
  const [icon_1] = useState(new Animated.Value(1));
  const [icon_2] = useState(new Animated.Value(1));
  const [aberto, setAberto] = useState();
  const [abertoDelete, setAbertoDelete] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [pop, setPop] = useState(false);

  useEffect(() => {
    async function makeRequest() {
      await delay(2000);
      setIsLoading(false);
    }

    makeRequest();
  });

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

  const B = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );

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
    onClose();
    setAbertoDelete(false);
  }

  const modalizeRef = useRef(null);

  const onOpen = () => {
    setAberto(true);
    modalizeRef.current?.open();
  };

  const onClose = () => {
    setAberto(false);
    modalizeRef.current?.close();
  };

  const onOpenDelete = (id) => {
    setAbertoDelete(true);
    console.log(id);
    // falta finalizar aqui.
  };

  const onCloseDelete = () => {
    setAbertoDelete(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.buttonA}
              onPress={() =>
                navigation.navigate("New Task", {
                  idUser: route.params.idUser,
                })
              }
            >
              <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonB}
              onPress={aberto ? onClose : onOpen}
            >
              <AntDesign name="ellipsis1" size={44} color="rgba(58,58,58, 1)" />
            </TouchableOpacity>
          </View>
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
              timerFrente.setSeconds(
                timerFrente.getSeconds() + 60 * item.frente
              );

              const timerCostas = new Date();
              timerCostas.setSeconds(
                timerCostas.getSeconds() + 60 * item.costas
              );

              const timerSentado = new Date();
              timerSentado.setSeconds(
                timerSentado.getSeconds() + 60 * item.sentado
              );

              return (
                <>
                  <View style={styles.Tasks}>
                    {abertoDelete ? (
                      <View style={styles.DeleteTasksContainer}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 16 }}>
                            Tem certeza que deseja apagar{" "}
                            <B>{item.description}</B> ?
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 50,
                          }}
                        >
                          <TouchableOpacity
                            style={{ marginRight: 50 }}
                            onPress={onClose}
                          >
                            <Text
                              style={{ fontSize: 30, opacity: 0.5 }}
                              onPress={() => onCloseDelete()}
                            >
                              cancelar
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Text style={{ fontSize: 30, color: "#ff0000" }}>
                              apagar
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.TasksContainer}>
                        <View style={styles.TasksHeader}>
                          <Text style={styles.mainTextTask}>
                            {item.description}
                          </Text>
                          <View style={styles.ButtonsContainer}>
                            <TouchableOpacity
                              onPress={() => onOpenDelete(item.id)}
                            >
                              <AntDesign
                                name="delete"
                                size={26}
                                color="#4787A7"
                              />
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
                                  sentado: item.sentado,
                                  idUser: route.params.idUser,
                                });
                              }}
                            >
                              <AntDesign
                                name="edit"
                                size={26}
                                color="#4787A7"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={styles.TasksContainerLineTwo}>
                          <View>
                            <Text>Sentado</Text>
                            <View style={styles.TimerContainer}>
                              <CountDown
                                expiryTimestamp={timerSentado}
                                user={item.description}
                                lado="sentado"
                                valor={item.sentado}
                              />
                            </View>

                            <Text>Esquerdo</Text>
                            <View style={styles.TimerContainer}>
                              <CountDown
                                expiryTimestamp={timerEsquerdo}
                                user={item.description}
                                lado="lado esquerdo"
                                valor={item.esquerdo}
                              />
                            </View>

                            <Text>Direito</Text>
                            <View style={styles.TimerContainer}>
                              <CountDown
                                expiryTimestamp={timerDireito}
                                user={item.description}
                                lado="lado direito"
                                valor={item.direito}
                              />
                            </View>
                          </View>

                          <View>
                            <Text>Frente</Text>
                            <View style={styles.TimerContainer}>
                              <CountDown
                                expiryTimestamp={timerFrente}
                                user={item.description}
                                lado="frente"
                                valor={item.frente}
                              />
                            </View>

                            <Text>Costas</Text>
                            <View style={styles.TimerContainer}>
                              <CountDown
                                expiryTimestamp={timerCostas}
                                user={item.description}
                                lado="costas"
                                valor={item.costas}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </>
              );
            }}
          />

          <Modalize ref={modalizeRef} snapPoint={300} modalTopOffset={200}>
            <View style={{ padding: 30 }}>
              <Text style={{ fontSize: 30 }}>
                Tem certeza que <B>sair</B> ?
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 50,
                }}
              >
                <TouchableOpacity style={{ marginRight: 50 }} onPress={onClose}>
                  <Text style={{ fontSize: 30, opacity: 0.5 }}>cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logout()}>
                  <Text style={{ fontSize: 30, color: "#ff0000" }}>sair</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modalize>
        </View>
      )}
    </>
  );
}
