import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

export default function AddScreen({ navigation }) {
  //create a state variable to keep track of the text input
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.label}>Add your event</Text>
      {/* value in this case is a controlled component because u cant change its value once its assigned to {text} if we don't do ath with onChangeText. Removing value={text} will make this an uncontrolled variable */}
      {/* controlled manner */}
      <TextInput
        placeholder="Title"
        style={styles.textInput}
        value={text}
        onChangeText={(newText) => {
          setText(newText);
        }}
      />
      {/* onChangeText allow u to update the text input */}
      {/* navigation.goback dismiss the popup */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={() => navigation.navigate("Notes", { text })} //pass this parameter back to the notes screen
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={{ marginTop: 40, color: "grey" }}>
        This is what you typed:
      </Text>
      <Text style={{ color: "#333", marginTop: 10 }}>{text}</Text> */}
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontSize: 24,
  },
  textInput: {
    margin: 20,
    borderWidth: 1,
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    margin: 5,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  submitButton: {
    backgroundColor: "orange",
  },
  cancelButton: {
    backgroundColor: "red",
  },
});
