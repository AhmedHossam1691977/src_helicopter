import React, { useEffect, useState } from 'react'
import img from "./../../assits/a1c7dc5b68a42239311e510f54d8cd59.jpeg"
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import { useFormik } from 'formik';
import $ from "jquery"


export default function VerifyResetCode() {
  useEffect(()=>{
    $(".loading").fadeOut(1000)
    },[])
    


  let [loading,setloading]=useState(false)

  let [errorMessage,setErrorMessage]=useState("")

  const basurl = "https://project-model.onrender.com"
  let nav = useNavigate()



  let validationSchema = Yup.object({
    code:Yup.number().required("Code is required").test('len', 'Code must be exactly 6 digits', (val) => val && val.toString().length === 6),
  });

  let registeform = useFormik({
    initialValues: {

        code: "",

    },
    onSubmit,
    validationSchema,
  });



  async function onSubmit(valus){
    $(".loading").fadeIn(1000)
    setloading(true)
    let {data}=await axios.post(`${basurl}/api/v1/auth/verifyResetCode`,valus).catch((error)=>{
        console.log(error.response.data);
        
        setErrorMessage(error.response.data.error)
        
    setloading(false)
    })
    $(".loading").fadeOut(1000)

    if(data.message == 'success'){
      $(".loading").fadeIn(1000)
      setloading(false)
      nav('/resetPassword')
      $(".loading").fadeOut(1000)
    }
  }

  return <>
  
  <div className="loading position-fixed top-0 bottom-0 end-0 start-0 opacity-50  bg-white  ">
  
  <div id="wifi-loader">
      <svg class="circle-outer" viewBox="0 0 86 86">
          <circle class="back" cx="43" cy="43" r="40"></circle>
          <circle class="front" cx="43" cy="43" r="40"></circle>
          <circle class="new" cx="43" cy="43" r="40"></circle>
      </svg>
      <svg class="circle-middle" viewBox="0 0 60 60">
          <circle class="back" cx="30" cy="30" r="27"></circle>
          <circle class="front" cx="30" cy="30" r="27"></circle>
      </svg>
      <svg class="circle-inner" viewBox="0 0 34 34">
          <circle class="back" cx="17" cy="17" r="14"></circle>
          <circle class="front" cx="17" cy="17" r="14"></circle>
      </svg>
      <div class="text" data-text="loading..."></div>
  </div>
      </div>


  <div className="container-fluid py-5">
  <div className="row">
    <div className="col-md-7">
      <img className='w-100' src={img} alt="" />
    </div>
    <div className="col-md-5 py-5 px-5 d-flex align-items-center justify-content-center">
      <div className='w-100'>
        <h2 className='text-end ll-text'>التحقق من <span className='text-danger'> الرمز </span></h2>
        <p className='text-end fs-4 fw-bold'>تحقق من البريد الخاص بك</p>
        {errorMessage == "" ? "":<div className="alert alert-danger">{errorMessage}</div>}
        <form className='py-3' onSubmit={registeform.handleSubmit} >
          
        <div className="my-3">
                  <input className="form-control form border-bottom border-1 border-dark custom-input text-end" type="text" name="code" id="code" placeholder="ادخل الكود" onChange={registeform.handleChange} onBlur={registeform.handleBlur} />
                  {registeform.touched.code ?<p className="text-danger">{registeform.errors.code}</p> :""}
        </div>
        



       <div className='d-flex align-items-center justify-content-center'>
       {loading ?<button type='button' className='btn btn-danger w-100 me-auto  d-block'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button disabled={!(registeform.isValid && registeform.dirty)} type="submit"className="btn btn-danger me-auto  d-block w-100 my-3">تاكيد الكود</button>}  
       </div>
        </form>
      </div>
    </div>
  </div>
</div>
  </>
}
