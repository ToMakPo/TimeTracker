import { useContext, useState, useRef } from 'react'
import GlobalValues from '../utils/GlobalValues'

// import '../styles/Home.css'

import ShiftLog from "../components/ShiftLog"

const Home = _ => {
    const { user } = useContext(GlobalValues)
    console.log(user);
    return (
        <div className='home-page'>
            <h2>Home Page</h2>
            <ShiftLog userId={user._id}/>
        </div>
    )
}

export default Home