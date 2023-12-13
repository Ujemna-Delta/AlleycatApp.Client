import {ReactElement} from "react";
import {
    DatePicker,
    IStackProps,
    Label,
    PrimaryButton,
    SpinButton,
    Stack,
    TextField,
    TimePicker,
    Toggle
} from "@fluentui/react";
import "./modify-race-page.css";
import {useNavigate} from "react-router-dom";

export default function ModifyRacePage(): ReactElement {
    const navigate = useNavigate();
    const columnProps: Partial<IStackProps> = {
        tokens: {childrenGap: 15},
        styles: {root: {width: 300}},
    };

    const handleClick = () => {
        navigate("/races");
    }

    return (
        <div className="modify-race-page">
            <form autoComplete="off">
                <h1>New race</h1>

                <Stack horizontal tokens={{childrenGap: 50}} styles={{root: {width: 800}}}>
                    <Stack {...columnProps}>
                        <TextField label="Name" required/>

                        <DatePicker isRequired label="Begin Date"/>
                        <TimePicker required label="Begin Hour"/>
                    </Stack>

                    <Stack {...columnProps}>
                        <TextField label="Description"/>
                        <TextField label="Address" required/>
                        <Label>Modifier</Label>
                        <SpinButton
                            defaultValue="0"
                            min={-2}
                            max={2}
                            step={0.01}
                        />
                    </Stack>
                </Stack>
                <br/>
                <Stack tokens={{childrenGap: 50}} styles={{root: {width: 800}}}>
                    <Toggle label="Free Order"/>
                    <PrimaryButton text="Create" onClick={handleClick}/>
                </Stack>
            </form>
        </div>
    );
}