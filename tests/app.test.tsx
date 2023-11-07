import {render} from "@testing-library/react";
import App from "../src/app";

it("App renders", () => {
    const {getByText} = render(
        <App/>
    );

    expect(getByText("Hello World")).toBeTruthy();
})