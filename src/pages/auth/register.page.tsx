import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useAuth } from 'reactfire';

const RegisterPage = () => {
	const auth = useAuth();

	const handleClickGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.error('Error during Google sign-in:', error);
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<button onClick={handleClickGoogle}>Sign In Google</button>
		</div>
	);
};

export default RegisterPage;
