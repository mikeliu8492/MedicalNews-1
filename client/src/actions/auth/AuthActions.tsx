import {LOGIN_DISPATCH, LOGOUT_DISPATCH} from './types';
import {ERROR_SET} from '../error/types';
import {setErrors} from '../error/ErrorActions';
import axios from 'axios';


export const loginDispatch = (email: string, password: string, history: any) => (dispatch: any) => {
    axios.post("http://localhost:5000/api/user/login", {email: email, password: password})
    .then(result => {
        const user: any = result.data;
        localStorage.setItem("token", user.token);
        localStorage.setItem("expiration", user.userData.exp.toString());
        history.push("/subscription");
        dispatch({
            type: LOGIN_DISPATCH,
            payload: {
                firstName: user.userData.firstName,
                lastName: user.userData.lastName,
                email: user.userData.email
            }
        })
    })
    .catch(err => {
        const errorList = err.response.data.errors;
        dispatch(setErrors(errorList));
    })
}

export const logoutDispatch = () => (dispatch: any) => {
    localStorage.clear();
    dispatch ({
        type: LOGOUT_DISPATCH,
        payload: {}
    })
}