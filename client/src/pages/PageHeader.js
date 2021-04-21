import '../styles/PageHeader.css'
import NavMenu from '../components/NavMenu'
import logo from '../images/clock.svg'

const PageHeader = ({loggedIn}) => {
    return (
        <header className='page-header'>
            <h1><img src={logo} alt='clock icon'/> Time Tracker</h1>
            {/* <NavMenu loggedIn={loggedIn}/> */}
        </header>
    )
}

export default PageHeader