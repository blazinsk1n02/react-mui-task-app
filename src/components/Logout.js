import * as taskService from '../services/taskService'

import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { userAtom } from '../atoms/user';
import { useRecoilState } from 'recoil';

export default function Logout() {
  const [user, setUser]  = useRecoilState(userAtom);
	const history = useHistory();

	useEffect(() => {
		taskService.logout(user)
			.then(() => {
				setUser({});
				history.push("/");
			})
	}, [history, user])

	return null;
}