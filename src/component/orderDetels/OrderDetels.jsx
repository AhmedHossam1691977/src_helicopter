import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { id } = useParams();
  const baseUrl = "https://portfolio-api-p4u7.onrender.com";
  const [orderProductDetails, setOrderProductDetails] = useState([]); // تخزين بيانات المنتجات

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      console.log(id); // تأكد من استقبال ID الطلب

      const { data } = await axios.get(`${baseUrl}/api/v1/order/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });

      // تعيين بيانات المنتجات داخل الطلب
      setOrderProductDetails(data.order.orderItems);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="container mt-5 my-5" id='OrderDetails'>
      <h2 className="text-center mb-4">تفاصيل الطلب</h2>
      {orderProductDetails.length > 0 ? (
        <div className="row">
          {orderProductDetails.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-3">
                <img
                  src={item.product.imgCover}
                  alt={item.product.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product.title}</h5>
                  <p className="card-text text-muted">
                    {item.product.description}
                  </p>
                  <p className="card-text">
                    <strong>السعر: </strong> {item.product.price} جنيه
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">جاري تحميل البيانات...</p>
      )}
    </div>
  );
}
