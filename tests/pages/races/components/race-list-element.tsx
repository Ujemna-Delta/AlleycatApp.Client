import {render} from "@testing-library/react";
import RaceListElement from "../../../../src/pages/races/components/race-list-element";

describe("RaceListElement renders race details", () => {
    const race = {
        id: 1,
        name: "Simple",
        description: "it is not Complex, but Simple"
    };

    const wrapper = render(<RaceListElement race={race}/>);

    it("Displays race id", () => {
        const id = wrapper.getByText(/#1/i);
        expect(id).toBeInTheDocument();
    });

    it("Displays race name", () => {
        const name = wrapper.getByText(/Simple/i);
        expect(name).toBeInTheDocument();
    });

    it("Displays race description", () => {
        const name = wrapper.getByText(/Complex/i, {exact: false});
        expect(name).toBeInTheDocument();
    });
});