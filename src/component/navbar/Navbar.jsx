import React, { useContext, useEffect, useRef } from 'react';
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
import logo from '../../assits/hhhhhhh.png';
export default function Navbar({ Logout, userdata }) {
  let { allCatigory } = useContext(catigoryContext);
  let { setProduct, product } = useContext(productContext);
  let { cartCount } = useContext(CartContext);
  let { getAllWhichlistData, setWhichlistProduct, WhichlistProduct } = useContext(whichlistContext);

  const navbarRef = useRef(null);

  const handleSearch = (event) => {
    const term = event.target.value;
    setProduct(term);
  };

  useEffect(() => {
    if (userdata) {
      getAllWhichlistData();
    }
  }, [userdata]);

  useEffect(() => {}, [cartCount]);

  function logOut() {
    $(".loading").fadeIn(1000);
    setWhichlistProduct(null);
    Logout();
    $(".loading").fadeOut(1000);
  }

  const handleNavLinkClick = () => {
    if (navbarRef.current) {
      const navbarToggler = navbarRef.current.querySelector('.navbar-toggler');
      if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    }
  };



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

      <nav className="navbar navbar-expand-lg py-2" ref={navbarRef}>
        <div className="container">
          <Link className="navbar-brand fw-bolder fs-3 " to="/" onClick={handleNavLinkClick}>
            <img src={logo} className='logo' alt="logo" />
          </Link>
          <div className="d-flex align-items-center justify-align-content-around">
            <div className="d-flex align-items-center d-lg-none me-2 my-2 justify-content-between">

            <li className="nav-item">
                  <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="signup" onClick={handleNavLinkClick}>انشاء حساب</Link>
                </li>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-align-content-around">
            <div className="d-flex align-items-center d-lg-none me-2 my-2 justify-content-between">
              <li className="nav-item form-mob mx-4">
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

              <Link className="nav-link px-3 fw-bold position-relative icons" to="cart" onClick={handleNavLinkClick}>
                <RiShoppingCart2Line className="cart" />
                <p className='position-absolute top-25 start-75 translate-middle badge rounded-3 bg-main '>
                  {cartCount ? `${cartCount}` : "0"}
                </p>
              </Link>

              <Link className="nav-link px-3 fw-bold position-relative" to="whichlist" onClick={handleNavLinkClick}>
                <FaRegHeart className="cart" />
              </Link>

              {userdata ? (
                <>
                  <li className="nav-item dropdown dropdowns">
                    <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <FaRegCircleUser className="cart" />
                    </Link>
                    <ul className="dropdown-menu dropdown-menus">
                      <li><Link className="dropdown-item py-2 text-white" to="setting" onClick={handleNavLinkClick}><IoSettingsOutline className="mx-2 text-white cart" /> الاعدادات</Link></li>
                      <li><Link className="dropdown-item text-white" to="orders" onClick={handleNavLinkClick}><BsBagHeart className="mx-2 text-white cart" />الطلبات</Link></li>
                      <li><Link className="dropdown-item py-2 text-white" to="#" onClick={() => { logOut(); handleNavLinkClick(); }}><CiLogout className="mx-2 text-white cart" />تسجيل الخروج</Link></li>
                    </ul>
                  </li>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="/" onClick={handleNavLinkClick}>الرئيسيه</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="about" onClick={handleNavLinkClick}>معلومات عنا</Link>
              </li>
              <li className="nav-item dropdown dropdownn px-3 fw-bold text-end">
                <Link className="nav-link dropdown-toggle text-end" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  الاقسام
                </Link>
                <ul className="dropdown-menu text-center">
                  {allCatigory ? (
                    <>
                      {allCatigory.map((elm) => {
                        return (
                          <li key={elm._id}><Link className="dropdown-item d-flex position-relative align-items-center justify-content-end text-bold" to={`productOfCatigory/${elm._id}`} onClick={handleNavLinkClick}>
                            {elm.name}
                          </Link></li>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="product" onClick={handleNavLinkClick}>المنتجات</Link>
              </li>

              {userdata ? (
                <>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link active px-3 fw-bold text-end" aria-current="page" to="signup" onClick={handleNavLinkClick}>انشاء حساب</Link>
                </li>
              )}
            </ul>


            <ul className="navbar-nav ms-auto d-none d-lg-flex">
              <li className="nav-item">
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
                <Link className="nav-link px-3 fw-bold position-relative" to="cart" onClick={handleNavLinkClick}>
                  <RiShoppingCart2Line className="cart" />
                  <p className='position-absolute top-25 start-75 translate-middle badge rounded-3 bg-main'>
                    {cartCount ? `${cartCount}` : "0"}
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3 fw-bold position-relative" to="whichlist" onClick={handleNavLinkClick}>
                  <FaRegHeart className="cart" />
                </Link>
              </li>

              {userdata ? (
                <li className="nav-item dropdown dropdowns">
                  <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaRegCircleUser className="cart" />
                  </Link>
                  <ul className="dropdown-menu dropdown-menus">
                    <li><Link className="dropdown-item py-2 text-white" to="setting" onClick={handleNavLinkClick}><IoSettingsOutline className="mx-2 text-white cart" /> الاعدادات</Link></li>
                    <li><Link className="dropdown-item text-white" to="orders" onClick={handleNavLinkClick}><BsBagHeart className="mx-2 text-white cart" />الطلبات</Link></li>
                    <li><Link className="dropdown-item py-2 text-white" to="#" onClick={() => { logOut(); handleNavLinkClick(); }}><CiLogout className="mx-2 text-white cart" />تسجيل الخروج</Link></li>
                  </ul>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}