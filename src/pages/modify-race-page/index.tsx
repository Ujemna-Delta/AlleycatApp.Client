import React, {ReactElement, useState, useEffect} from "react";
import {
    DatePicker,
    IComboBox,
    IStackProps,
    PrimaryButton,
    SpinButton,
    Stack,
    TextField,
    TimePicker,
    Toggle,
    Dropdown,
    IDropdownOption
} from "@fluentui/react";
import "./modify-race-page.css";
import {useNavigate} from "react-router-dom";
import {RaceForm} from "../../api/models/race-form.ts";
import {addRace} from "../../api/races.ts";
import League from "../../api/models/league.ts";
import {getLeagues} from "../../api/users.ts";


export default function ModifyRacePage(): ReactElement {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [leagues, setLeagues] = useState<League[]>([]);
    const [state, setState] = useState<RaceForm>({
        name: "",
        description: "",
        beginDate: new Date(),
        beginHour: new Date(),
        startAddress: "",
        valueModifier: 0.0,
        isActive: false,
        isFreeOrder: false,
        leagueId: 0
    });

    const columnProps: Partial<IStackProps> = {
        tokens: {childrenGap: 15},
        styles: {root: {width: 300}},
    };

    const updateleagues = async () => {
        const leagues = await getLeagues();
        return setLeagues(leagues);
    }

    useEffect(() => {
        updateleagues();
    }, []);

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const element = event.target as HTMLInputElement;

        setState({
            ...state,
            [element.name]: element.value
        })
    }

    function handleDateChange(date: Date | null | undefined) {
        setState({
            ...state,
            beginDate: date ? date : new Date()
        })
    }

    const handleTimeChange = (_event: React.FormEvent<IComboBox>, time: Date) => {
        setState({
            ...state,
            beginHour: time
        })
    }
    function handleLeagueChange(_event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void {
        // Check if an option is selected
        if (option) {
            setState({
                ...state,
                leagueId: option.key as number // Cast the key to a number if necessary
            });
        }
    }

    const handleValueModifierChange = (_event: React.SyntheticEvent<HTMLElement>, value?: string): void => {
        setState({
            ...state,
            valueModifier: value ? parseFloat(value) : 0.0
        });
    };

    const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
        setState({
            ...state,
            isFreeOrder: checked ? checked : false
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        let success: boolean = true;

        setLoading(true);
        try {
            await addRace(state);
        } catch (error: unknown) {
            if (error instanceof Error) {
                success = false;
                setError(error.message)
            }
        }
        setLoading(false);

        if (success) {
            navigate("/races");
        }
    }

    if (loading) {
        return (
            <>
                <div className="modify-race-page">
                    Loading...
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="modify-race-page">
                    {error}
                </div>
            </>
        );
    }

    const leagueOptions = leagues.map(league => ({
        key: league.id,
        text: league.name
    }));

    return (
        <div className="modify-race-page">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h1>New race</h1>

                <Stack horizontal tokens={{childrenGap: 50}} styles={{root: {width: 800}}}>
                    <Stack {...columnProps}>
                        <TextField label="Name" name="name" value={state.name} onChange={handleChange} required/>

                        <DatePicker label="Begin Date" value={state.beginDate} onSelectDate={handleDateChange}
                                    isRequired/>
                        <TimePicker label="Begin Hour" value={state.beginHour} onChange={handleTimeChange} required/>
                        <SpinButton
                            label="Modifier"
                            defaultValue={state.valueModifier.toString()}
                            min={-2}
                            max={2}
                            step={0.01}
                            onChange={handleValueModifierChange}
                        />
                    </Stack>

                    <Stack {...columnProps}>
                    <TextField label="Description" name="description" value={state.description}
                                   onChange={handleChange}/>
                    <TextField label="Address" name="startAddress" value={state.startAddress}
                               onChange={handleChange}
                               required/>
                    <Dropdown
                        label="Select League"
                        placeholder="Choose a league"
                        options={leagueOptions}
                        selectedKey={state.leagueId}
                        onChange={handleLeagueChange}
                        required
                        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
                    />

                    </Stack>
                </Stack>
                <br/>
                <Stack tokens={{childrenGap: 50}} styles={{root: {width: 800}}}>
                    <Toggle label="Free Order" checked={state.isFreeOrder} onChange={handleToggleChange}/>
                    <PrimaryButton text="Create" type="submit"/>
                </Stack>
            </form>
        </div>
    );
}