import React from 'react'
import Navbar from '../navbar/Navbar.jsx'
import {  Outlet } from 'react-router-dom'
import Footer from '../footer/Footer.jsx'


export default function Layout({Logout , userdata ,count}) {
  return <>
    

  
    
        <div className="col-md-12">
          <Navbar   Logout={Logout} userdata={userdata} />
        </div>
        <div id="layout" className="col-md-12">
          
          <Outlet />
        </div>
    
      <div className="col-md-12">
        <Footer/>
      </div>

      
        
          
 
 
          
       
        
      

  </>
}