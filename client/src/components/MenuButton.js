import { BsThreeDotsVertical } from "react-icons/bs"

function MenuButton({className, size, ...props}) {
    className = 'menu-button' + (className ? (' ' + className) : '') 
    return <BsThreeDotsVertical
        className={className}
        size={size || 20}
        {...props}
    />
}

export default MenuButton