import '../styles/PageHeader.css'
import NavMenu from '../components/NavMenu'

const PageHeader = ({loggedIn}) => {
    return (
        <header className='page-header'>
            <h1>Time Tracker</h1>
            {/* <NavMenu loggedIn={loggedIn}/> */}
        </header>
    )
}

export default PageHeader