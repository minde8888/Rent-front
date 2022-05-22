import { combineReducers } from 'redux';
import { Login } from '../../components/Auth/Login/Login.component';

const rootReducer = combineReducers({
    Login
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
