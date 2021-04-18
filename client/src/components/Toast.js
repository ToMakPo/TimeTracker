import { useEffect, useState } from "react"

import '../styles/Toast.css'

const Toast = ({message, bgColor, fgColor, delay, setToast}) => {
    useEffect(_ => setTimeout(_ => setToast(), delay || (message.split(' ').length * 450)), [])

    return (
        <div
            className='toast'
            style={{
                backgroundColor: bgColor || '#666',
                color: fgColor || '#fff'
            }}>
            {message.split('\n').map((line, i) => <div key={i}>{line}</div>)}
        </div>
    )
}

export default Toast