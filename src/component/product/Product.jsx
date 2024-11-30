import axios from 'axios';
import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productContext } from '../../context/productContext/ProductContext.js';
import $ from "jquery";
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../context/cartConteext/cartContext.js';
import { BsCartCheckFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { whichlistContext } from '../../context/whichListcontext/WhichListcontext.js';
import { AiOutlineEye } from "react-icons/ai";
import "./product.css";
import { Helmet } from 'react-helmet';

export default function Product() {
  const baseUrl = "https://helicopter-api.vercel.app";
  const [allProduct, setAllProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const observer = useRef();

  const { product } = useContext(productContext);
  const { addCart, setCartCount } = useContext(CartContext);
  const { addWishlist, deletWhichData, setWhichlistCount, WhichlistProduct ,setWhichlistProduct  } = useContext(whichlistContext);

  const nav = useNavigate();

  // Load more products when scrolling
  useEffect(() => {
    loadMoreProducts(page);
  }, [page]);

  // Search for products
  useEffect(() => {
    if (product) {
      searchProducts();
    }
  }, [product]);

  // Update wishlist state when loading the page
  useEffect(() => {
    if (WhichlistProduct) {
      const wishlistIds = WhichlistProduct.map(item => item._id);
      setWishlist(wishlistIds);
    }
  }, [WhichlistProduct]);

  // Observer for the last product element to auto-load more products
  const lastProductElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  // Load products by page
  async function loadMoreProducts(page) {
    try {
      $(".loading").fadeIn(1000);
      const { data } = await axios.get(`${baseUrl}/api/v1/product?page=${page}`);
      setAllProduct(prevProducts => [...prevProducts, ...data.product]);
      setHasMore(data.product.length > 0);
      $(".loading").fadeOut(1000);
    } catch (error) {
      $(".loading").fadeOut(1000);
      console.error('Error fetching products:', error);
      toast.error("Failed to load products. Please try again.", {
        position: 'top-right',
        className: 'border border-danger p-2',
        duration: 1000,
      });
    }
  }

  // Search for products based on keywords
  async function searchProducts() {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/product?keyword=${product}`);
      setAllProduct(data.product);
      setHasMore(data.product.length > 0);
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error("Failed to search products. Please try again.", {
        position: 'top-right',
        className: 'border border-danger p-2 notefection',
        duration: 1000,
      });
    }
  }

  // Add to cart
  async function addToChart(id) {
    try {
      let { data } = await addCart(id);
      if (data.message === "success") {
        setCartCount(data.cartItems);
        toast.success("تم الاضافه", {
          position: 'top-center',
          className: 'border border-danger notefection p-3 bg-white text-danger w-100 fw-bolder fs-4 success',
          duration: 1000,
          icon: '👏'
        });
      } else {
        throw new Error("Error adding to cart");
      }
    } catch (error) {
      nav("/login");
      toast.error("Failed to add to cart. Please try again.", {
        position: 'top-center',
        className: 'border border-danger notefection p-2',
        duration: 1000,
      });
    }
  }

  // Add or remove from wishlist
  async function toggleWishlist(id) {
    try {
      if (wishlist.includes(id)) {
        let { data } = await deletWhichData(id);
        console.log(data);
        
        if (data.message === "success") {
          setWhichlistProduct(data.wishlist)
          setWishlist(wishlist.filter(item => item !== id));
          setWhichlistCount(data.wishlist.length);
          toast.success("تم الإزالة", {
            position: 'top-center',
            className: 'border border-danger notefection p-3 bg-white text-danger notefection w-100 fw-bolder fs-4',
            duration: 1000,
            icon: '👏'
          });
        } else {
          throw new Error("Error removing from wishlist");
        }
      } else {
        let { data } = await addWishlist(id);
        if (data.message === "success") {
          setWhichlistProduct(data.wishlist)          
          setWishlist([...wishlist, id]);
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
      if(!localStorage.getItem("userToken")){
        nav("/login");
      }
     
      toast.error("Failed to update wishlist. Please try again.", {
        position: 'top-center',
        className: 'border border-danger p-2 ',
        duration: 1000,
      });
    }
  }

  return (
    <>
    <Helmet>
        <title>منتجاتنا | هليكوبتر</title>
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

      <Toaster />
      <div className="container" id='product'>
        <div className="row">
          <div className="col-md-12 productes d-flex align-items-center underline justify-content-between w-100">
            <div className='w-100 productes' >
              <p className='fw-bold productes fs-2 products_text text-danger text-end w-100'>المنتجات</p>
            </div>
          </div>

          {allProduct ? (
            <>
              {allProduct.map((elm, index) => {
                const isInWishlist = wishlist.includes(elm._id);
                if (allProduct.length === index + 1) {
                  return (
                    <div ref={lastProductElementRef} key={elm._id} className="col-lg-3 col-md-4 col-sm-6 col-6 my-3">
                      <div className="product position-relative">
                        <div className='position-relative'>
                          <img src={elm.imgCover} className="w-100" alt="" />
                          <div id='which-sp' className='which-sp w-100 '>
                            <span className="m-auto cursor-pointer" onClick={() => toggleWishlist(elm._id)}>
                              <FaHeart id="wish" className={`fa-solid fa-heart fs-2 position-absolute ${isInWishlist ? 'text-danger' : ''}`} />
                            </span>
                            <Link to={"/ProductDetelse/" + elm._id}>
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
                        <div className='product-des px-3 position-relative'>
                          <p className="text-main text-end fs-3 text-black text-name"> الصنف :  <span className='text-danger fs-4'>{elm.title.split(" ").slice(0, 3).join(" ")}</span></p>
                          <p className="fw-bold text-end px-1 py-2 product-price">
                            <span className='text-danger fs-4 fw-bolder '>{elm.price}</span> : السعر
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={elm._id} id='product' className="col-lg-3 col-md-4 col-sm-6 col-6 my-3 ">
                      <div className="product position-relative">
                        <div className='position-relative'>
                          <img src={elm.imgCover} className="w-100" alt="" />
                          <div id='which-sp' className='which-sp w-100 '>
                            <span className="m-auto cursor-pointer" onClick={() => toggleWishlist(elm._id)}>
                              <FaHeart id="wish" className={`fa-solid fa-heart fs-2 position-absolute ${isInWishlist ? 'text-danger fw-bolder' : ''}`} />
                            </span>
                            <Link to={"/ProductDetelse/" + elm._id}>
                              <span className="m-auto cursor-pointer">
                                <AiOutlineEye id="wishs" className="fa-solid fa-heart fs-2 position-absolute" />
                              </span>
                            </Link>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between position-relative">
                          <button onClick={() => addToChart(elm._id)} className="btn btn-danger w-100 d-block">
                            <BsCartCheckFill className='fs-5 fw-bolder' />
                          </button>
                        </div>
                        <div className='productesss px-3 d-block' >
                          <p className="text-main text-end fs-3 text-black text-name">  الصنف : <span className='text-danger fs-4'>{elm.title.split(" ").slice(0, 3).join(" ")}</span></p>
                        </div>
                        <div className='product-price'>
                          <p className="fw-bold text-end px-1 py-2">
                            <span className='text-danger fs-4 fw-bolder '>{elm.price}</span> : السعر
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
