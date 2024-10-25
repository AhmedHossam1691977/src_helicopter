import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./catigory.css"

export default function Catigory() {
  const baseUrl = "https://project-model.onrender.com";
  const [catigory, setCatigory] = useState([]);
  const navigate = useNavigate(); // نستخدم useNavigate للتوجيه

  useEffect(() => {
    allCatigory();
  }, []);

  // Fetch all categories from the API
  async function allCatigory() {
    const { data } = await axios.get(`${baseUrl}/api/v1/categories`).catch((err) => {
      // Handle error
    });

    setCatigory(data.categories);
  }

  // Navigate to the category's products page with the category ID
  function handleCatigoryClick(id) {
    navigate(`/productOfCatigory/${id}`); // يتم التوجيه مع إرسال الـ id
  }

  return (
    <>
      <div className="container my-5" id='catigory'>
        <div className="row">
          <div className="col-md-12 ">
            <h1 className="text-center catihory-text">
              <span className="text-danger">ا</span>لاقسام
            </h1>
          </div>
          {catigory.map((elm) => (
            <div className="col-md-4 " key={elm._id}>
              <div className="catigoru-card my-3" onClick={() => handleCatigoryClick(elm._id)}>
                <div className="card-body ">
                  <div className="img">
                    <img src={elm.image} alt="" />
                  </div>
                  <div className="titel ">
                    <p>{elm.name} </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
