import { User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { create } from "zustand";

// import { auth } from "../firebase.config";

// const provider = new GoogleAuthProvider();

// auth.onAuthStateChanged(function (user) {
//     useAuthStore.setState({ user });
// } );

interface IAuthState {
    user: "user" | null;
}

export const useAuthStore = create<IAuthState>((set) => ({
    user: null
}));

// export async function signInWithGoogle() {
//     try {
       
//         const result = await signInWithPopup(auth, provider);
        
//         const user = result.user; 
        
//         useAuthStore.setState({user});
//     }
//     catch (e) {
//         // HANDLE ERRORS HERE
//     }
// }