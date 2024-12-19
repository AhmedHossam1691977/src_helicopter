import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartConteext/cartContext.js";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { FaCcAmazonPay } from "react-icons/fa";
import "./cart.css";
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";





export default function Cart() {

  const [delevary, setDelevary] = useState(null);
  const [delevaryData, setDelevaryData] = useState(null);

  const [cartData, setCartData] = useState(null);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false); // حالة جديدة لعرض القائمة
  const {
    cartCount,
    getAllCartData,
    deletCartData,
    updateProductQuantany,
    deletAllCartData,
    setCartCount
  } = useContext(CartContext);
  let nav = useNavigate();

  useEffect(() => {
    $(".loading").fadeIn(1000);
    getData();
    $(".loading").fadeOut(1000);
  }, []);

  async function getData() {
    const { data } = await getAllCartData();
    setCartData(data.cart);
    console.log(data.cart.cartorder);
  }

  async function updateCount(id, quantity) {
    let { data } = await updateProductQuantany(id, quantity);
    setCartData(data.cart);
  }

  async function deletProduct(id) {
    $(".loading").fadeIn(1000);
    let { data } = await deletCartData(id);
    if (data.message === "success") {
      $(".loading").fadeOut(1000);
      setCartData(data.cart);
      setCartCount(data.cartItems);
    }
  }

  async function deletAllProduct() {
    $(".loading").fadeIn(1000);
    let { data } = await deletAllCartData();
    setCartData(data.cart);
    setCartCount(data.cartItems);
    if (data.message === "success") {
      $(".loading").fadeOut(1000);
      nav("/");
    }
  }

  function handlePayment() {
    if (cartData && cartData._id) {
      nav(`/cart/${cartData._id}`);
    }
  }

  const handleImageClick = (id) => {
    nav(`/productDetelse/${id}`);
  };

  const toggleDeliveryDetails = () => {
    setShowDeliveryDetails(!showDeliveryDetails); // تغيير حالة عرض القائمة
  };

  // حساب السعر الكلي
  const totalPrice = cartData ? cartData.totalPrice : 0;
  const servicePrice = cartData ? cartData.cartorder : 0;
  const totalAmount = totalPrice + servicePrice + delevary; 

// order




  useEffect(() => {
    allPlace();
    
    
 
  }, []);

  const baseUrl = "https://portfolio-api-p4u7.onrender.com";
  const { id } = useParams();
  let validationSchema = Yup.object({
    street: Yup.string().required("street required").min(3),
    city: Yup.string().required("city required").min(10, "min length 10"),
    phone: Yup.string().required("phone required").min(3, "min length 3").max(20, "max length 20").matches(/^01[1520][0-9]{8}$/, "enter valid phone"),
  });

  let ShippingForm = useFormik({
    initialValues: {
      street: "",
      phone: "",
      city: "",
      delevary: "" 
    },
    validationSchema,
    onSubmit: function (val) {
      payChipping(val);
    }
  });

  async function payChipping(val) {

    let body = {
      shippingAddress: {
        street: val.street,
        city: val.city,
        phone: val.phone,
      },
      delevary: val.delevary
    };
    const { data } = await axios.post(`${baseUrl}/api/v1/order/${id}`, body, {
      headers: {
        'token': localStorage.getItem("userToken")
      }
    });

    if (data.message == "success") {
     
      nav("/");
      setCartCount(0);
    }
  }


  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const cityData = delevaryData.find(item => item.place === selectedCity); 
    if (cityData) {
      setDelevary(cityData.price);  
      ShippingForm.setFieldValue("delevary", cityData.price);  
    }
  };


  async function allPlace() {
    const {data} = await axios.get(`${baseUrl}/api/v1/delevary`);
    setDelevaryData(data.place);
  }

  useEffect(() => {
  }
  , [delevary
    ]);
    
  return (
    <>
    <Helmet>
        <title>السله | هليكوبتر</title>
        <meta name="description" content="تصفح منتجاتنا المتنوعة في متجرنا." />
      </Helmet>
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

      <div className="container" id="cart">
        <div className="row">
          <div className="col-md-12 cart my-2 w-100 d-flex align-items-center justify-content-between">
            <div className="cart" style={{ direction: "rtl" }}>
              <p className="fs-5 fw-bolder cart">
                المنتجات : <span className="text-danger">{cartCount}</span>
              </p>
            </div>
            <div className="cart">
              <button
                onClick={() => deletAllProduct()}
                className="btn  btn-danger m-auto py-2 px-3 border-success border border-1"
              >
                <i className="fa-regular fa-trash-can px-1 text-white"></i> حذف الكل
              </button>
            </div>
          </div>
          <div className="col-md-12 ">
            <div className="w-100 d-flex align-items-center justify-content-between border border-2 px-2 py-2">
              <p> المنتج</p>
              <p>السعر</p>
              <p>الكمية</p>
            </div>
          </div>
          {cartData ? (
            <>
              {cartData?.cartItems.map((elm) => {
                if (elm.quantity === 0) {
                  deletProduct(elm._id);
                }
                return (
                  <div className="col-md-12 my-2" key={elm._id}>
                    <div className="d-flex align-items-center justify-content-between border border-2 px-2 py-2">
                      <div
                        onClick={() => handleImageClick(elm.product._id)}
                        className="w-100 position-relative d-flex align-items-center pointer"
                      >
                        <img
                          src={elm.product?.imgCover || "default-image-path.jpg"}
                          className="cart-image"
                          alt=""
                        />
                        <p className="fw-bolder px-3 text-danger">
                          {elm.product?.title.split(" ").slice(0, 2).join(" ") || "No title available"}
                        </p>
                      </div>
                      <div className="w-100 position-relative d-flex align-items-center justify-content-center">
                        <p className="fw-bolder px-3">
                          <span className="text-danger">{elm.price}</span> جنيه
                        </p>
                      </div>
                      <div className="w-100 position-relative d-flex align-items-center justify-content-end">
                        <div className="col-md-5 d-flex justify-content-center align-items-center">
                          <span
                            onClick={() => updateCount(elm._id, elm.quantity + 1)}
                            className="btn btn-white border border-success btn-sm"
                          >
                            +
                          </span>
                          <span className="px-2 fs-4">{elm.quantity}</span>
                          <span
                            onClick={() => updateCount(elm._id, elm.quantity - 1)}
                            className="btn btn-white border border-danger btn-sm"
                          >
                            -
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-100 d-flex justify-content-end ">
                      <button
                        onClick={() => deletProduct(elm._id || "No title available")}
                        className="btn text-white bg-danger border border-3 p-1 "
                      >
                        <i className="fa-regular fa-trash-can px-1 text-white px-2"></i>حذف
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}
          {cartData ? (
            <>
              {cartData && (
                <div className="col-12 d-flex align-items-center justify-content-end">
                  <div className="total-price w-100">
                    <p className="d-flex justify-content-end m-3 fs-3 fw-bolder">
                      الحساب
                    </p>
                    <p className="d-flex justify-content-end m-3 fs-5 fw-bolder">
                      جنيه{" "}
                      <span className="text-danger px-2">
                        {totalPrice || "0"}
                      </span>{" "}
                      : سعرالمنتجات{" "}
                    </p>
                   
                    
                    <p className="d-flex justify-content-end m-3 fs-5 fw-bolder">
                      جنيه{" "}
                      <span className="text-danger px-2">
                        {servicePrice || "0"}
                      </span>{" "}
                      :سعر  الخدمة 
                    </p>
                    
                  </div>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-12 d-flex justify-content-center" >
        {showDeliveryDetails && (
                      <div className="modal-container " id="payOrder">
                        <div className="modal-content">
                          <button
                            className="close-btn"
                            onClick={toggleDeliveryDetails}
                          >
                            X
                          </button>
                          <>
     

                          <>
     

     <div className="container " id="payOrder">
       <div className="row">
        <div className="col-md-6 ">
        <div className="total-price w-100">
                    <p className="d-flex justify-content-end mx-3 fs-3 fw-bolder">
                      الحساب
                    </p>
                    <p className="d-flex justify-content-end mx-3 fs-5 fw-bolder">
                      جنيه{" "}
                      <span className="text-danger px-2">
                        {totalPrice || "0"}
                      </span>{" "}
                      : سعرالمنتجات{" "}
                    </p>
                   
                    
                    <p className="d-flex justify-content-end mx-3 fs-5 fw-bolder">
                      جنيه{" "}
                      <span className="text-danger px-2">
                        {servicePrice || "0"}
                      </span>{" "}
                      :سعر  الخدمة 
                    </p>
                    
                    <p className="d-flex justify-content-end mx-3 fs-5 fw-bolder">
                      جنيه{" "}
                      <span className="text-danger px-2">
                        {delevary || "0"}
                      </span>{" "}
                      :سعر  التوصيل 
                    </p>

                    <p className="d-flex justify-content-end mx-3 fs-5 fw-bolder">
                      جنيه{" "}
                      <span className="text-danger px-2">
                        {totalAmount || "0"}
                      </span>{" "}
                      :سعر  الكلي 
                    </p>
                  </div>
        </div>
         <div className="col-md-6">
           <form onSubmit={ShippingForm.handleSubmit} action="">
             <div className=" w-100">
               <label htmlFor="address" className="fw-bolder addres-text fs-3 text-end w-100 py-2">: العنوان</label>
               <select
                 onChange={(e) => { 
                   ShippingForm.handleChange(e);
                   handleCityChange(e); 
                 }}
                 value={ShippingForm.values.street}
                 className="form-control inpot-address text-end "
                 name="street"
                 id="street"
               >
                 {delevaryData?.map((address, index) => (
                   <option className="select" key={index} value={address.place}>  
                     {address.place}
                   </option>
                 ))}
               </select>
               <p className="text-danger">{ShippingForm.errors.street}</p>
             </div>
             <div className=" w-100">
               <label htmlFor="city" className='fw-bolder addres-text fs-3 text-end w-100 py-2'> : العنوان ب التفاصيل  </label>
               <input
                 onChange={ShippingForm.handleChange}
                 value={ShippingForm.values.city}
                 className="form-control inpot-address text-end"
                 type="text"
                 name="city"
                 id="city"
               />
               <p className="text-danger">{ShippingForm.errors.city}</p>
             </div>

             <div className=" w-100">
               <label htmlFor="phone" className='fw-bolder addres-text fs-3 text-end w-100 py-2'> : رقم الهاتف</label>
               <input
                 onChange={ShippingForm.handleChange}
                 value={ShippingForm.values.phone}
                 className="form-control inpot-address text-end"
                 type="tel"
                 name="phone"
                 id="phone"
               />
               <p className="text-danger">{ShippingForm.errors.phone}</p>
             </div>

             <button type="submit" className="btn btn-danger w-100 d-block my-3">
               <i className="fa-brands fa-cc-amazon-pay px-2"></i> pay
             </button>
           </form>
         </div>
       </div>
     </div>
   </>
    </>
                        </div>
                      </div>
                    )}
        <button  onClick={() => {
    handlePayment();
    toggleDeliveryDetails();
  }}  className="btn btn-danger w-50 my-5">
                        <FaCcAmazonPay className="fw-bolder fs-3" />
                      </button>
        </div>
      </div>
    </>
  );
}