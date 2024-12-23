import React, { useEffect, useState } from 'react';
import img from "./../../assits/a1c7dc5b68a42239311e510f54d8cd59.jpeg";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import { useFormik } from 'formik';
import $ from "jquery";
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  useEffect(() => {
    $(".loading").fadeOut(1000);
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const basurl = "https://final-pro-api-j1v7.onrender.com";
  const nav = useNavigate();

  // Validation schema for the form
  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email is required").min(3, "Minimum length is 3"),
  });

  // Formik setup for form handling
  const registeform = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit,
    validationSchema,
  });

  // Function to handle form submission
  async function onSubmit(values) {
    $(".loading").fadeIn(1000);
    setLoading(true);
    try {
      const { data } = await axios.post(`${basurl}/api/v1/auth/forgetPassword`, values);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        nav('/verifyResetCode');
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
        <title>نسيت كلمه السر
        | هليكوبتر</title>
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

      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-7 login">
            <img className="w-100" src={img} alt="Forget Password" />
          </div>
          <div className="col-md-5 py-5 px-5 d-flex align-items-center justify-content-center">
            <div className="w-100">
              <h2 className="text-end">نسيت <span className="text-danger">كلمه السر</span></h2>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form className="py-3" onSubmit={registeform.handleSubmit}>
                <div className="my-3">
                  <input
                    className="form-control form border-bottom border-1 border-dark custom-input text-end"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="ادخل الاميل الخاص بك"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.email && <p className="text-danger">{registeform.errors.email}</p>}
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  {loading ? (
                    <button type="button" className="btn btn-danger w-100 me-auto d-block">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      disabled={!(registeform.isValid && registeform.dirty)}
                      type="submit"
                      className="btn btn-danger me-auto d-block w-100 my-3"
                    >
                      ارسل الكود
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
