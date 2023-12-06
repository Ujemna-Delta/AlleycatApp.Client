import {screen} from "@testing-library/react";
import {renderWithRouter} from "./testHelpers";
import {routes} from "../src/routes/routes";


describe("App is root of the application", () => {
    renderWithRouter(routes, ["/"]);

    it("Renders Hello Page", () => {
        const helloWorldMessage = screen.getByText("hello world", {exact: false});
        expect(helloWorldMessage).toBeInTheDocument();
    });

    it("Contains sidebar", () => {
        const homeLink = screen.getByText("home", {exact: false});
        expect(homeLink).toBeInTheDocument();
    });
});