import { useContext, useState, useRef } from 'react'

import GlobalValues from '../utils/GlobalValues'
import API from '../utils/API'

// import '../styles/Company.css'
import '../styles/Form.css'
import '../styles/Modal.css'

import Input from '../components/Input'
import AddButton from '../components/AddIcon'
import CloseButton from '../components/CloseIcon'

const Company = _ => {
    const { companies, setCompany } = useContext(GlobalValues)
    const [modal, setModal] = useState()

    return (
        <div className='company-page'>
            <h2>Company Page</h2>
            <AddButton onClick={_ => setModal(<Modal/>)}/>
            {modal}
        </div>
    )

    function Modal({company}) {
        const nameInput = useRef()

        function save() {

        }

        return (
            <div className='modal-bg'>
                <div className='modal'>
                    <CloseButton onClick={_ => setModal()} />
                    <h2>{company ? 'Edit' : 'New'} Company</h2>
                    {/* <form onSubmit={}> */}

                    {/* </form> */}
                </div>
            </div>
        )
    }
}

export default Company