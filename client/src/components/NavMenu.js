import { useState } from 'react'
import { useLogout } from '../utils/auth'

import CloseButton from '../components/CloseButton'
import MenuButton from '../components/MenuButton'
import NavLink from '../components/NavLink'

const NavMenu = ({loggedIn}) => {
    const [showMenu, setShowMenu] = useState(false)

    const getLogout = useLogout()

    const logout = event => {
        event.preventDefault()
        getLogout()
    }

    return (
        <>
            {loggedIn && <MenuButton id='show-menu-button' onClick={_ => setShowMenu(true)}/>}
            <nav
                id='menu'
                style={{transform: 'translate(' + (showMenu ? 0 : 100) + '%)'}}
                onClick={_ => setShowMenu(false)}
            >
                <h2>Menu</h2>
                <CloseButton id='close-menu-button' onClick={_ => setShowMenu(false)}/>
                <NavLink value='Home'/>
                <NavLink value='Company'/>
                <a onClick={logout}>Logout</a>
            </nav>
        </>
    )
}

export default NavMenu