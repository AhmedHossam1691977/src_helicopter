import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Orders() {
  const baseUrl = "https://project-model.onrender.com";
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    userOrders();
  }, []);

  async function userOrders() {
    const { data } = await axios
      .get(`${baseUrl}/api/v1/order`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .catch((err) => {
        console.log(err);
      });

    setAllOrders(data.order);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-5">
          <p className='fw-bolder fs-2 text-end text-danger'>الطلبات</p>
        </div>

        {allOrders ? (
          <>
            {allOrders.map((elm) => (
              <OrderItem key={elm._id} order={elm} />
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

// مكوّن فرعي لعرض الطلب
function OrderItem({ order }) {
  const calculateElapsedTime = (orderDate) => {
    const now = new Date();
    const deliverDate = new Date(orderDate);
    const timeDifference = now - deliverDate; // حساب الوقت المنقضي

    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const [timePassed, setTimePassed] = useState(calculateElapsedTime(order.DeliverdAt));

  useEffect(() => {
    if (order.isPaid) {
      return; // وقف العد إذا تم الدفع
    }

    const timer = setInterval(() => {
      setTimePassed(calculateElapsedTime(order.DeliverdAt));
    }, 1000);

    return () => clearInterval(timer); // تنظيف المؤقت عند إلغاء تحميل العنصر
  }, [order.isPaid, order.DeliverdAt]);

  return (
    <div className="col-md-12 border border-1 my-2">
      <p className="text-end fs-3 fw-bolder">
        الاسم: <span className="text-danger">{order.user.name}</span>
      </p>
      <p className="text-end fw-bolder fs-4">العنوان</p>
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
        سعر الطلب: <span className="text-danger">{order.orderPrice + order.delevary + 5}</span>
      </p>
      <p className="text-end fw-bolder fs-4">
        تاريخ الطلب:{" "}
        <span className="text-danger">
          {(() => {
            const date = new Date(order.DeliverdAt);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); // الأشهر تبدأ من 0
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          })()}
        </span>
      </p>

      {order.isDeliverd == true?"":<>
        <p className="text-end fw-bolder fs-4">
          الوقت المتبقي:{" "}
          <span className="text-danger">
            {`${timePassed.minutes} دقيقة ${timePassed.seconds} ثانية`}
          </span>
        </p>
      </> }
    </div>
  );
}
