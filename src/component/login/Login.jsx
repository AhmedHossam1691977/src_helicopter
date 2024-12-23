import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';  // Import Helmet
import img from "./../../assits/a1c7dc5b68a42239311e510f54d8cd59.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import { useFormik } from 'formik';
import $ from "jquery";
import { whichlistContext } from '../../context/whichListcontext/WhichListcontext.js';

export default function Login({ savedata }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const baseUrl = "https://final-pro-api-j1v7.onrender.com";
  const nav = useNavigate();
  const { getAllWhichlistData, setWhichlistProduct } = useContext(whichlistContext);

  useEffect(() => {
    $(".loading").fadeOut(1000);
  }, []);

  // Validation schema for the form
  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email is required").min(3, "Minimum length is 3"),
    password: Yup.string().required("Password is required").matches(/^[a-zA-Z0-9]{6,}$/, "Password must contain at least 6 characters, including letters and numbers."),
  });

  // Formik setup for form handling
  const registeform = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  // Function to handle form submission
  async function onSubmit(values) {
    $(".loading").fadeIn(1000);
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, values);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        const whlistData = await getAllWhichlistData();
        setWhichlistProduct(whlistData.data.wishlist);
        
        savedata(data.token);
        nav('/');
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
    } finally {
      $(".loading").fadeOut(1000);
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>تسجيل الدخول - هليكوبتر</title>
        <meta name="description" content="Login to your account" />
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

      <div className="container-fluid py-5" id="login">
        <div className="row">
          <div className="col-md-7 login">
            <img className="w-100" src={img} alt="img" />
          </div>
          <div className="col-md-5 py-5 px-5 d-flex align-items-center justify-content-center">
            <div className="w-100">
              <h2 className="text-end">تسجيل <span className="text-danger">الدخول</span></h2>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form className="py-3" onSubmit={registeform.handleSubmit}>
                <div className="my-3">
                  <input
                    className="form-control form border-bottom border-1 border-dark custom-input text-end"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="الايميل"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.email && <p className="text-danger">{registeform.errors.email}</p>}
                </div>

                <div className="my-3">
                  <input
                    className="form-control form border-bottom border-1 border-dark custom-input text-end"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="كلمه السر"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.password && <p className="text-danger">{registeform.errors.password}</p>}
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  {loading ? (
                    <button type="button" className="btn btn-danger w-50 d-block">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      disabled={!(registeform.isValid && registeform.dirty)}
                      type="submit"
                      className="btn btn-danger d-block w-50 my-3"
                    >
                      تسجيل الدخول
                    </button>
                  )}
                  <Link className="btn ms-auto fw-bolder" to="/forgetPassword">نسيت كلمه السر ؟</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
