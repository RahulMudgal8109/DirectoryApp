import React from 'react'
import {Link} from "react-router-dom";


const Navbar2 = () => {
  return (
    <div className='navbar2'>
        <div className='navbar2-left'>
            <button className='addNew'><Link to="/" className="addNew">Add New Person</Link></button>
            <button className='retrive'><Link to="retrive" className="retrive">Retrive Information</Link></button>
        </div>
        <div className='navbar2-right'>

        </div>
    </div>
  )
}

export default Navbar2