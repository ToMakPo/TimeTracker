import { BsFilter } from "react-icons/bs"

function FilterButton({className, size, ...props}) {
    className = 'menu-button' + (className ? (' ' + className) : '') 
    return <BsThreeDotsVertical
        className={className}
        size={size || 20}
        {...props}
    />
}

export default FilterButton