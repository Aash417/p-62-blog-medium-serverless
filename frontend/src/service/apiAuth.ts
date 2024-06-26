import { handleAxiosError } from '@/utils/helperFn';
import { UserDataType } from '@/utils/types';
import { SignupType } from '@aashishk17/medium-common';
import axios from 'axios';

export async function getCurrentUser(): Promise<UserDataType | undefined> {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_BackendUrl}/api/v1/user/currentUser`,
			{ withCredentials: true }
		);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}

export async function logOutUser() {
	try {
		const response = await axios.get(`${import.meta.env.VITE_BackendUrl}/api/v1/user/logout`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
}

export async function logInSignUpUser(type: string, postInputs: SignupType) {
	const response = await axios.post(
		`${import.meta.env.VITE_BackendUrl}/api/v1/user/${type === 'signup' ? 'signup' : 'login'}`,
		postInputs,
		{ withCredentials: true }
	);
	return response.data;
}
