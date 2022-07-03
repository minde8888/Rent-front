import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import Profile from "../profile.component";
import Edit from "./profileEdit.component";


describe('<Edit />', () => {
    xtest('renders', () => {
        const { baseElement } = render(<Edit passToggle={jest.fn()} />)
        expect(baseElement).toBeVisible()
    })
})