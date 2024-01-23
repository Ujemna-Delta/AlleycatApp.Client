import {ReactElement, useState} from "react";
import LoadingIcon from "../../../../components/loading-icon";
import "./races-list-element-attendee.css";
import {useAuthStore} from "../../../../store/auth/store.tsx";
import {PrimaryButton} from "@fluentui/react";
import {useFetch} from "../../../../api/useFetch.ts";
import {putAttendance, removeAttendance} from "../../../../api/races.ts";

interface IRacesListElementAttendee {
    id: number;
}

interface IConfirmation {
    id: number;
    isConfirmed: boolean;
}

export default function RacesListElementAttendee({id}: IRacesListElementAttendee): ReactElement {
    const userId = useAuthStore((state) => state.userId);
    const {data: confirmation, isLoading, error, refetch} = useFetch<IConfirmation>(`/api/Races/attendances/${id}/${userId()}`)
    const [isLoadingRequest, setIsLoadingRequest] = useState<boolean>(false);

    const handleOptIn = () => {
        setIsLoadingRequest(true);

        putAttendance(id, userId()).then(() => {
            console.log('put');
            setIsLoadingRequest(false);
            refetch();
        });
    }

    const handleOptOut = () => {
        if (confirmation == null) {
            return;
        }

        setIsLoadingRequest(true);

        removeAttendance(confirmation!.id).then(() => {
            setIsLoadingRequest(false);
            refetch();
        });
    }

    if (error != null) {
        return (
            <div className="button-frame btn-red">
                Error
            </div>
        );
    }

    if (isLoading || isLoadingRequest) {
        return (
            <div className="button-frame">
                <LoadingIcon color="black"/>
            </div>
        );
    }

    const isConfirmed = confirmation == null ? false : confirmation.isConfirmed;

    return (
        <>
            {isConfirmed ? (
                <PrimaryButton className="btn-red" toggle text="Opt out" onClick={handleOptOut}/>
            ) : (
                <PrimaryButton className="btn-green" toggle text="Opt in" onClick={handleOptIn}/>
            )}
        </>
    );
}