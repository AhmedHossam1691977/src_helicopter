import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import "./orders.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketUrl = 'https://portfolio-api-p4u7.onrender.com';
  const nav = useNavigate();

  useEffect(() => {
    const socket = io(socketUrl, {
      query: {
        token: localStorage.getItem('userToken'),
      },
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('orderUser', (newOrder) => {
      setUserOrders(newOrder.orders);
      setLoading(false);
      console.log('New order:', newOrder);
    });

    socket.on('connect_error', (err) => {
      setError('Failed to connect to server');
      setLoading(false);
      console.error('Connection error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const calculateDeliveryTime = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setMinutes(orderDate.getMinutes() + 45); // إضافة 45 دقيقة
    return orderDate;
  };

  async function deletOrder(id) {
    try {
      const { data } = await axios.delete(`https://portfolio-api-p4u7.onrender.com/api/v1/order/delete/${id}`, {
        headers: {
          token: `${localStorage.getItem('userToken')}`,
        },
      });

      if (data.message === "Order deleted successfully") {
        setUserOrders(userOrders.filter(order => order._id !== id));
        nav("/");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  if (loading) {
    return <div className="container text-center my-5 fs-2 fw-bold text-danger">....جاري تحميل الطلبات</div>;
  }

  if (error) {
    return <div className="container text-danger">Error: {error}</div>;
  }

  function orderDetels(id){
    nav("/orderDetels/"+id)
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-end align-items-center">
          <h1>الطلبات</h1>
        </div>
        {userOrders.map((order) => {
          const deliveryTime = calculateDeliveryTime(order.createdAt);

          return (
            <div key={order._id} id="orders" className="col-md-12 orders my-2 d-flex justify-content-end align-items-center">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <button onClick={()=>orderDetels(order._id)} className="btn btn-success mx-2">عرض الطلب</button>
                  {order.state !== 'ACCEPTED' && (
                    <button onClick={() => deletOrder(order._id)} className="btn btn-danger mx-2">
                      حذف الطلب
                    </button>
                  )}
                </div>

                <div>
                  <p className="text-end fw-bolder fs-4">
                    تاريخ الطلب: <span className="text-danger">{formatDate(order.DeliverdAt)}</span>
                  </p>
                  <p className="text-end fw-bolder fs-4">
                    موعد الطلب: <span className="text-danger">{formatTime(new Date(order.createdAt))}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
