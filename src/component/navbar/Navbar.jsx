import React, { useContext, useEffect, useState } from 'react';
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { BsBagHeart } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { catigoryContext } from '../../context/catigoryCotext/CatigoryCotext.js';
import { productContext } from '../../context/productContext/ProductContext.js';
import { CartContext } from '../../context/cartConteext/cartContext.js';


export default function Navbar({Logout , userdata}) {


  let {allCatigory} =useContext(catigoryContext)
  let {setProduct,product} = useContext(productContext)
  let{cartCount}=useContext(CartContext)
  


  const handleSearch = (event) => {
    const term = event.target.value;
    setProduct(term); 
  };
 
  
  useEffect(()=>{
  },[cartCount])



  return (
    <>
      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          <Link className="navbar-brand fw-bolder fs-3" to="/"><span className='fs-2 fw-bolder text-danger'>H</span>elicopter</Link>
          <div className="d-flex align-items-center justify-align-content-around">
            <div className="d-flex align-items-center d-lg-none me-2 my-2 justify-content-between">

            <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>


            <li  className="nav-item form-mob mx-4">
              <form className='nav-link'>
                <input 
                  className='form-control text-end w-100 form-sereash' 
                  type="search" 
                  value={product} 
                  onChange={handleSearch}  
                  placeholder="ابحث هنا..." 
                />
              </form>
                </li>


            <Link className="nav-link px-3 fw-bold position-relative" to="cart">
                <RiShoppingCart2Line className="cart " />
                <p className='position-absolute top-25   start-75  translate-middle badge rounded-3 bg-main  '>
                  {cartCount?`${cartCount}`:"0"}
                </p>
                </Link>
              
                <Link className="nav-link px-3 fw-bold position-relative" to="whichlist">
                <FaRegHeart className="cart " />
                </Link>

                {userdata ? <>
                  {userdata ? <li className="nav-item dropdown dropdowns">
                <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaRegCircleUser className="cart" />
                </Link>
                <ul className="dropdown-menu dropdown-menus">
                  <li><Link className="dropdown-item py-2 text-white" to="setting"><IoSettingsOutline className="mx-2 text-white cart"/> الاعدادات</Link></li>
                  <li><Link className="dropdown-item text-white" to="orders"><BsBagHeart className="mx-2 text-white cart"/>الطلبات</Link></li>
                  <li><Link className="dropdown-item py-2 text-white" to="#"><span onClick={Logout}><CiLogout className="mx-2 text-white cart"/>تسجيل الخروج</span></Link></li>
                </ul>
              </li>:""}
                </>:""}

            

              </div>
           
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold" aria-current="page" to="/">الرئيسيه</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold" aria-current="page" to="about">معلومات عنا</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold" aria-current="page" to="contact">اتصل بنا</Link>
              </li>

              <li class="nav-item dropdown dropdownn px-3 fw-bold">
          <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            الاقسام
          </Link>
          <ul  class="dropdown-menu text-center">
            {allCatigory?<>
            
            {allCatigory.map((elm)=>{
              return<>
            <li><Link  className="dropdown-item d-flex position-relative align-items-center justify-content-end text-bold" to={`productOfCatigory/${elm._id}`}>

            {elm.name}
            
            </Link></li>
              </>
            })}
            
            </> : ""}
          
          </ul>
        </li>



              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold" aria-current="page" to="product">المنتجات</Link>
              </li>


              {userdata ? <>
              
                

                
    
              
              </>: <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold" aria-current="page" to="signup">انشاء حساب</Link>
              </li>}
            </ul>


            {/* الأيقونات على الشاشات الكبيرة */}
            <ul className="navbar-nav ms-auto d-none d-lg-flex">

            <li  className="nav-item">
              
              <form className='nav-link'>
                <input 
                  className='form-control text-end w-100 border border-2 form-sereash' 
                  type="search" 
                  value={product} 
                  onChange={handleSearch} 
                  placeholder="ابحث هنا..." 
                />
              </form>
            
                </li>

              <li className="nav-item">
                <Link className="nav-link px-3 fw-bold position-relative" to="cart">
                <RiShoppingCart2Line className="cart " />
                <p className='position-absolute top-25  start-75  translate-middle badge rounded-3 bg-main  '>
                  {cartCount?`${cartCount}`:"0"}
                </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 fw-bold position-relative" to="whichlist">
                <FaRegHeart className="cart " />
                </Link>
              </li>
              
              {userdata ? <li className="nav-item dropdown dropdowns">
                <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaRegCircleUser className="cart" />
                </Link>
                <ul className="dropdown-menu dropdown-menus">
                  <li><Link className="dropdown-item py-2 text-white" to="setting"><IoSettingsOutline className="mx-2 text-white cart"/> الاعدادات</Link></li>
                  <li><Link className="dropdown-item text-white" to="orders"><BsBagHeart className="mx-2 text-white cart"/>الطلبات</Link></li>
                  <li><Link className="dropdown-item py-2 text-white" to="#"><span onClick={Logout}><CiLogout className="mx-2 text-white cart"/>تسجيل الخروج</span></Link></li>
                </ul>
              </li>:""}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
