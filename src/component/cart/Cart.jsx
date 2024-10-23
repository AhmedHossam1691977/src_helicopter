import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartConteext/cartContext.js";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { FaCcAmazonPay } from "react-icons/fa";
import "./cart.css"
export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const {
    errorCart,
    cartCount,
    getAllCartData,
    deletCartData,
    updateProductQuantany,
    deletAllCartData,
    setCartCount,
  } = useContext(CartContext);
  let nav = useNavigate();

  useEffect(() => {
    $(".loading").fadeIn(1000);
    getData();
    $(".loading").fadeOut(1000);
  }, []);

  async function getData() {
    const { data } = await getAllCartData();
    console.log("product", data.cart.cartItems);
    setCartData(data.cart);
    console.log(data.cartItems);
  }

  async function updateCount(id, quantity) {
    let { data } = await updateProductQuantany(id, quantity);
    setCartData(data.cart);
  }

  async function deletProduct(id) {
    $(".loading").fadeIn(1000);

    let { data } = await deletCartData(id);
    if (data.message == "success") {
      $(".loading").fadeOut(1000);

      setCartData(data.cart);
      setCartCount(data.cartItems);
      console.log(id);
    }
  }

  async function deletAllProduct() {
    $(".loading").fadeIn(1000);
    let { data } = await deletAllCartData();
    setCartData(data.cart);
    setCartCount(data.cartItems);
    if (data.message == "success") {
      $(".loading").fadeOut(1000);

      nav("/");
    }
  }

  function handlePayment() {
    if (cartData && cartData._id) {
      nav(`/payment/${cartData._id}`);
    }
  }

  const handleImageClick = (id) => {
    nav(`/productDetelse/${id}`);
  };



  return (
    <>
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

      <div className="container my-5" id="cart">
        <div className="row">
          <div className="col-md-12 my-2 w-100 d-flex align-items-center justify-content-between">
            <div style={{ direction: "rtl" }}>
              <p className="fs-5 fw-bolder">
                المنتجات : <span className="text-danger">{cartCount}</span>
              </p>
            </div>
            <div>
              <button
                onClick={() => deletAllProduct()}
                className="btn btn-danger m-auto py-2 px-3 border-success border border-1"
              >
                <i className="fa-regular fa-trash-can px-1 text-white"></i> حذف الكل
              </button>
            </div>
          </div>
          <div className="col-md-12">
            <div className="w-100 d-flex align-items-center justify-content-between border border-2 px-2 py-2">
              <p> المنتج</p>
              <p>السعر</p>
              <p>الكمية</p>
            </div>
          </div>
      {cartData ?<>
      
        {cartData?.cartItems.map((elm) => {
            if (elm.quantity == 0) {
              deletProduct(elm._id);
            }
            return (
              <div className="col-md-12 my-2" key={elm._id}>
                <div className="d-flex align-items-center justify-content-between border border-2 px-2 py-2">
                  <div onClick={() => handleImageClick(elm.product._id)} className="w-100 position-relative d-flex align-items-center pointer">
                    <img
                      src={elm.product?.imgCover || "default-image-path.jpg"}
                      className="cart-image"
                      alt=""
                    />
                    <p className="fw-bolder px-3 text-danger">
                      {elm.product?.title.split(" ").slice(0,2).join(" ") || "No title available"}
                    </p>
                  </div>
                  <div className="w-100 position-relative d-flex align-items-center justify-content-center">
                    <p className="fw-bolder px-3">
                      <span className="text-danger">{elm.price}</span> جنيه
                    </p>
                  </div>
                  <div className="w-100 position-relative d-flex align-items-center justify-content-end">
                    <div className="col-md-5 d-flex justify-content-center align-items-center">
                      <span
                        onClick={() => updateCount(elm._id, elm.quantity + 1)}
                        className="btn btn-white border border-success btn-sm"
                      >
                        +
                      </span>
                      <span className="px-2 fs-4">{elm.quantity}</span>
                      <span
                        onClick={() => updateCount(elm._id, elm.quantity - 1)}
                        className="btn btn-white border border-danger btn-sm"
                      >
                        -
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-end ">
                  <button
                    onClick={() => deletProduct(elm._id || "No title available")}
                    className="btn text-white bg-danger border border-3 p-1 "
                  >
                    <i className="fa-regular fa-trash-can px-1 text-white px-2"></i>حذف
                  </button>
                </div>
              </div>
            );
          })}

      </>:""}
{cartData ?<>

  {cartData && (
  <div className="col-12 d-flex align-items-center justify-content-end">
    <div className="total-price w-100">
      <p className="d-flex justify-content-end m-3 fs-3 fw-bolder">
        الحساب
      </p>
      <p className="d-flex justify-content-end m-3 fs-5 fw-bolder">
        جنيه{" "}
        <span className="text-danger px-2">
          {cartData.totalPrice || "0"}
        </span>{" "}
        : سعرالمنتج{" "}
      </p>
      <p className="d-flex justify-content-end m-3 fs-5 fw-bolder">
        جنيه{" "}
        <span className="text-danger px-2">
          {cartData.delevary || "0"}
        </span>{" "}
        : سعرالتوصيل{" "}
      </p>
      <p className="d-flex justify-content-end m-3 fs-5 fw-bolder">
        جنيه{" "}
        <span className="text-danger px-2">
          {5 || "0"}
        </span>{" "}
        : سعر الخدمه{" "}
      </p>
      <p className="d-flex justify-content-end m-3 fs-5 fw-bolder">
        جنيه{" "}
        <span className="text-danger px-2">
          {cartData.totalPrice + cartData.delevary + 5 || "0"}
        </span>{" "}
        : سعرالكلي{" "}
      </p>
      <div className="w-100 d-flex align-items-center justify-content-center my-2">
        <button onClick={handlePayment} className="btn btn-danger w-50">
          <FaCcAmazonPay className="fw-bolder fs-3" />
        </button>
      </div>
    </div>
  </div>
)}

</> :""}
        </div>
      </div>
    </>
  );
}