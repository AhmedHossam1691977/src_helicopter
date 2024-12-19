import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet'; // إضافة Helmet
import CatigorySlider from '../catigorySlider/CatigorySlider.jsx';
import $ from 'jquery';
import Product from '../product/Product.jsx';
import MinSlider from '../minSlider/MinSlider.jsx';

export default function Home() {
  // Scroll to top and hide loading animation after component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // الانتقال إلى أعلى الصفحة
    $(".loading").fadeOut(1000); // إخفاء الـ Loading
  }, []);

  return (
    <>
      {/* إضافة التاج Helmet هنا */}
      <Helmet>
        <title>هليكوبتر - الرئيسيه</title>  
        <meta name="description" content="Welcome to Helicopter, your go-to service for home delivery of groceries, baked goods, and more." />
        <meta name="keywords" content="home delivery, groceries, baked goods, pharmacy, household essentials" />
        <meta name="author" content="Helicopter Team" />
        <meta property="og:title" content="Helicopter - Home" />
        <meta property="og:description" content="Get everything you need delivered to your door. Groceries, pharmacy, and more." />
        <meta property="og:image" content="URL_TO_IMAGE" /> 
        <meta property="og:url" content="https://yourwebsite.com" />
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

      <div className="container ">
        <div className="row">
          <div className="col-md-12 my-5">
            <MinSlider className="minsliders my-5 " />
          </div>
          <div className="col-md-12">
            <CatigorySlider />
          </div>
          <div className="col-md-12">
            <Product />
          </div>
        </div>
      </div>
    </>
  );
}
