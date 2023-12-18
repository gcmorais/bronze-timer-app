import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import app from "../../config/firebaseconfig";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import styles from "./style";

export default function NewTask({ navigation, route }) {
  const [editDescription, setEditDescription] = useState(
    route.params.description
  );
  const idTask = route.params.id;
  const database = getFirestore(app);

  async function editTask(description, id) {
    const taskRef = doc(database, "Tasks", id);

    await updateDoc(taskRef, {
      description: editDescription,
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
        onChangeText={setEditDescription}
        value={editDescription}
      />
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => {
          editTask(editDescription, idTask);
        }}
      >
        <Text style={styles.iconButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
