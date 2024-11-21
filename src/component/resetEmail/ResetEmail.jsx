import React, { useEffect, useState } from "react";
import img from "../../assits/a1c7dc5b68a42239311e510f54d8cd59.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { Helmet } from "react-helmet";

export default function ResetEmail({ savedata }) {
  useEffect(() => {
    $(".loading").fadeOut(1000);
  }, []);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const basurl = "https://portfolio-api-p4u7.onrender.com";
  const nav = useNavigate();

  // Validation schema for the form
  const validationSchema = Yup.object({
    code: Yup.number()
      .required("Code is required")
      .test("len", "Code must be exactly 6 digits", (val) => val && val.toString().length === 6),
  });

  // Formik setup for form handling
  const registeform = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit,
    validationSchema,
  });

  // Function to handle form submission
  async function onSubmit(valus) {
    $(".loading").fadeIn(1000);
    setLoading(true);
    try {
      const { data } = await axios.post(`${basurl}/api/v1/auth/resetEmail`, valus);
      if (data.message === "success") {
        savedata(data.user);
        localStorage.setItem("userToken", data.token);
        nav("/home");
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
    <Helmet>
        <title>تاكيد الاميل | هليكوبتر</title>
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
        <div className="row align-items-center">
          <div className="col-md-7">
            <img className="w-100" src={img} alt="imageLogin" />
          </div>
          <div className="col-md-5 py-5 px-5">
            <div className="px-5">
              <h2 className="text-end my-2">
                إعادة تعيين <span className="text-danger">الرمز</span>
              </h2>

              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={registeform.handleSubmit}>
                <div className="my-3">
                  <input
                    className="form-control form border-bottom border-1 border-dark custom-input text-end"
                    type="text"
                    name="code"
                    id="code"
                    placeholder="ادخل الكود"
                    onChange={registeform.handleChange}
                    onBlur={registeform.handleBlur}
                  />
                  {registeform.touched.code && <p className="text-danger">{registeform.errors.code}</p>}
                </div>

                {loading ? (
                  <button type="button" className="btn btn-danger m-auto d-block w-100 my-3">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    disabled={!(registeform.isValid && registeform.dirty)}
                    type="submit"
                    className="btn btn-danger m-auto d-block w-100 my-3 fw-bold"
                  >
                    تاكيد الكود
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
