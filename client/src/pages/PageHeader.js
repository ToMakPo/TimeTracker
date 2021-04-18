import { useState } from 'react'
import { useLogout } from '../utils/auth'

import '../styles/PageHeader.css'
import CloseIcon from '../components/CloseIcon'
import MenuIcon from '../components/MenuIcon'
import NavLink from '../components/NavLink'

const PageHeader = ({loggedIn}) => {
    const [showMenu, setShowMenu] = useState(false)

    const getLogout = useLogout()

    const logout = event => {
        event.preventDefault()
        getLogout()
    }

    return (
        <header className='page-header'>
            <h1>Time Tracker</h1>
            {loggedIn && <MenuIcon id='show-menu-button' onClick={_ => setShowMenu(true)}/>}
            <nav
                id='menu'
                style={{transform: 'translate(' + (showMenu ? 0 : 100) + '%)'}}
                onClick={_ => setShowMenu(false)}
            >
                <h2>Menu</h2>
                <CloseIcon id='close-menu-button' onClick={_ => setShowMenu(false)}/>
                <NavLink value='Home'/>
                <NavLink value='Company'/>
                <a onClick={logout}>Logout</a>
            </nav>
        </header>
    )
}

export default PageHeader