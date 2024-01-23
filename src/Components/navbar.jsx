import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import './Navbar.css';

const Navbar = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut()
    console.log("log out");
    return navigate("/login")
  }
  return (
    <nav className="navbar">
      

      <div className="user-actions">
        
        <div className='page-center'>
            <div className="home">
            <h3>Terms And Condition Summarization</h3>

                <div className="">
                    <button type="button" className='logOut' onClick={handleLogOut}>
                        <div className="_9_68 _9_6b _9_6h _9_6j _9_6x">Log Out</div>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
