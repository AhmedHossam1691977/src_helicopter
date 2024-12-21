import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import $ from "jquery";
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../context/cartConteext/cartContext.js';
import { BsCartCheckFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { whichlistContext } from '../../context/whichListcontext/WhichListcontext.js';
import "./../ProductOfCatigory/ProductOfCatigory.css";
import { productContext } from '../../context/productContext/ProductContext.js';
import { Helmet } from 'react-helmet';

export default function ProductOfSubCarigory() {
  const baseUrl = "https://portfolio-api-p4u7.onrender.com";
  let { addCart, setCartCount } = useContext(CartContext);
  let { addWishlist, deletWhichData, setWhichlistCount, WhichlistProduct, setWhichlistProduct } = useContext(whichlistContext);
  let { product } = useContext(productContext);

  let { id } = useParams();

  const [supCatigory, setAllSubcatigory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // حالة البحث

  useEffect(() => {
    $(".loading").fadeIn(1000);
    allProductInCatigory();
    $(".loading").fadeOut(1000);
  }, [id]);

  useEffect(() => {
    if (Array.isArray(WhichlistProduct)) {
      const wishlistIds = WhichlistProduct.map(item => item._id);
      setWishlist(wishlistIds);
    }
  }, [WhichlistProduct]);

  async function allProductInCatigory() {
    $(".loading").fadeIn(1000);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/subCategory/${id}`);
      console.log(data.subcategory);
        console.log(data.allProduct);
        
        setAllSubcatigory(data.subcategory);
      setAllProduct(data.allProduct);
    } catch (err) {
      // Handle error
    }
    $(".loading").fadeOut(1000);
  }

  async function addToChart(id) {
    try {
      let { data } = await addCart(id);
      if (data.message === "success") {
        setCartCount(data.cartItems);
        toast.success("تم الاضافه", {
          position: 'top-center',
          className: 'border border-success notefection p-3 bg-white text-danger w-100 fw-bolder fs-4',
          duration: 1000,
          icon: '👏'
        });
      } else {
        throw new Error("Error adding to cart");
      }
    } catch (error) {
      toast.error("تم الإزالة", {
        position: 'top-right',
        className: 'border border-danger p-2 notefection',
        duration: 1000,
      });
    }
  }

  async function toggleWishlist(id) {
    try {
      if (wishlist.includes(id)) {
        let { data } = await deletWhichData(id);
        if (data.message === "success") {
          setWhichlistProduct(data.wishlist);
          setWishlist(wishlist.filter(item => item !== id));
          setWhichlistCount(data.wishlist.length);
          toast.success("تم الإزالة", {
            position: 'top-center',
            className: 'border border-danger notefection p-3 bg-white text-danger w-100 fw-bolder fs-4',
            duration: 1000,
            icon: '👏'
          });
        } else {
          throw new Error("Error removing from wishlist");
        }
      } else {
        let { data } = await addWishlist(id);
        if (data.message === "success") {
          setWishlist([...wishlist, id]);
          setWhichlistProduct(data.wishlist);
          setWhichlistCount(data.wishlist.length);
          toast.success("تم الاضافه", {
            position: 'top-center',
            className: 'border border-danger notefection p-3 bg-white text-danger w-100 fw-bolder fs-4',
            duration: 1000,
            icon: '👏'
          });
        } else {
          throw new Error("Error adding to wishlist");
        }
      }
    } catch (error) {
      $(".loading").fadeOut(1000);
      toast.error("Failed to update wishlist. Please try again.", {
        position: 'top-center',
        className: 'border border-danger p-2 ',
        duration: 1000,
      });
    }
  }

  // تصفية المنتجات بناءً على البحث
  const filteredProducts = allProduct.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>هليكوبتر | منتجات الاقسام</title>
        <meta name="description" content={`Explore all products in the ${supCatigory.subcategory} category`} />
        <meta name="keywords" content={`${supCatigory.subcategory}, products, shopping`} />
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
      <div className="container" id='ProductOfCatigory'>
        <div className="row ">
          <div className="col-md-12 productOfCatigories d-flex align-items-center justify-content-center ">
           <div className='productOfCatigories'>
           <p className='fw-bold fs-1 productOfCatigories text-danger catigory-name'>{supCatigory.subcategory}</p>
           </div>
          </div>

          {/* حقل البحث */}
          <div className="col-12 ">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // تحديث حالة البحث
              className="form-control"
            />
          </div>

          {filteredProducts.length > 0 ? (
            filteredProducts.map((elm) => {
              const isInWishlist = wishlist.includes(elm._id);
              return (
                <div key={elm._id} className="col-lg-3 col-md-4 col-sm-6 col-6 my-3">
                  <div className="product position-relative">
                    <div className='position-relative'>
                      <img src={elm.imgCover} className="w-100" alt="" />
                      <div id='which-sp' className='which-sp w-100 bg-info'>
                        <span className="m-auto cursor-pointer" onClick={() => toggleWishlist(elm._id)}>
                          <FaHeart id="wish" className={`fa-solid fa-heart fs-2 position-absolute ${isInWishlist ? 'text-danger' : ''}`} />
                        </span>
                        <Link to={"/productDetelse/" + elm._id}>
                          <span className="m-auto cursor-pointer">
                            <AiOutlineEye id="wishs" className="fa-solid fa-heart fs-2 position-absolute" />
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between product-des">
                      <button onClick={() => addToChart(elm._id)} className="btn btn-danger w-100 d-block">
                        <BsCartCheckFill className='fs-5 fw-bolder' />
                      </button>
                    </div>
                    <div className='product-des px-3'>
                      <p className="text-main text-end fs-3 text-black text-name"> الصنف : <span className='text-danger fs-4'>{elm.title.split(" ").slice(0, 3).join(" ")}</span></p>
                      <p className="fw-bold text-end px-1 py-2">
                        <span className='text-danger fs-4'>{elm.price}</span> :السعر
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 my-5">
              <p className="text-center text-danger fs-4">...جاري تحميل المنتجات</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
