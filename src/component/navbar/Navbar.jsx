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
import { whichlistContext } from '../../context/whichListcontext/WhichListcontext.js';
import $ from "jquery";

export default function Navbar({ Logout, userdata }) {
  const { allCatigory } = useContext(catigoryContext);
  const { setProduct, product } = useContext(productContext);
  const { cartCount } = useContext(CartContext);
  const { getAllWhichlistData, setWhichlistProduct } = useContext(whichlistContext);

  // Handle search input change
  const handleSearch = (event) => {
    const term = event.target.value;
    setProduct(term);
  };

  // Fetch wishlist data when userdata changes
  useEffect(() => {
    if (userdata) {
      getAllWhichlistData();
    }
  }, [userdata]);

  // Update cart count when it changes
  useEffect(() => {}, [cartCount]);

  // Handle logout
  function logOut() {
    $(".loading").fadeIn(1000);
    Logout(setWhichlistProduct);
    $(".loading").fadeOut(1000);
  }

  return (
    <>
      <div className="loading position-fixed top-0 bottom-0 end-0 start-0 opacity-50 bg-white">
        <div id="wifi-loader">
          <svg className="circle-outer" viewBox="0 0 86 86">
            <circle className="back" cx="43" cy="43" r="40"></circle>
            <circle className="front" cx="43" cy="43" r="40"></circle>
            <circle className="new" cx="43" cy="43" r="40"></circle>
          </svg>
          <svg className="circle-middle" viewBox="0 0 60 60">
            <circle className="back" cx="30" cy="30" r="27"></circle>
            <circle className="front" cx="30" cy="30" r="27"></circle>
          </svg>
          <svg className="circle-inner" viewBox="0 0 34 34">
            <circle className="back" cx="17" cy="17" r="14"></circle>
            <circle className="front" cx="17" cy="17" r="14"></circle>
          </svg>
          <div className="text" data-text="loading..."></div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg py-2">
        <div className="container">
          <Link className="navbar-brand fw-bolder fs-3" to="/">
            <span className="fs-2 fw-bolder text-danger">H</span>elicopter
          </Link>
          <div className="d-flex align-items-center justify-align-content-around">
            <div className="d-flex align-items-center d-lg-none me-2 my-2 justify-content-between">
            <div>
             
            {localStorage.getItem("userToken") ?"" : <li className='nav-item mx-3 '>
             <Link className="nav-link" to="/signup"><p className='text-center fw-bold text-danger'>تسجيل الدخول</p></Link>
             </li>}
         
         </div>
              
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-align-content-around">
            <div className="d-flex align-items-center d-lg-none me-2 my-2 justify-content-between">
              <li className="nav-item form-mob mx-4">
                <form className="nav-link">
                  <input
                    className="form-control text-end w-100 form-sereash"
                    type="search"
                    value={product}
                    onChange={handleSearch}
                    placeholder="ابحث هنا..."
                  />
                </form>
              </li>

              <Link className="nav-link px-3 fw-bold position-relative icons" to="cart">
                <RiShoppingCart2Line className="cart" />
                <p className="position-absolute top-25 start-75 translate-middle badge rounded-3 bg-main">
                  {cartCount ? `${cartCount}` : "0"}
                </p>
              </Link>

              <Link className="nav-link px-3 fw-bold position-relative" to="whichlist">
                <FaRegHeart className="cart" />
              </Link>

              {userdata && (
                <li className="nav-item dropdown dropdowns">
                  <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaRegCircleUser className="cart" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menus">
                    <li>
                      <Link className="dropdown-item py-2 text-white" to="setting">
                        <IoSettingsOutline className="mx-2 text-white cart" /> الاعدادات
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="orders">
                        <BsBagHeart className="mx-2 text-white cart" />الطلبات
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2 text-white" to="#">
                        <span onClick={logOut}>
                          <CiLogout className="mx-2 text-white cart" />تسجيل الخروج
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="/">
                  الرئيسيه
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="about">
                  معلومات عنا
                </Link>
              </li>
              <li className="nav-item dropdown dropdownn px-3 fw-bold text-end">
                <Link className="nav-link dropdown-toggle text-end" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  الاقسام
                </Link>
                <ul className="dropdown-menu text-center">
                  {allCatigory &&
                    allCatigory.map((elm) => (
                      <li key={elm._id}>
                        <Link className="dropdown-item d-flex position-relative align-items-center justify-content-end text-bold" to={`productOfCatigory/${elm._id}`}>
                          {elm.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="product">
                  المنتجات
                </Link>
              </li>
              {!userdata && (
                <li className="nav-item">
                  <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="signup">
                    انشاء حساب
                  </Link>
                </li>
              )}
            </ul>

            {/* الأيقونات على الشاشات الكبيرة */}
            <ul className="navbar-nav ms-auto d-none d-lg-flex">
              <li className="nav-item">
                <form className="nav-link">
                  <input
                    className="form-control text-end w-100 border border-2 form-sereash"
                    type="search"
                    value={product}
                    onChange={handleSearch}
                    placeholder="ابحث هنا..."
                  />
                </form>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 fw-bold position-relative" to="cart">
                  <RiShoppingCart2Line className="cart" />
                  <p className="position-absolute top-25 start-75 translate-middle badge rounded-3 bg-main">
                    {cartCount ? `${cartCount}` : "0"}
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 fw-bold position-relative" to="whichlist">
                  <FaRegHeart className="cart" />
                </Link>
              </li>
              {userdata && (
                <li className="nav-item dropdown dropdowns">
                  <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaRegCircleUser className="cart" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menus">
                    <li>
                      <Link className="dropdown-item py-2 text-white" to="setting">
                        <IoSettingsOutline className="mx-2 text-white cart" /> الاعدادات
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="orders">
                        <BsBagHeart className="mx-2 text-white cart" />الطلبات
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2 text-white" to="#">
                        <span onClick={logOut}>
                          <CiLogout className="mx-2 text-white cart" />تسجيل الخروج
                        </span>
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
