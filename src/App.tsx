import React, { useReducer, useState, createContext } from "react";
import Cards from "./Components/Cards/CandidateCards";
import "./CSS/Styles.css";
import Navbar from "./Components/Navbar/Navbar";
import TimerButton from "./Components/TimerButton/TimerButton";
import Footer from "./Components/Footer/Footer";
import ErrorNotify from "./Components/ErrorMsg/ErrorMessage";
import Loader from "./Components/Loader/Loader";

export const ErrorContext = createContext({
	showError: false,
	setShowError: (setShowError: boolean): void => {},
});

export const TextContext = createContext({
	text: "",
	setText: (set: string): void => {},
});

export const LoaderContext = createContext({
	showLoader: false,
	setShowLoader: (set: boolean): void => {},
});

const initialState: IntState = {
	lightTheme: true,
	lightText: "☀️",
	darkTheme: false,
	darkText: "🌙",
};

interface IntState {
	lightTheme: boolean;
	lightText: string;
	darkTheme: boolean;
	darkText: string;
}

type Action = { type: "light" | "dark" };

const reducer = (state: IntState, action: Action) => {
	switch (action.type) {
		case "light":
			return {
				...state,
				lightTheme: true,
				darkTheme: false,
				lightText: "☀️",
				darkText: "",
			};

		case "dark":
			return {
				...state,
				darkTheme: true,
				lightTheme: false,
				lightText: "",
				darkText: "🌙",
			};

		default:
			return state;
	}
};
export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [loggedIn, setLoggedIn] = useState(false);
	const [pick, setPick] = useState(false);
	const [showError, setShowError] = useState(false);
	const [text, setText] = useState("");
	const [showLoader, setShowLoader] = useState(false);

	const toggle = () => {
		if (state.lightTheme === true) {
			dispatch({ type: "dark" });
		} else {
			dispatch({ type: "light" });
		}
	};

	const homePage = () => {
		return (
			<div>
				<div className="pos">
					<button className="modeButton" onClick={toggle}>
						{state.lightTheme ? state.lightText : state.darkText}
					</button>
					<TimerButton />
				</div>
				<ErrorNotify />
				<Loader />
				<Cards loggedIn={loggedIn} pick={pick} setPick={setPick} />
				<Footer />
			</div>
		);
	};

	const splashPage = () => {
		return (
			<div>
				<div className="splash">
					<div className="notify">
						<ErrorNotify />
					</div>
					<div className="splashPage">
						<h1>Please, connect your wallet</h1>
					</div>
					<div className="splashInfo">
						<p>
							Connect to the Goerli test network to see the voting information
						</p>
					</div>
				</div>
			</div>
		);
	};

	return (
		<TextContext.Provider value={{ text, setText }}>
			<ErrorContext.Provider value={{ showError, setShowError }}>
				<LoaderContext.Provider value={{ showLoader, setShowLoader }}>
					<div className={state.lightTheme ? "light-mode" : "dark-mode"}>
						<div className="App">
							<Navbar
								loggedIn={loggedIn}
								setLoggedIn={setLoggedIn}
								pick={pick}
								setPick={setPick}
							/>
							{loggedIn ? homePage() : splashPage()}
						</div>
					</div>
				</LoaderContext.Provider>
			</ErrorContext.Provider>
		</TextContext.Provider>
	);
}
