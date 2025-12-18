import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
	type AuthError,
} from 'firebase/auth';
import { useState } from 'react';
import { useAuth } from 'reactfire';

/**
 * Estructura de respuesta de las acciones de autenticación.
 * - `success`: indica si la operación fue exitosa.
 * - `error`: objeto `AuthError` de Firebase en caso de fallo.
 */
interface AuthActionsResponse {
	success: boolean;
	error: AuthError | null;
}

/**
 * Hook con acciones de autenticación.
 * Provee un estado `loading` y las funciones `login` y `register`.
 */
export const useAuthActions = () => {
	// Estado local para indicar que una acción asíncrona está en curso
	const [loading, setLoading] = useState(false);
	// Instancia de Auth proporcionada por reactfire para llamar a las funciones de Firebase Auth
	const auth = useAuth();

	/**
	 * Inicia sesión con email y contraseña usando Firebase Auth.
	 * - Establece `loading` en true mientras se realiza la petición.
	 * - Llama a `signInWithEmailAndPassword` con credenciales del usuario.
	 * - Retorna un objeto indicando éxito o error.
	 */
	const login = async (data: {
		email: string;
		password: string;
	}): Promise<AuthActionsResponse> => {
		// Marcar inicio de la operación asíncrona
		setLoading(true);
		try {
			// Intentar iniciar sesión en Firebase con email/password
			await signInWithEmailAndPassword(auth, data.email, data.password);
			// Si la petición es exitosa, devolvemos el resultado positivo
			return {
				success: true,
				error: null,
			};
		} catch (error) {
			// Capturar el error y castearlo a AuthError para proporcionar información útil
			const authError = error as AuthError;
			return {
				success: false,
				error: authError,
			};
		} finally {
			// Desactivar el indicador de carga al finalizar (éxito o error)
			setLoading(false);
		}
	};

	/**
	 * Registra un nuevo usuario con email, contraseña y nombre de usuario en Firebase Auth.
	 * - Establece `loading` en true mientras se realiza la petición.
	 * - Crea la cuenta y actualiza el perfil del usuario con el nombre mostrado.
	 * - Retorna un objeto indicando éxito o error.
	 */
	const register = async (data: {
		email: string;
		password: string;
		displayName: string;
	}): Promise<AuthActionsResponse> => {
		setLoading(true);
		try {
			// Crear nuevo usuario en Firebase con email/password
			const currentUser = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			// Actualizar el perfil del usuario con el nombre mostrado
			if (currentUser.user) {
				await updateProfile(currentUser.user, {
					displayName: data.displayName,
				});
			}
			// Si la petición es exitosa, devolvemos el resultado positivo
			return {
				success: true,
				error: null,
			};
		} catch (error) {
			// Capturar el error y castearlo a AuthError para proporcionar información útil
			const authError = error as AuthError;
			return {
				success: false,
				error: authError,
			};
		} finally {
			// Desactivar el indicador de carga al finalizar (éxito o error)
			setLoading(false);
		}
	};

	const loginWithGoogle = async (): Promise<AuthActionsResponse> => {
		setLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			return {
				success: true,
				error: null,
			};
		} catch (error) {
			const authError = error as AuthError;
			return {
				success: false,
				error: authError,
			};
		} finally {
			setLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		setLoading(true);
		try {
			await signOut(auth);
		} catch (error) {
			console.error('Error during logout:', error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		login,
		register,
		loginWithGoogle,
		logout,
	};
};
