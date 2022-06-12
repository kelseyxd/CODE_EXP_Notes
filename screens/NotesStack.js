import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./NotesScreen";

//create another stack navigator for the modal screen (another screen that stacks ontop of the current screen)
const InnerStack = createStackNavigator();

export default function NotesStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          headerTitle: "Events",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerStyle: {
            backgroundColor: "yellow",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
          },
        }}
      />
    </InnerStack.Navigator>
  );
}
