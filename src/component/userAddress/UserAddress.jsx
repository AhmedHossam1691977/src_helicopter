import React, { useEffect, useState } from 'react'
import img from "./../../assits/a1c7dc5b68a42239311e510f54d8cd59.jpeg"
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import { useFormik } from 'formik';
import $ from "jquery"


export default function UserAddress() {

  useEffect(()=>{
    $(".loading").fadeOut(1000)
    },[])
    

  let [loading,setloading]=useState(false)

  let [errorMessage,setErrorMessage]=useState("")

  const basurl = "https://project-model.onrender.com"
  let nav = useNavigate()

  


  let validationSchema = Yup.object({

  
    stret: Yup.string().required("stret is required").min(3, "Minimum length is 3 characters"),
        
        city: Yup.string().required("City is required"),
      
        phone: Yup.string().required("Phone number is required").matches(/^(010|012|011|015)\d{8}$/, "Enter a valid Egyptian phone number", "Enter a valid phone number")
    
      
    
  });

  let registeform = useFormik({
    initialValues: {

        stret: "",
        city: "",
        phone:"",

    },
    onSubmit,
    validationSchema,
  });




  async function onSubmit(valus){
    $(".loading").fadeIn(1000)
    setloading(true)
    
    let {data}=await axios.patch(`${basurl}/api/v1/address`,valus,{
        headers:{
            'token' : localStorage.getItem("userToken")
        }
    }).catch((error)=>{
        setErrorMessage(error.response.data.error)
        
    setloading(false)
    })
    $(".loading").fadeOut(1000)
    $(".loading").fadeIn(1000)
    if(data.message == 'success'){
      setloading(false)
      nav('/')
      window.location.reload();
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
        <h2 className='text-end'> ادخل <span className='text-danger'>العنوان</span></h2>
        <h3 className='fs-4 fw-bold text-end py-2'>املاء البيانات التاليه</h3>
        {errorMessage == "" ? "":<div className="alert alert-danger">{errorMessage}</div>}
        <form className='py-3' onSubmit={registeform.handleSubmit} >

        <div className="my-3">
                  <input className="form-control form border-bottom border-1 border-dark custom-input text-end" type="text" name="city" id="city" placeholder="المدينه" onChange={registeform.handleChange} onBlur={registeform.handleBlur} />
                  {registeform.touched.city ?<p className="text-danger">{registeform.errors.city}</p> :""}
        </div>


        <div className="my-3">
                  <input className="form-control form border-bottom border-1 border-dark custom-input text-end" type="text" name="stret" id="stret" placeholder="الشارع" onChange={registeform.handleChange} onBlur={registeform.handleBlur} />
                  {registeform.touched.stret ?<p className="text-danger">{registeform.errors.stret}</p> :""}
        </div>
        
   

        <div className="my-3">
                  <input className="form-control form border-bottom border-1 border-dark custom-input text-end" type="tel" name="phone" id="phone" placeholder="رقم الهاتف" onChange={registeform.handleChange} onBlur={registeform.handleBlur} />
                  {registeform.touched.phone ?<p  className="text-danger">{registeform.errors.phone}</p>:""}
          </div>


       <div className='d-flex align-items-center justify-content-center'>
       {loading ?<button type='button' className='btn btn-danger w-100  d-block'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button disabled={!(registeform.isValid && registeform.dirty)} type="submit"className="btn btn-danger  d-block w-100 my-3 fw-bold">تسجيل</button>}  
       </div>
        </form>
      </div>
    </div>
  </div>
</div>
  </>
}
