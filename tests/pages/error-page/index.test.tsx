import {configure, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {routes} from "../../../src/routes/routes";
import {renderWithRouter} from "../../testHelpers";
import ErrorPage from "../../../src/pages/error-page";

configure({ testIdAttribute: 'class' })

describe("ErrorPage handle routing errors", () => {
    it("Renders error message", () => {
        renderWithRouter(routes, ["/error"]);

        const errorTitle = screen.getByText(/oops/i);
        expect(errorTitle).toBeInTheDocument();

        const statusMessage = screen.queryByTestId("error-code");
        expect(statusMessage).toBeInTheDocument();

        const homeButton = screen.getByText(/home/i);
        expect(homeButton).toBeInTheDocument();
    });

    it("Redirects to home", () => {
        renderWithRouter(routes, ["/error"]);

        const homeButton = screen.getByText(/home/i);
        expect(homeButton).toBeInTheDocument();

        userEvent.click(homeButton);

        // Disable for this line, because IDE is not detecting variable window
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(window.location.pathname).toBe("/");
    });
});

describe("ErrorPage handle programmer errors", () => {

    const ErrorComponent = () => {
        // Disable for this line, because IDe is not detecting class Error
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw new Error("Programmer error");

        return (
            <div>
                Component
            </div>
        );
    }

    it("Renders error message on programmer error", () => {
        renderWithRouter([{
            path: "/programmer-error",
            element: <ErrorComponent/>,
            errorElement: <ErrorPage/>
        }], ["/programmer-error"]);

        const errorTitle = screen.getByText(/oops/i);
        expect(errorTitle).toBeInTheDocument();

        const statusMessage = screen.queryByTestId("error-code");
        expect(statusMessage).toBeInTheDocument();

        const errorMessage = screen.queryByText(/programmer error/i, { exact: false});
        expect(errorMessage).toBeInTheDocument();
    });
});

describe("ErrorPage handle unknown errors", () => {
    it("Render error message on unknown error", () => {
        renderWithRouter([{
            path: "/",
            element: <ErrorPage/>
        }], ["/"]);

        const errorTitle = screen.getByText(/oops/i);
        expect(errorTitle).toBeInTheDocument();

        const statusMessage = screen.queryByTestId("error-code");
        expect(statusMessage).not.toBeInTheDocument();
    })
});