import {create} from "zustand";
import {IAuthForm} from "./form.tsx";
import {leitenRequest} from "leiten-zustand";

const $LOCAL_TOKEN = "token";

interface AuthState {
    token: string | undefined;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    token: localStorage.getItem($LOCAL_TOKEN) || undefined,
    logout: () =>
        set(() => {
            localStorage.removeItem($LOCAL_TOKEN);
            return {token: undefined}
        })
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