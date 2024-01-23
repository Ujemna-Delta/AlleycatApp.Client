import React, {ReactElement, useState} from "react";
import {IStackProps, PrimaryButton, Stack, TextField} from "@fluentui/react";
import "./modify-league-page.css";
import {useNavigate} from "react-router-dom";
import {LeagueForm} from "../../api/models/league-form.ts";
import {addLeague} from "../../api/users.ts";


export default function ModifyLeaguePage(): ReactElement {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [state, setState] = useState<LeagueForm>({
        name: "",
        description: ""
    });

    const columnProps: Partial<IStackProps> = {
        tokens: {childrenGap: 15},
        styles: {root: {width: 300}},
    };

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const element = event.target as HTMLInputElement;

        setState({
            ...state,
            [element.name]: element.value
        })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        let success: boolean = true;

        setLoading(true);
        try {
            await addLeague(state);
        } catch (error: unknown) {
            if (error instanceof Error) {
                success = false;
                setError(error.message)
            }
        }
        setLoading(false);

        if (success) {
            navigate("/seasons");
        }
    }

    if (loading) {
        return (
            <>
                <div className="modify-league-page">
                    Loading...
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="modify-league-page">
                    {error}
                </div>
            </>
        );
    }

    return (
        <div className="modify-league-page">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h1>New league</h1>

                <Stack horizontal tokens={{childrenGap: 50}} styles={{root: {width: 800}}}>
                    <Stack {...columnProps}>
                        <TextField label="Name" name="name" value={state.name} onChange={handleChange} required/>
                    </Stack>

                    <Stack {...columnProps}>
                        <TextField label="Description" name="description" value={state.description}
                                   onChange={handleChange}/>
                    </Stack>
                </Stack>
                <br/>
                <Stack tokens={{childrenGap: 50}} styles={{root: {width: 800}}}>
                    <PrimaryButton text="Create" type="submit"/>
                </Stack>
            </form>
        </div>
    );
}