import React, { useEffect, useState, useRef } from "react";
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
	const [sTime, setSTime] = useState("");

	const [event, setEvent] = useState([
		{ title: "IPT Test", startingTime: "10:00", id: 0 },
	]);

	function addEvent() {
		console.log("\nOld event array:\n", event);
		setEvent([
			...event,
			{ title: text, startingTime: sTime, id: event.length },
		]);
	}

	// this flag is used to check if this screen is being rendered for the first time
	const isFirstRender = useRef(true);

	// this is executed whenever "event" is updated, but we need to prevent it from also executing when the screen is first rendered
	// this is done by checking the value of the flag "isFirstRender"
	// true -> do not execute the code
	// false -> return & pass the updated "event" to previous screen
	useEffect(() => {
		if (!isFirstRender.current) {
			console.log("\n'Event' state was updated");
			console.log("\nUpdated event array:\n", event);
			navigation.navigate("Notes", event);
		}
	}, [event]);

	// after the screen is rendered for the first time, we set isFirstRender flag to false
	useEffect(() => {
		console.log("\nScreen rendered");
		isFirstRender.current = false; // toggle flag after first render/mounting
	}, []);

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
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
			<TextInput
				placeholder="Start Time"
				style={styles.textInput}
				value={sTime}
				onChangeText={(newText) => {
					setSTime(newText);
				}}
			/>
			{/* onChangeText allow u to update the text input */}
			{/* navigation.goback dismiss the popup */}
			<View style={styles.buttons}>
				<TouchableOpacity
					style={[styles.button, styles.submitButton]}
					onPress={addEvent}
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
