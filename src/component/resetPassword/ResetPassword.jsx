import React, { useEffect, useState } from 'react';
import img from "./../../assits/a1c7dc5b68a42239311e510f54d8cd59.jpeg";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import { useFormik } from 'formik';
import $ from "jquery";

export default function ResetPassword() {
  useEffect(() => {
    $(".loading").fadeOut(1000);
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const basurl = "https://portfolio-api-p4u7.onrender.com";
  const nav = useNavigate();

  // Validation schema for the form
  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email is required").min(3, "Minimum length is 3"),
    newPassword: Yup.string().required("Password is required").matches(/^[a-zA-Z0-9]{6,}$/, "Password must contain at least 6 characters, including letters and numbers."),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  // Formik setup for form handling
  const registeform = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema,
  });

  // Function to handle form submission
  async function onSubmit(values) {
    $(".loading").fadeIn(1000);
    setLoading(true);
    try {
      const { data } = await axios.patch(`${basurl}/api/v1/auth/resetPassword`, values);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        nav('/');
        window.location.reload();
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
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-7 login">
            <img className="w-100" src={img} alt="Reset Password" />
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
                    name="newPassword"
                    id="newPassword"
                    placeholder="كلمه السر"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.newPassword && <p className="text-danger">{registeform.errors.newPassword}</p>}
                </div>

                <div className="my-3">
                  <input
                    className="form-control form border-bottom border-1 border-dark custom-input text-end"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="تاكيد كلمه السر"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.confirmPassword && <p className="text-danger">{registeform.errors.confirmPassword}</p>}
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  {loading ? (
                    <button type="button" className="btn btn-danger w-100 d-block">
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      disabled={!(registeform.isValid && registeform.dirty)}
                      type="submit"
                      className="btn btn-danger d-block w-100 my-3"
                    >
                      تاكيد
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
