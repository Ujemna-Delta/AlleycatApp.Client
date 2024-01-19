import {ReactElement, ReactNode} from "react";
import {useAuthStore} from "../../store/auth/store.tsx";
import {ERole} from "./role.ts";

interface ProtectedViewProps {
    children: string | ReactNode | ReactNode[];
    role: ERole;
}

export default function ProtectedView({children = "", role = ERole.Any}: ProtectedViewProps): ReactElement {
    const tokenRole = useAuthStore((store) => store.getRole)();

    if (role != "any" && (tokenRole === undefined || tokenRole !== role)) {
        return (
            <></>
        );
    }

    return (
        <>
            {children}
        </>
    );
}