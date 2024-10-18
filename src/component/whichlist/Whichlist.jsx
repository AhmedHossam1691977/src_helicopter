import React, { useContext, useEffect, useState } from 'react'
import { whichlistContext } from '../../context/whichListcontext/WhichListcontext.js'
import { Link } from 'react-router-dom'
import $ from "jquery";
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../context/cartConteext/cartContext.js';
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { BsCartCheckFill } from "react-icons/bs";

export default function Whichlist() {
  
  const{getAllWhichlistData,deletWhichData} =useContext(whichlistContext)
  const [product , setProduct] =useState(null)

  let {addCart,setCartCount} =useContext(CartContext)

  useEffect(()=>{
    $(".loading").fadeIn(1000)

    allProduct()
    $(".loading").fadeOut(1000)
   
    
  },[])


  async function allProduct() {
    const {data} =await getAllWhichlistData()    
      setProduct(data)
      console.log(data.wishlist);

  }



  async function addToChart(id) {
    $(".loading").fadeIn(1000)
    let {data} =await addCart(id)
    if(data.message == "success"){
      setCartCount(data.cartItems)
      $(".loading").fadeOut(1000)
      toast.success(data.message,{
        position: 'top-center',
        className: 'border border-success p-3 bg-white text-danger w-100 fw-bolder fs-4' ,
        duration: 1000,
        icon: '👏'
      })
    }else{
      toast.error("Error",{
        position: 'top-right',
        className: 'border border-danger p-2' ,
        duration: 1000,
      })
    }
  }


  async function deletProduct(id) {
    $(".loading").fadeIn(1000);

    let { data } = await deletWhichData(id);
    setProduct(data)
    $(".loading").fadeOut(1000)
    
    
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

  <Toaster/>
  
  <div className="container">
    <div className="row">
      <div className="col-md-12 d-flex justify-content-end my-3">
        <h1 className='text-end text-name text-danger  border-2 border-bottom border-black'>المفضله</h1>
      </div>

    {product ?<>
      {product?.wishlist.map((elm)=>{
          return<>
           <div key={elm._id} className="col-lg-3 col-md-4 col-sm-6 col-6 my-3 ">
                  <div className="product position-relative" > 
                      <div className='position-relative '>
                      <img src={elm.imgCover} className="w-100 img-w" alt="" />
                      <div id='which-sp' className='which-sp w-100 bg-info'>
                      <span className="m-auto cursor-pointer " >
                        <MdOutlineDelete onClick={()=>deletProduct(elm.id)} id="wish" className=" fs-1 position-absolute"/>
                      </span>
                      <Link to={"/ProductDetelse/" + elm._id}> <span className="m-auto cursor-pointer " >
                        <AiOutlineEye id="wishs" className=" fs-2 position-absolute"/>
                      </span></Link>
                      </div>
                      </div>
                      
                      <div className="d-flex  align-items-center justify-content-between product-des">
                      <button onClick={()=>addToChart(elm._id)} className="btn btn-danger w-100 d-block ">  <BsCartCheckFill className='fs-5 fw-bolder'/> </button>
                    </div>
                      <div className='product-des px-3'>
                      <p className="text-main  fs-3 text-end text-name text-black"> الصنف :  <span className='text-danger fs-4'>{elm.title.split(" ").slice(0,3).join(" ")}</span>  </p>
                      <p className="fw-bold text-end px-1 py-2">
                        <span className='text-danger fs-4'>{elm.price}</span> : السعر
                      </p>
                      </div>
                </div>
                </div>
          </>
      })}
    </> :""}

    </div>
  </div>
  
  </>
}
