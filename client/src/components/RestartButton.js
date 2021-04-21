import { VscDebugRestart } from "react-icons/vsc"

function RestartButton({className, size, ...props}) {
    className = 'restart-button' + (className ? (' ' + className) : '') 
    return <VscDebugRestart
        className={className}
        size={size || 25}
        {...props}
    />
}

export default RestartButton