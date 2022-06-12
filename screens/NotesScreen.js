import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

//save things to this database
const db = SQLite.openDatabase("notes.db"); //it will check for a database in the phone's file system. If it exist it will open it otherwise it will create it

export default function NotesScreen({ navigation, route }) {
  //create a state variable for our notes
  const [notes, setNotes] = useState([]); //initialise to empty list of notes

  function refreshNotes() {
    //function of refreshing notes by showing the all the present notes aft it has been added or deleted
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null, //pass a null argument object
        //Destructuring // take out rows frm the parameter first then take out _array and set it as notes
        (txObj, { rows: { _array } }) => setNotes(_array), //success callback function
        (txObj, error) => console.log("Error ", error)
      );
    });
  }

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          //create table if it does not exist and call the table "notes". The columns are id, title and done
          `CREATE TABLE IF NOT EXISTS 
                notes 
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                startingTime TEXT,
                done INT);`
        );
      },
      null,
      refreshNotes
    ); // (null) if it fails we will ask it to fail silently, if it passes we will ask it to refreshNotes
  }, []); //run the code inside the useEffect function only when this program is first run

  function addNote() {
    navigation.navigate("Add Note");
  }

  function deleteNote(id) {
    db.transaction(
      (tx) => {
        tx.executeSql(`DELETE FROM notes WHERE id = ${id}`);
      },
      null,
      refreshNotes
    );
  }

  useEffect(() => {
    //code that will happen when route.params change
    console.log("yayy");
    if (route.params[0]?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            "INSERT INTO notes (done, title, startingTime) VALUES (0, ?, ?)",
            [route.params[0].text, route.params[0].startingTime]
          );
        },
        null,
        refreshNotes
      ); //the ? represent the sql parameter that we passed in using [route.params.text]
    }
  }, [route.params[0]?.text]);
  //if route.params doesnt exist then it will return undefined. So we need to check if it exists before we can use it.
  //if it does exit it will keep going down the list of parameteers

  //This adds the new note button in the header
  useEffect(() => {
    console.log("This effect happened!");
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          {/* icon copied frm internet */}
          <Entypo
            name="new-message"
            size={24}
            color="black"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  //decides how the diff note items look like
  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          paddingTop: 20,
          paddingBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between", //move the other icon all the way to the right
        }}
      >
        <Text style={{ fontSize: 16, textAlig: "left" }}>{item.title}</Text>
        <Text style={{ fontSize: 16, textAlig: "left" }}>
          {item.startingTime}
        </Text>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons name="trash" size={16} color="#944" />
        </TouchableOpacity>
      </View>
    );
  }

  //display the notes
  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }} //takes up the entire space
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});
