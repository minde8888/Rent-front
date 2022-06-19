import { render, screen } from "@testing-library/react"
import NavBar from "./navbar.component"


xtest("render navbar", () => {
    render(<NavBar />);
    const divElement = screen.getByRole("navBar")
    expect(divElement).toBeInTheDocument()
})