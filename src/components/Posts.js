import React, { useState } from "react";

import firebase from "../firebase/Firebase";

const firestore = firebase.firestore();
const fridgeRef = firestore.collection("fridge");
const logRef = firestore.collection("log");

let reloadPosts = () => {};
let setLogsGlobal = () => {};
let reloadLogs = (name) => {
	logRef
		.where("name", "==", name)
		.orderBy("createdAt", "desc")
		.limit(20)
		.get()
		.then((querySnapshot) => {
			const docs = querySnapshot.docs;
			const newLogs = docs.map((doc, i) => {
				return <Log doc={doc.data()} i={i} />;
			});
			setLogsGlobal(newLogs);
		});
};

let setSelectedName;

export function StarLog(props) {
	const [name, setName] = useState(null);
	const [logs, setLogs] = useState([]);
	setLogsGlobal = setLogs;

	setSelectedName = (n) => {
    if (n === name) {
      setName(n);
    }
		reloadLogs(n);
		setName(n);
	};

	if (!name) {
		return null;
	}

	return (
		<>
			<>
				<section className="details">
					<h1>{name} Logs</h1>
					<ul className="log-list">{logs}</ul>
				</section>
			</>
		</>
	);
}

export function Log(props) {
	const data = props.doc;
	const date = data.createdAt.toDate().toLocaleDateString();
	console.log(data.createdAt);

	let stars =
		data.stars > 0 ? (
			<span className="log-star positive">+{data.stars}</span>
		) : (
			<span className="log-star negative">{data.stars}</span>
		);

	return (
		<>
			<li className="log" key={props.i.toString()}>
				<span className="log-msg">{data.message}</span>
				<div className="log-info">
					<span className="log-date">{date}</span>
					{stars}
				</div>
			</li>
		</>
	);
}
// Notes
fridgeRef.orderBy("stars", "desc").onSnapshot((querySnapshot) => {
	const docs = querySnapshot.docs;
	let posts = [];
	for (let i = 0; i < docs.length; i++) {
		const data = docs[i].data();
		posts.push(
			<Post
				key={i.toString()}
				stars={data.stars}
				name={data.name}
				url={data.photoURL}
			/>
		);
	}

	reloadPosts(posts);
});

export function Posts() {
	const [posts, setPosts] = useState([]);
	reloadPosts = setPosts;

	return (
		<>
			<ul className="posts">{posts}</ul>
		</>
	);
}

function Post(props) {
	return (
		<>
			<li className="post" onClick={() => setSelectedName(props.name)}>
					<img
						className="post-img"
						src="https://static.techspot.com/images2/downloads/topdownload/2016/07/postit.png"
						alt=""
					/>
					<span className="post-name">{props.name}</span>
					<img className="post-icon" src={props.url} alt="" />

					<div className="star">
						<img
							className="star-img"
							src="https://firebasestorage.googleapis.com/v0/b/compscifridge.appspot.com/o/7aed7bb70281f5e00df3586e89f01b85.png?alt=media&token=a70ac3b4-255b-4ece-87e3-052f20bc417a"
							alt=""
						/>
						<StarCount stars={props.stars} />
					</div>
			</li>
		</>
	);
}

function StarCount(props) {
	if (props.stars > 0) {
		return (
			<>
				<span className="star-num positive">{props.stars}</span>
			</>
		);
	}
	return (
		<>
			<span className="star-num negative">{props.stars}</span>
		</>
	);
}
