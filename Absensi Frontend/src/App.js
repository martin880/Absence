import { Box, Spinner, Center } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RRegister from "./pages/rregister";
import RLogin from "./pages/rlogin";
import RHistory from "./pages/rhistory";
import RDashboard from "./pages/rdashboard";
import ForgotPassword from "./pages/rForgotpassword";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function App() {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	async function getUser() {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({
				type: "login",
				payload: user,
			});
		}
		console.log(user);
	}
	useEffect(() => {
		getUser();
		new Promise((resolve) => {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		});
	}, []);

	return (
		<>
			{isLoading ? (
				<Center h="100vh">
					<Spinner />
				</Center>
			) : (
				<Box>
					<Routes>
						<Route path="/" element={<RLogin />}></Route>
						<Route path="/rlogin" element={<RLogin />}></Route>
						<Route path="/rregister" element={<RRegister />}></Route>
						<Route path="/rhistory" element={<RHistory />}></Route>
						<Route path="/rdashboard" element={<RDashboard />}></Route>
						<Route
							path="/forgot-password/f8XBxkZeOGxPdycDvwR5q"
							element={<ForgotPassword />}
						></Route>
					</Routes>
				</Box>
			)}
		</>
	);
}

export default App;
