import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AuthRoute({ component: Component, ...args }) {
    const auth = useSelector(state => state.login.auth);

    return (
        <Route
            {...args}
            render={props =>
                auth
                    ? <Component {...props} />
                    : <Redirect to="/login" />

            }
        />
    )
}

export default AuthRoute