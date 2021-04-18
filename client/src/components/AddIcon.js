import { IoIosAddCircle } from "react-icons/io"

function AddIcon({className, size, color, ...props}) {
    className = 'add-button' + (className ? (' ' + className) : '') 
    return <IoIosAddCircle
        className={className}
        size={size || 25}
        color={color || '#91aa3f'}
        {...props}
    />
}

export default AddIcon