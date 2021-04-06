import React from "react";
import firebase from "../firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
const firestore = firebase.firestore();

const submit = async (event) => {
	const name = event.target[0].value;
	const message = event.target[1].value;
	const number = parseInt(event.target[2].value);
	const data = {
		name,
		message,
		stars: number,
		createdAt: new Date(),
	};

	const logRef = firestore.collection("log");
	const fridgeRef = firestore.collection("fridge");

	logRef.add(data).then(() => {
		fridgeRef
			.where("name", "==", name)
			.get()
			.then((querySnapshot) => {
				const doc = querySnapshot.docs[0];

				console.log(doc.data().stars + number);
				doc.ref.set(
					{
						stars: doc.data().stars + number,
					},
					{ merge: true }
				);
			});
	});
};
const Form = () => {
	return (
		<>
			<form
				action="#"
				onSubmit={(event) => {
					submit(event);
					return false;
				}}
			>
				<input required type="text" placeholder="Name" />
				<input required type="text" placeholder="message" />
				<input required type="number" placeholder="stars" />
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

const Admin = () => {
	const [user] = useAuthState(auth);

	if (!user) {
		return (
			<>
				<button onClick={signInWithGoogle}>Sign in</button>
			</>
		);
	}

	return (
		<>
			<h1>lol admin</h1>
			<Form />
			<button onClick={signOut}>Sign out</button>
		</>
	);
};

const signInWithGoogle = () => auth.signInWithPopup(provider);
const signOut = () => auth.signOut();

export default Admin;
