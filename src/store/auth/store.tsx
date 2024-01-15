import {create} from "zustand";
import {IAuthForm} from "./form.tsx";
import {leitenRequest} from "leiten-zustand";
import {decodeToken} from "react-jwt";

const $LOCAL_TOKEN = "token";

interface IToken {
    unique_name: string;
}

interface AuthState {
    token: string | undefined;
    logout: () => void;
    userName: () => string;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    token: localStorage.getItem($LOCAL_TOKEN) || undefined,
    logout: () =>
        set(() => {
            localStorage.removeItem($LOCAL_TOKEN);
            return {token: undefined}
        }),
    userName: () => {
        const token = get().token;

        if (token === undefined) {
            return "Unknown";
        }

        const decoded = decodeToken<IToken>(token);

        if (decoded === null || decoded === undefined) {
            return "Unknown";
        }

        return decoded.unique_name;
    }
}));

export const useAuthRequest = leitenRequest(useAuthStore, "token", async (form: IAuthForm) => {
    const response = await fetch("/api/users/Session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': "*"
        },
        body: JSON.stringify(
            form
        )
    });

    if (response.status === 400) {
        throw new Error(response.statusText);
    }

    return await response.text();
}, {
    fulfilled: ({result}) => {
        localStorage.setItem($LOCAL_TOKEN, result);
    }
});