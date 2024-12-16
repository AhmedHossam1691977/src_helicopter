import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./orders.css";
import { Helmet } from 'react-helmet';
import $ from "jquery";
import { useNavigate } from 'react-router-dom';
export default function Orders() {
  const baseUrl = "https://portfolio-api-p4u7.onrender.com";
  const [allOrders, setAllOrders] = useState([]);
  const nav = useNavigate();


  useEffect(() => {
    fetchUserOrders();
  }, []);

  // Fetch user orders from the API
  const fetchUserOrders = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/order`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });
      setAllOrders(data.order);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    console.log(id);
    
    $(".loading").fadeIn(1000);
      const { data } = await axios.delete(`${baseUrl}/api/v1/order/delete/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });
      $(".loading").fadeOut(1000);
      setAllOrders(data.orders);
      
    
  };


 
  const orderDetels = (id) => {
    nav(`/orderDetels/${id}`);
  };




  return (
    <>
      <Helmet>
        <title>طلبات | هليكوبتر</title>
        <meta name="description" content="تصفح منتجاتنا المتنوعة في متجرنا." />
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-md-12 orderssss">
            <p className="fw-bolder fs-2 text-end text-danger">الطلبات</p>
          </div>

          {allOrders.length > 0 ? (
            allOrders.map((order) => (
              <OrderItem key={order._id} order={order} orderDetels={orderDetels} deleteOrder={deleteOrder} />
            ))
          ) : (
            <p className="text-center">لا توجد طلبات متوفرة حاليا</p>
          )}
        </div>
      </div>
    </>
  );
}

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

// Component to display individual order
function OrderItem({ order, deleteOrder ,orderDetels }) {
  const calculateElapsedTime = (orderDate) => {
    const now = new Date();
    const deliverDate = new Date(orderDate);
    const timeDifference = now - deliverDate;

    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const [timePassed, setTimePassed] = useState(calculateElapsedTime(order.DeliverdAt));

  useEffect(() => {
    if (order.isPaid) return;

    const timer = setInterval(() => {
      setTimePassed(calculateElapsedTime(order.DeliverdAt));
    }, 1000);

    return () => clearInterval(timer);
  }, [order.isPaid, order.DeliverdAt]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="col-md-12 border border-1 my-2 d-flex align-items-center justify-content-between" id="orders">
      <div>
        {order.isDeliverd ? (
          ""
        ) : (
          <button onClick={() => deleteOrder(order._id)} className="btn btn-danger mx-2">
            حذف الطلب
          </button>
        )}
        <button onClick={() => orderDetels(order._id)} className="btn btn-success">عرض الطلب</button>
      </div>
      <div>
        <p className="text-end fs-3 fw-bolder">
          الاسم: <span className="text-danger">{order.user.name}</span>
        </p>
        <p className="text-end fw-bolder fs-4">
          المدينة: <span className="text-danger">{order.shippingAddress.city}</span>
        </p>
        <p className="text-end fw-bolder fs-4">
          الشارع: <span className="text-danger">{order.shippingAddress.street}</span>
        </p>
        <p className="text-end fw-bolder fs-4">
          رقم الهاتف: <span className="text-danger">{order.shippingAddress.phone}</span>
        </p>
        <p className="text-end fw-bolder fs-4">
          سعر الطلب:{" "}
          <span className="text-danger">{order.orderPrice + order.delevary + order.cartorder}</span>
        </p>
        <p className="text-end fw-bolder fs-4">
          تاريخ الطلب: <span className="text-danger">{formatDate(order.DeliverdAt)}</span>
        </p>

        {!order.isDeliverd && (
          <p className="text-end fw-bolder fs-4">
            الوقت المتبقي:{" "}
            <span className="text-danger">
              {`${timePassed.minutes} دقيقة ${timePassed.seconds} ثانية`}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
