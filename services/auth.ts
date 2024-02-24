import { User } from "firebase/auth";
import { create } from "zustand";

import { auth } from "../firebase.config";


auth.onAuthStateChanged(function (user) {
    useAuthStore.setState({ user });
} );

interface IAuthState {
    user: User | null;
}

export const useAuthStore = create<IAuthState>((set) => ({
    user: null
}));