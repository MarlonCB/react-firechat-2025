import React from 'react';
import { useAuthActions } from '../../hooks/use-auth-actions';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

const LoginPage = () => {
	const { loginWithGoogle } = useAuthActions();

	const handleLoginWithGoogle = async () => {
		const result = await loginWithGoogle();
		if (result.success) {
			console.log('Login successful');
		} else {
			console.error('Login failed:', result.error);
			toast.error(`Login failed: ${result.error}`);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-center'>Welcome to FireChat</CardTitle>
				<CardDescription className='text-center mb-4'>
					Login to your account using email and password or with Google
				</CardDescription>
			</CardHeader>
			<CardContent>...</CardContent>
			<CardFooter>
				<Button className='w-full' onClick={handleLoginWithGoogle}>
					Sign in with Google
				</Button>
			</CardFooter>
		</Card>
	);
};

export default LoginPage;
