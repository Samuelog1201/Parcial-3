import { appState } from '../store';
let db: any;
let auth: any;
let storage: any;

// Instancia de FireBase
export const getFirebaseInstance = async () => {
    if (!db) {
        const { initializeApp } = await import('firebase/app');
		const { getFirestore } = await import('firebase/firestore');
		const { getAuth } = await import('firebase/auth');
		const { getStorage } = await import('firebase/storage');

        const firebaseConfig = {
            apiKey: "AIzaSyDUhZo4U05Ov5VWynQAOQnxGkn5KYh3868",

            authDomain: "parcial3-b1e02.firebaseapp.com",
          
            projectId: "parcial3-b1e02",
          
            storageBucket: "parcial3-b1e02.firebasestorage.app",
          
            messagingSenderId: "453256511826",
          
            appId: "1:453256511826:web:3e3e280b12034a24b07a8b"
          
          };
        
        const app = initializeApp(firebaseConfig);
		db = getFirestore(app);
		auth = getAuth(app);
		storage = getStorage();
	}
	return { db, auth, storage };
};

// Función para iniciar sesión de un usuario
export const loginUser = async (email: string, password: string) => {
	try {
		const { auth } = await getFirebaseInstance();
		const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth');

		setPersistence(auth, browserLocalPersistence)
			.then(() => {
				return signInWithEmailAndPassword(auth, email, password);
			})
			.catch((error: any) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	} catch (error) {
		console.error(error);
	}
};

// Función para registrar un usuario
export const registerUser = async (credentials: any) => {
	try {
		const { auth, db } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const { doc, setDoc } = await import('firebase/firestore');

		const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			age: credentials.age,
			name: credentials.name,
		};

		await setDoc(where, data);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

// Función para Logout
export const logOut = async () => {
    const { auth } = await getFirebaseInstance();
    const { signOut } = await import('firebase/auth');
    signOut(auth).then(() => {
        console.log('Has cerrado sesion');
      }).catch((error) => {
        console.error('Error al eliminar el tweet', error);
    });
};