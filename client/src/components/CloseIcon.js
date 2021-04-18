import { IoIosClose } from "react-icons/io"

function CloseIcon({className, size, ...props}) {
    className = 'close-button' + (className ? (' ' + className) : '') 
    return <IoIosClose
        className={className}
        size={size || 40}
        {...props}
    />
}

export default CloseIcon