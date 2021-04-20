import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthenticatedUser, useAuthTokenStore, useIsAuthenticated } from "./utils/auth"
import GlobalValues from './utils/GlobalValues'
import API from './utils/API'

import './styles/App.css'
import PageHeader from './pages/PageHeader'
import PageMain from './pages/PageMain'
import PageFooter from './pages/PageFooter'

const App = _ => {
	useAuthTokenStore()
	const loggedIn = useIsAuthenticated()
	const user = useAuthenticatedUser()
	const history = useHistory()

	return (
		<GlobalValues.Provider value={{user}}>
			<PageHeader loggedIn={loggedIn}/>
			<PageMain loggedIn={loggedIn}/>
			<PageFooter/>
		</GlobalValues.Provider>
	)
}
export default App
