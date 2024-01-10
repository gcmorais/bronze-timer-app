import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import app from "../../config/firebaseconfig";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import styles from "./style";

export default function NewTask({ navigation, route }) {
  const [editDescription, setEditDescription] = useState(
    route.params.description
  );
  const [editEsquerdo, setEditEsquerdo] = useState(route.params.esquerdo);
  const [editDireito, setEditDireito] = useState(route.params.direito);
  const [editFrente, setEditFrente] = useState(route.params.frente);
  const [editCostas, setEditCostas] = useState(route.params.costas);
  const [editSentado, setEditSentado] = useState(route.params.sentado);

  const idTask = route.params.id;
  const database = getFirestore(app);

  async function editTask(
    description,
    sentado,
    esquerdo,
    direito,
    costas,
    frente,
    id
  ) {
    const taskRef = doc(database, route.params.idUser, id);

    await updateDoc(taskRef, {
      description: editDescription,
      sentado: editSentado,
      esquerdo: editEsquerdo,
      direito: editDireito,
      frente: editFrente,
      costas: editCostas,
      status: false,
    });

    navigation.navigate("Task", { idUser: route.params.idUser });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>Nome do(a) cliente</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Ex: estudar javascript"
          onChangeText={setEditDescription}
          value={editDescription}
        />

        <Text style={styles.label}>Sentado</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          onChangeText={setEditSentado}
          value={editSentado}
          placeholder="Digitar valor em minutos"
          maxLength={2} //setting limit of input
        />

        <Text style={styles.label}>Lado Esquerdo</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          onChangeText={setEditEsquerdo}
          value={editEsquerdo}
          placeholder="Digitar valor em minutos"
          maxLength={2} //setting limit of input
        />

        <Text style={styles.label}>Lado Direito</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          onChangeText={setEditDireito}
          value={editDireito}
          placeholder="Digitar valor em minutos"
          maxLength={2} //setting limit of input
        />

        <Text style={styles.label}>Frente</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          onChangeText={setEditFrente}
          value={editFrente}
          placeholder="Digitar valor em minutos"
          maxLength={2} //setting limit of input
        />

        <Text style={styles.label}>Costas</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          onChangeText={setEditCostas}
          value={editCostas}
          placeholder="Digitar valor em minutos"
          maxLength={2} //setting limit of input
        />
        <TouchableOpacity
          style={styles.buttonNewTask}
          onPress={() => {
            editTask(
              editDescription,
              editEsquerdo,
              editDireito,
              editCostas,
              editFrente,
              editSentado,
              idTask
            );
          }}
        >
          <Text style={styles.iconButton}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
