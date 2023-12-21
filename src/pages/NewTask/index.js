import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import app from "../../config/firebaseconfig";
import styles from "./style";

export default function NewTask({ navigation, route }) {
  const [description, setDescription] = useState();
  const [esquerdo, setEsquerdo] = useState();
  const [direito, setDireito] = useState();
  const [frente, setFrente] = useState();
  const [costas, setCostas] = useState();
  const database = getFirestore(app);

  async function addTask() {
    const docRef = await addDoc(collection(database, route.params.idUser), {
      description: description,
      esquerdo: esquerdo,
      direito: direito,
      frente: frente,
      costas: costas,
      status: false,
    });
    navigation.navigate("Task", { idUser: route.params.idUser });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Ex: Nome do(a) cliente"
        onChangeText={setDescription}
        value={description}
      />

      <Text style={styles.label}>Lado Esquerdo</Text>
      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={setEsquerdo}
        value={esquerdo}
        placeholder="Digitar valor em minutos"
        maxLength={2} //setting limit of input
      />

      <Text style={styles.label}>Lado Direito</Text>
      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={setDireito}
        value={direito}
        placeholder="Digitar valor em minutos"
        maxLength={2} //setting limit of input
      />

      <Text style={styles.label}>Frente</Text>
      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={setFrente}
        value={frente}
        placeholder="Digitar valor em minutos"
        maxLength={2} //setting limit of input
      />

      <Text style={styles.label}>Costas</Text>
      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={setCostas}
        value={costas}
        placeholder="Digitar valor em minutos"
        maxLength={2} //setting limit of input
      />

      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => {
          addTask();
        }}
      >
        <Text style={styles.iconButton}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
