import React, { useEffect } from 'react'
import CatigorySlider from '../catigorySlider/CatigorySlider.jsx'
import $ from "jquery"
import Product from '../product/Product.jsx'
import MinSlider from '../minSlider/MinSlider.jsx'



export default function Home() {

  
  useEffect(()=>{
    $(".loading").fadeOut(1000)
    },[])
  return<>
  
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
  
<div className="container">
  <div className="row">
  <div className="col-md-12 ">
        <MinSlider/>
      </div>
      
      <div className="col-md-12">
        <CatigorySlider/>
      </div>
      <div className="col-md-12">
        <Product/>
      </div>
  </div>
</div>
  
  
  </>
}
