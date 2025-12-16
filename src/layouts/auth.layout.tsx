import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSigninCheck } from 'reactfire';

const AuthLayout = () => {
	const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

	// mostrar un loader mientras se verifica el estado de autenticación
	if (status === 'loading' || !hasEmitted) {
		return <div>Loading...</div>;
	}

	// redirigir si el usuario está autenticado
	if (status === 'success' && signInCheckResult.signedIn) {
		return <Navigate to='/admin' replace />;
	}
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
