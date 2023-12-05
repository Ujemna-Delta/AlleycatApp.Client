import {createMemoryRouter, RouteObject, RouterProvider} from "react-router-dom";
import {render} from "@testing-library/react";

export function renderWithRouter(routes: RouteObject[] = [], history: string[] = []) {
    const router = createMemoryRouter(routes, {
        initialEntries: history
    });

    return render(<RouterProvider router={router}/>);
}