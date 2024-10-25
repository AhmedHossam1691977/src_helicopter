import React from 'react'
import Navbar from '../navbar/Navbar.jsx'
import {  Outlet } from 'react-router-dom'
import Footer from '../footer/Footer.jsx'


export default function Layout({Logout , userdata ,count}) {
  return <>
    
 
<Navbar  Logout={Logout} userdata={userdata} />
      
          <Outlet />
        
          <Footer/>
 
 
          
       
        
      

  </>
}