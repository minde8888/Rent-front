import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import NavBar from "./navbar.component";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { userLogout } from "../../redux/slice/authSlice";


// const server = setupServer(rest.get("/api", (_req, _res, ctx) => {
//     return rest(ctx.json({ isLoggedIn: true }));
// }));

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
//mocking mswjs.io
describe('<Navbar />', () => {

    test('renders', () => {
        const { baseElement } = render(<Provider store={store}><BrowserRouter><NavBar /></BrowserRouter></Provider>)
        expect(baseElement).toBeVisible()
    })

    test('renders correct <NavLink />', () => {
        const { getByAltText, getAllByRole, debug } = render(<Provider store={store}><BrowserRouter><NavBar /></BrowserRouter></Provider>)

        const links: HTMLAnchorElement[] = screen.getAllByRole("link");
        expect(links[0].href).toContain("/");
        expect(links[1].href).toContain("/products");
        expect(links[2].href).toContain("/add-products");
        expect(links[3].href).toContain("/login");
        expect(links[3].textContent).toEqual("Login");
        expect(links[4].href).toContain("/signup");
        expect(links[4].textContent).toEqual("Sign Up");


        // expect(links[6].href).toContain("/logout");
        // expect(links[6].textContent).toEqual("Logout");

    })

})