import { Route, Switch } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Company from './Company'
import PageNotFound from './PageNotFound'

const PageMain = ({loggedIn}) => {
    return (
        <main>
            {!loggedIn ? (
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />

                    <Route component={PageNotFound} />
                </Switch>
            ) : (
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/company' component={Company} />

                    <Route component={PageNotFound} />
                </Switch>
            )}
        </main>
    )
}

export default PageMain