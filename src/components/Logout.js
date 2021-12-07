import * as taskService from '../services/taskService'

import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Logout() {
	const {user, logout} = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		taskService.logout(user)
			.then(() => {
				logout();
				history.push("/");
			})
	}, [history, user, logout])

	return null;
}