import { auth_types } from "./types";
const init = {
	email: "",
	password: "",
	name: "",
	birthdate: "",
	gender: "",
};
function userReducer(state = init, action) {
	// eslint-disable-next-line eqeqeq
	if (action.type == auth_types.login) {
		return {
			state,
			email: action.payload.email,
			password: action.payload.password,
			name: action.payload.fullname,
			id: action.payload.id,
			avatar_url: action.payload.avatar_url,
		};
		// eslint-disable-next-line eqeqeq
	} else if (action.type == auth_types.logout) {
		return { ...init };
	}
	return state;
}
export default userReducer;
