import React, { useEffect, useState } from "react";
import img from "../../assits/a1c7dc5b68a42239311e510f54d8cd59.jpeg";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { Helmet } from "react-helmet"; // Import Helmet

export default function SignUp() {

  useEffect(() => {
    $(".loading").fadeOut(1000);
  }, []);

  let [loading, setloading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  const basurl = "https://portfolio-api-p4u7.onrender.com";
  let nav = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Min length is 3")
      .max(20, "Max length is 20"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required")
      .min(3, "Min length is 3"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[a-zA-Z0-9]{6,}$/,
        "Password must contain at least 6 characters, including letters and numbers."
      ),
    rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  let registeform = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit,
    validationSchema,
  });

  async function onSubmit(values) {
    $(".loading").fadeIn(1000);
    setloading(true);
    let { data } = await axios
      .post(`${basurl}/api/v1/auth/signup`, values)
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setloading(false);
      });
    $(".loading").fadeOut(1000);

    if (data.message === "success") {
      $(".loading").fadeIn(1000);
      nav("/ResetEmail");
      $(".loading").fadeOut(1000);
    }
  }

  return (
    <>
      <Helmet>
        <title>إنشاء حساب | هليكوبتر</title> {/* Add page title */}
        <meta name="description" content="قم بإنشاء حساب جديد في متجرنا واحصل على أفضل العروض والمنتجات." /> {/* Add meta description */}
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
        <div className="row align-items-center">
          <div className="col-12 col-md-7 mb-4 mb-md-0">
            <img className="w-100 img-fluid" src={img} alt="SignUpImage" />
          </div>
          <div className="col-12 col-md-5 py-5 px-3">
            <div className="px-3">
              <h2 className="text-center text-md-end">
                انشاء <span className="text-danger">حساب</span>
              </h2>
              <h3 className="fs-6 text-center text-md-end">
                ادخل البيانات المطلوبه
              </h3>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <form onSubmit={registeform.handleSubmit}>
                <div className="my-3">
                  <input
                    className="form-control border-bottom border-1 border-dark form custom-input text-end"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="الاسم"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.name && (
                    <p className="text-danger">{registeform.errors.name}</p>
                  )}
                </div>

                <div className="my-3">
                  <input
                    className="form-control border-bottom border-1 border-dark form custom-input text-end"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="الاميل"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.email && (
                    <p className="text-danger">{registeform.errors.email}</p>
                  )}
                </div>

                <div className="my-3">
                  <input
                    className="form-control border-bottom border-1 border-dark form custom-input text-end"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="كلمه السر"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.password && (
                    <p className="text-danger">{registeform.errors.password}</p>
                  )}
                </div>

                <div className="my-3">
                  <input
                    className="form-control border-bottom border-1 border-dark form custom-input text-end"
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    placeholder="تاكيد كلمه السر"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.rePassword && (
                    <p className="text-danger">
                      {registeform.errors.rePassword}
                    </p>
                  )}
                </div>

                {loading ? (
                  <button
                    type="button"
                    className="btn btn-danger w-100 my-3 d-block"
                  >
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    disabled={!(registeform.isValid && registeform.dirty)}
                    type="submit"
                    className="btn btn-danger w-100 my-3 d-block"
                  >
                    انشاء حساب
                  </button>
                )}
              </form>

              <p className="text-center my-3 fw-bold">
                <Link to="/login">
                  <button className="btn px-2 py-2 text-danger fw-bold">
                    تسجيل الدخول
                  </button>
                </Link>
                لدي حساب ب الفعل ؟
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
