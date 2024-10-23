import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from "formik";
import { CartContext } from '../../context/cartConteext/cartContext.js';
import $ from "jquery";
import {jwtDecode} from 'jwt-decode';

export default function Payment() {
  const [userDetels, setUserDetels] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    let data = jwtDecode(token);
    if (data != null) {
      setUserDetels(data.userAddress);
      ShippingForm.setValues({
        street: data.userAddress.street || "",
        city: data.userAddress.city || "",
        phone: data.userAddress.phone || ""
      });
    }
    $(".loading").fadeOut(1000);
  }, []);

  const baseUrl = "https://project-model.onrender.com";
  const { setCartCount } = useContext(CartContext);
  const { id } = useParams();
  const nav = useNavigate();

  let validationSchema = Yup.object({
    street: Yup.string().required("street required").min(3, "min length 7"),
    city: Yup.string().required("city required").min(3, "min length 7"),
    phone: Yup.string().required("phone required").min(3, "min length 3").max(20, "max length 20").matches(/^01[1520][0-9]{8}$/, "enter valid phone"),
  });

  let ShippingForm = useFormik({
    initialValues: {
      street: "",
      phone: "",
      city: ""
    },
    validationSchema,
    onSubmit: function (val) {
      payChipping(val);
    }
  });

  async function payChipping(val) {
    $(".loading").fadeIn(1000);

    let body = {
      shippingAddress: val
    };
    const { data } = await axios.post(`${baseUrl}/api/v1/order/${id}`, body, {
      headers: {
        'token': localStorage.getItem("userToken")
      }
    });

    if (data.message == "success") {
      $(".loading").fadeOut(1000);
      nav("/");
      setCartCount(0);
    }
  }

  const handleAddClick = (address) => {
    ShippingForm.setValues({
      street: address.stret,
      city: address.city,
      phone: address.phone
    });
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

      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex align-items-end justify-content-end py-2">
            {userDetels?.map((elm, index) => (
              <div key={index} className="text-center  userDetels w-100  py-2 ">
                <p className="fw-bolder fs-3 fw-bold m-2"> الشارع : <span className='text-danger'>{elm.stret}</span></p>
                <p className="fw-bolder fs-3 m-2">  المدينه : <span className='text-danger'>{elm.city}</span></p>
                <p className="fw-bolder fs-3 m-2">  رقم الهاتف : <span className='text-danger'>{elm.phone}</span></p>
                <button className='btn btn-danger m-2 ' onClick={() => handleAddClick(elm)}>اضافه العنوان </button>
              </div>
            ))}
          </div>
          <div className="col-md-12">
            <form onSubmit={ShippingForm.handleSubmit} action="">
              <div className="py-2 w-100">
                <label htmlFor="street" className='fw-bolder fs-3 text-end w-100 py-2'> : الشارع</label>
                <input
                  onChange={ShippingForm.handleChange}
                  value={ShippingForm.values.street}
                  className="form-control text-end"
                  type="text"
                  name="street"
                  id="street"
                />
                <p className="text-danger">{ShippingForm.errors.street}</p>
              </div>

              <div className="py-2 w-100">
                <label htmlFor="city" className='fw-bolder fs-3 text-end w-100 py-2'> : المدينه  </label>
                <input
                  onChange={ShippingForm.handleChange}
                  value={ShippingForm.values.city}
                  className="form-control text-end"
                  type="text"
                  name="city"
                  id="city"
                />
                <p className="text-danger">{ShippingForm.errors.city}</p>
              </div>

              <div className="py-2 w-100">
                <label htmlFor="phone" className='fw-bolder fs-3 text-end w-100 py-2'> : رقم الهاتف</label>
                <input
                  onChange={ShippingForm.handleChange}
                  value={ShippingForm.values.phone}
                  className="form-control text-end"
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
  );
}