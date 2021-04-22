import { useAuthenticatedUser, useAuthTokenStore, useIsAuthenticated } from "./utils/auth"
import GlobalValues from './utils/GlobalValues'

import './styles/App.css'
import PageHeader from './pages/PageHeader'
import PageMain from './pages/PageMain'
import PageFooter from './pages/PageFooter'

const App = _ => {
	useAuthTokenStore()
	const loggedIn = useIsAuthenticated()
	const user = useAuthenticatedUser()

	return (
		<GlobalValues.Provider value={{user}}>
			<PageHeader loggedIn={loggedIn}/>
			<hr/>
			<PageMain loggedIn={loggedIn}/>
			<hr/>
			<PageFooter/>
		</GlobalValues.Provider>
	)
}
export default App
