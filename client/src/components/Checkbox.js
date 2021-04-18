import { forwardRef } from 'react'

import '../styles/Form.css'

const Checkbox = forwardRef(({name, type, id, label, ...props}, ref) => {
    id = id || name.toLowerCase().replace(' ', '-') + '-checkbox'
    return (
        <div className='checkbox form-item'>
            <input
                id={id}
                type={'checkbox'}
                ref={ref}
                {...props}
            />
            <label htmlFor={id}>{label || name}</label>
        </div>
    )
})

export default Checkbox