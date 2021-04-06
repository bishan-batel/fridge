import React from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import { Posts, StarLog } from "./components/Posts";
import Admin from "./admin/Admin";
import "./App.css";

export function App() {
	return (
		<>
			<div className="main">
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Fridge} />
						<Route path="/admin" component={Admin} />
					</Switch>
				</BrowserRouter>
			</div>
		</>
	);
}

function Fridge() {
	return (
		<>
			<div className="fridge-container">
				<img
					id="fridge"
					src="https://firebasestorage.googleapis.com/v0/b/compscifridge.appspot.com/o/fridge.png?alt=media&token=9e6fe941-082b-465c-b47e-087ce3b791ec"
					alt=""
				/>

				<a href="https://github.com/bishan-batel/intro-cs-notes">
					<img
						id="github"
						src="https://pngimg.com/uploads/github/github_PNG83.png"
						alt=""
					/>
				</a>
				<Posts />
			</div>
			<StarLog />
		</>
	);
}
