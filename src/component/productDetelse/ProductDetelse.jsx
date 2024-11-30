import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import $ from "jquery";
import { BsCartCheckFill } from "react-icons/bs";
import { CartContext } from '../../context/cartConteext/cartContext.js';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import "./peoductDetels.css";

export default function ProductDetelse() {
  const baseUrl = "https://helicopter-api.vercel.app";
  const [product, setProduct] = useState([]);
  const [catigoryId, setCatigoryId] = useState([]);
  const [productOfCatigory, setProductOfCatigory] = useState([]);
  let { id } = useParams();
  let nav = useNavigate();
  let { addCart, setCartCount } = useContext(CartContext);

  useEffect(() => {
    $(".loading").fadeIn(1000);
    productDetels();
    $(".loading").fadeOut(1000);
  }, []);

  useEffect(() => {
    if (catigoryId) {
      $(".loading").fadeIn(1000);
      catigory();
      $(".loading").fadeOut(1000);
    }
  }, [catigoryId]);

  // Fetch product details
  async function productDetels() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/product/${id}`);
      setProduct(data.product);
      setCatigoryId(data.product.catigory);
    } catch (error) {
      console.error("Error fetching product details:", error);
      localStorage.removeItem("userToken");
      nav("/login");
    }
  }

  // Fetch category details
  async function catigory() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/categories/${catigoryId}`);
      if (data.category && data.category.allProduct) {
        setProductOfCatigory(data.category.allProduct);
      }
    } catch (error) {
      console.error("Error fetching category details:", error);
      localStorage.removeItem("userToken");
      nav("/login");
    }
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  // Handle category click
  async function handleCatigoryClick(id) {
    $(".loading").fadeIn(1000);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/product/${id}`);
      setProduct(data.product);
      setCatigoryId(data.product.catigory);
    } catch (error) {
      console.error("Error fetching product details:", error);
      localStorage.removeItem("userToken");
      nav("/login");
    }
    $(".loading").fadeOut(1000);
  }

  // Add product to cart
  async function addToChart(id) {
    $(".loading").fadeIn(1000);
    try {
      let { data } = await addCart(id);
      if (data.message === "success") {
        setCartCount(data.cartItems);
        toast.success(data.message, {
          position: 'top-center',
          className: 'border border-success p-3 bg-white text-danger w-100 fw-bolder fs-4',
          duration: 1000,
          icon: '👏'
        });
      } else {
        toast.error("Error", {
          position: 'top-right',
          className: 'border border-danger p-2',
          duration: 1000,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      localStorage.removeItem("userToken");
      nav("/login");
    }
    $(".loading").fadeOut(1000);
  }

  return (
    <>
      <Helmet>
        <title>تفاصيل المنتجات</title>
        <meta name="description" content={`Learn more about ${product.title}, its features, price, and description.`} />
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
      <Toaster />
      <div id='product-d' className={"container"}>
        <div className="row ">
          <div className="col-md-12 prodoct-d-text d-flex align-items-center justify-content-center w-100">
            <div className="container ">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-6 d-flex align-items-center justify-content-center my-5 w-50">
                  <img src={product.imgCover} className='prodoct-d-img' alt="" />
                </div>
                <div className="col-md-6">
                  <div className='my-3'>
                    <p className='text-end fw-bold fs-2 my-2'>الصنف : <span className='text-danger fw-bold text-product-d'>{product.title}</span> </p>
                    <p className='text-end my-5 fs-3 fw-bold'> <span className='fw-bold text-danger text-product-d'>{product.price}</span> : السعر</p>
                    <p className='text-end fw-normal fs-5 fw-bold'> الوصف : <span className='fw-bold text-danger text-product-d'>  {product.description}</span> </p>
                  </div>

                  <div className='d-flex align-items-center justify-content-center my-5 product-d-btn'>
                    <button className="btn btn-danger w-100 d-block" onClick={() => addToChart(product._id)}><BsCartCheckFill /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <Carousel
              responsive={responsive}
              className='w-100 position-relative my-5 Carousel'
              swipeable={true}
              draggable={true}
              showDots={false}
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              customLeftArrow={<></>}
              customRightArrow={<></>}
            >
              {productOfCatigory?.map((elm) => {
                return (
                  <div className='card mx-2' onClick={() => handleCatigoryClick(elm._id)} key={elm._id}>
                    <div className='d-flex align-items-center justify-content-between '>
                      <img src={elm.imgCover} className='w-50 cursor-pointer py-2' alt="" />
                      <p className='fs-5 fw-bold px-2 text-danger text-end'>{elm.title.split(" ").slice(0, 2).join(" ")}</p>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
