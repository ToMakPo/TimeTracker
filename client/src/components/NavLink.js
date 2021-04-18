import { Link } from "react-router-dom"

function NavLink({value, id, to, ...params}) {
    id = id || value.toLowerCase().replace(' ', '-') + '-nav-link'
    to = to || value.toLowerCase().replace(' ', '')
    params.className = 'nav-link' + (params.className ? ' ' + params.className : '')
    return <Link id={id} to={to} {...params}>{value}</Link>
}

export default NavLink