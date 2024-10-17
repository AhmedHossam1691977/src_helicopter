import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import axios from 'axios';
import { useFormik } from 'formik';
import $ from "jquery"
import { useNavigate } from 'react-router-dom';

export default function Setting() {

  const userEmail = localStorage.getItem("userEmail")
  const userName = localStorage.getItem("userName")

  useEffect(()=>{
    $(".loading").fadeOut(1000)
  })


  const basurl = "https://project-model.onrender.com"
  let nav = useNavigate()
  let [loading,setloading]=useState(false)
  let [errorMessage,setErrorMessage]=useState("")

  let validationSchema = Yup.object({

    password: Yup.string().required("Password Required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contains at least one uppercase letter and at least one special character"),
    newPassword: Yup.string().required("Password Required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contains at least one uppercase letter and at least one special character"),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("newPassword")], "Passwords must match"),
    
  });

  let registeform = useFormik({
    initialValues: {

      password: "",
      newPassword: "",
      confirmPassword: "",

    },
    onSubmit,
    validationSchema,
  });



  async function onSubmit(valus){
    $(".loading").fadeIn(1000)
    setloading(true)
    let {data}=await axios.patch(`${basurl}/api/v1/auth/changePassword`,valus, {
      headers: {
          'token': localStorage.getItem("userToken")
      }
  }).catch((error)=>{
        setErrorMessage(error.response.data.error)
        
    setloading(false)
    })
    $(".loading").fadeOut(1000)


    if(data.message == 'success'){
      $(".loading").fadeIn(1000)
      localStorage.setItem('userToken', data.token);
      nav('/')
      window.location.reload()
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


  <div className="container py-5">
  <div className="row">
    <div className="col-md-12">
    <h2 className='text-end'> <span className='text-danger'>الاعدادات  </span></h2>
    </div>

    <div className="col-md-6">
    <form className='py-3'  >
          
          <div className="my-3">
                  <label htmlFor="" className='text-end w-100'>الاسم</label>
                    <input className="form-control form border-bottom border-1 border-dark custom-input text-end fw-bolder" type="text" name="userName" id="userName" placeholder={userName}  readOnly/>
          </div>
          <div className="my-3">
                  <label htmlFor="" className='text-end w-100'>الايميل</label>
                    <input className="form-control form border-bottom border-1 border-dark custom-input text-end fw-bolder" type="email" name="userEmail" id="userEmail" placeholder={userEmail}  readOnly/>
          </div>
          </form>
    </div>

    <div className="col-md-6  ">
      <p className='text-end fw-bolder fs-5 psaa-text'>تغير كلمه السر</p>
      <div className='w-100'>
        {errorMessage == "" ? "":<div className="alert alert-danger">{errorMessage}</div>}
        <form className='py-3' onSubmit={registeform.handleSubmit} >
          
        <div className="my-3">
                  <input className="form-control form border-bottom border-1 border-dark custom-input text-end" type="password" name="password" id="password" placeholder="كلمه السر" onChange={registeform.handleChange} onBlur={registeform.handleBlur} />
                  {registeform.touched.password ?<p className="text-danger">{registeform.errors.password}</p> :""}
        </div>
        

        <div className="my-3">
                  <input className="form-control form border-bottom border-1 border-dark custom-input text-end" type="password" name="newPassword" id="newPassword" placeholder=" كلمه السر الجديده" onChange={registeform.handleChange} onBlur={registeform.handleBlur} />
                  {registeform.touched.newPassword ?<p  className="text-danger">{registeform.errors.newPassword}</p>:""}
          </div>

          <div className="my-3">
                  <input className="form-control form border-bottom border-1 border-dark custom-input text-end"  type="password" name="confirmPassword" id="confirmPassword" placeholder="تاكيد كلمه السر" onChange={registeform.handleChange} onBlur={registeform.handleBlur} />
                  {registeform.touched.confirmPassword ?<p  className="text-danger">{registeform.errors.confirmPassword}</p>:""}
          </div>

       <div className='d-flex align-items-center justify-content-center'>
       {loading ?<button type='button' className='btn btn-danger w-100  d-block'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button disabled={!(registeform.isValid && registeform.dirty)} type="submit"className="btn btn-danger  d-block w-100 my-3">تاكيد</button>}  
       </div>
        </form>
      </div>
    </div>

  </div>
</div>

  </>
}
