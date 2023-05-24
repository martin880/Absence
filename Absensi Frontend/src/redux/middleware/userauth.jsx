import { auth_types } from "../types";
import axios from "axios";
// import { useToast } from "@chakra-ui/react";

function userLogin(account) {
	return async function (dispatch) {
		// const toast = useToast();

		console.log(dispatch);
		try {
			const userData = await axios
				.get("http://localhost:3500/users/login", {
					params: {
						email: account.email.toLowerCase(),
						password: account.password,
					},
				})
				.then((res) => {
					console.log(res.data.user);
					return res.data.user;
				});

			dispatch({
				type: auth_types.login,
				payload: userData,
			});
			localStorage.setItem("user", JSON.stringify(userData));

			return true;
		} catch (err) {
			console.log(err);
			// alert("Email or password is false");
			return false;
		}
	};
}
export { userLogin };
