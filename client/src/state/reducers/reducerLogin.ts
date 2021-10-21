import { IactionLoginRegister } from '../actions';
import { ActionType } from '../actions/actionTypes';
import jwtDecode from 'jwt-decode';

const initialStateLogin = {
  loading: false,
  status: true,
  message: '',
  error: '',
  auth: false,
  data: {
    userId: 0,
    email: '',
    username: '',
    balance: 0,
    createdAt: '',
    accessToken: '',
    location: {
      latitude: 37.1,
      longitude: -7.91,
    },
  },
};

// HOW JWT WORKS
//
// 1. server create jwt token when login
// 2. client recieved it and store it
// 3. client can use the jwt as credential everytime (until expired)

// HOW CODE BELOW WORKS
//
// Everytime the page refreshed, the code below is executed
// if there is no token
// if the token is expired, logout
// -------- (user = null)
// if not, assign the user info to the reducer
// -------- (user = user) => can be used inside the app
// (that is checked everytime user try to access some protected endpoind)
// so user don't have to login again

if (localStorage.getItem('jwtToken')) {
  // const decodedToken: any = jwtDecode(localStorage.getItem('jwtToken'))
  const decodedToken: any = jwtDecode(localStorage.getItem('jwtToken') || '{}');

  console.log('jwt data ', decodedToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
    // AuthProvider.logout()
    // No need for this, as when refreshed it comes back to init state
  } else {
    initialStateLogin.auth = true;
    initialStateLogin.data = decodedToken.payload;
  }
}

const LoginReducer = (
  state = initialStateLogin,
  action: IactionLoginRegister
) => {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      console.log('in reducer request');
      return { ...state, loading: true };
    case ActionType.LOGIN_SUCCESS:
      console.log(action.payload.data);
      localStorage.setItem('jwtToken', action.payload.data.accessToken);
      console.log('in reducer');
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        status: action.payload.status,
        auth: true,
      };
    case ActionType.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload.message };
    case ActionType.LOGOUT:
      localStorage.removeItem('jwtToken');
      return {
        ...state,
        loading: false,
        status: true,
        message: '',
        error: '',
        auth: false,
        data: {
          userId: 0,
          email: '',
          username: '',
          balance: 0,
          createdAt: '',
          accessToken: '',
          location: {
            latitude: 37.1,
            longitude: -7.91,
          },
        },
      };
    default:
      return state;
  }
};

export default LoginReducer;
