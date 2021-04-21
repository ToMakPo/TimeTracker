import { forwardRef } from 'react'

import '../styles/Form.css'

const Input = forwardRef(({name, type, id, label, include, ...props}, ref) => {
    id = id || name.toLowerCase().replace(' ', '-') + '-input'
    
    return (
        <div className='input-field form-item'>
            <label htmlFor={id}>{label || name}{include}</label>

            <input
                id={id}
                type={type || 'text'}
                ref={ref}
                {...props}
            />
        </div>
    )
})

export default Input