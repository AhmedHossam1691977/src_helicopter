import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { id } = useParams();
  const baseUrl = "https://portfolio-api-p4u7.onrender.com";
  const [orderProductDetails, setOrderProductDetails] = useState([]); // تخزين بيانات المنتجات
  const [orderItems, setOrderItems] = useState(null); // تخزين بيانات المنتجات
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {

      const { data } = await axios.get(`${baseUrl}/api/v1/order/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });

      // تعيين بيانات المنتجات داخل الطلب
      console.log(data.order);
      setOrderProductDetails(data.order.orderItems)
      setOrderItems(data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="container mt-5 my-5" id='OrderDetails'>
      <h2 className="text-center mb-4">تفاصيل الطلب</h2>
    
        <div className="row">
           <div className="col-md-12 border border-1">
          <p className='my-4 fw-bolder'>اسم المستخدم :<span className='text-danger mx-2'>{orderItems?.user.name}</span></p>
          <p className='my-4 fw-bolder'>العنوان :<span className='text-danger mx-2'>{orderItems?.shippingAddress.street}</span></p>
          <p className='my-4 fw-bolder'>العنوان ب التفاصيل :<span className='text-danger mx-2'>{orderItems?.shippingAddress.city}</span></p>
          <p className='my-4 fw-bolder'> رقم الهاتف  :<span className='text-danger mx-2'>{orderItems?.shippingAddress.phone}</span></p>
          <p className='my-4 fw-bolder'>  سعر الطلب  :<span className='text-danger mx-2'>{orderItems?.totalOrderPrice}</span></p>

        <div className="row">
          {orderProductDetails?.map((product) =>{
            return<>
              <div className="col-md-12 d-flex justify-content-between align-items-center" id='OrderDetails'> 
              <p className='my-4 fw-bolder'>اسم المنتج :<span className='text-danger mx-2'>{product.product.title.split(" ").slice(0, 3).join(" ")}</span></p>
              <p className='my-4 fw-bolder '>سعر المنتج :<span className='text-danger mx-2'>{product.product.price}</span></p>

              <img src={product.product.imgCover}  alt="" />
              </div>
            </>
          })}
        </div>

           </div>
        </div>
      
    </div>
  );
}
