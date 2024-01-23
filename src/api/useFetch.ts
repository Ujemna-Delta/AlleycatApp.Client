import {useEffect, useState} from "react";


export const useFetch = <TData>(url: string, init: RequestInit | undefined = undefined) => {
    const [data, setData] = useState<TData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refetchBit, setRefetchBit] = useState<boolean>(false);

    const refetch = () => setRefetchBit(!refetchBit);

    useEffect(() => {
        const abortController = new AbortController();
        setIsLoading(true);
        setData(null);
        setError(null);

        fetch(url, init)
            .then((response) => {
                if (!response.ok) {
                    throw Error("Could not fetch the data")
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setData(data)
                setIsLoading(false);
                setError(null);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    setError("Network Error");
                }

                setIsLoading(false);
            })

        return abortController.abort();
    }, [url, init, refetchBit]);

    return {data, isLoading, error, refetch};
}