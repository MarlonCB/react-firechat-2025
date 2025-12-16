import React from 'react';
import { useAuth, useUser } from 'reactfire';

const DashboardPage = () => {
	const auth = useAuth();
	const { data: user } = useUser();
	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome, {user?.displayName || user?.email}</p>
			<p>Email: {user?.email || 'Not Provided'} </p>
			<button onClick={async () => await auth.signOut()}>Sign Out</button>
		</div>
	);
};

export default DashboardPage;
