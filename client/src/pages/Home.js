import { useContext, useState, useRef } from 'react'
import GlobalValues from '../utils/GlobalValues'

// import '../styles/Home.css'

import ShiftLog from "../components/ShiftLog"

const Home = _ => {
    const { user } = useContext(GlobalValues)
    
    return (
        <div className='home-page'>
            <ShiftLog userId={user._id} user={user}/>
        </div>
    )
}

export default Home