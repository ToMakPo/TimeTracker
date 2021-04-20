import { BsFilter } from "react-icons/bs"

function FilterButton({className, size, ...props}) {
    className = 'filter-button' + (className ? (' ' + className) : '') 
    return <BsFilter
        className={className}
        size={size || 30}
        {...props}
    />
}

export default FilterButton