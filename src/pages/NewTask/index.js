import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { addDoc, collection } from "firebase/firestore";

import database from "../../config/firebaseconfig";
import styles from "./style";

export default function NewTask({ navigation }) {
  const [description, setDescription] = useState();

  async function addTask() {
    const docRef = await addDoc(collection(database, "Tasks"), {
      description: description,
      status: false,
    });
    navigation.navigate("Task");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Ex: estudar javascript"
        onChangeText={setDescription}
        value={description}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => {
          addTask();
        }}
      >
        <Text style={styles.iconButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
