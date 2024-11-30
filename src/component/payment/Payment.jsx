import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { useFormik } from "formik";
import { CartContext } from '../../context/cartConteext/cartContext.js';


export default function Payment() {
  const [delevary, setDelevary] = useState(null);
  const [delevaryData, setDelevaryData] = useState(null);

  useEffect(() => {
    allPlace();
    
    
 
  }, []);

  const baseUrl = "https://helicopter-api.vercel.app";
  const { setCartCount } = useContext(CartContext);
  const { id } = useParams();
  const nav = useNavigate();

  let validationSchema = Yup.object({
    street: Yup.string().required("street required").min(3, "min length 7"),
    city: Yup.string().required("city required").min(3, "min length 7"),
    phone: Yup.string().required("phone required").min(3, "min length 3").max(20, "max length 20").matches(/^01[1520][0-9]{8}$/, "enter valid phone"),
  });

  let ShippingForm = useFormik({
    initialValues: {
      street: "",
      phone: "",
      city: "",
      delevary: "" 
    },
    validationSchema,
    onSubmit: function (val) {
      payChipping(val);
    }
  });

  async function payChipping(val) {
   
    console.log(val);

    let body = {
      shippingAddress: {
        street: val.street,
        city: val.city,
        phone: val.phone,
      },
      delevary: val.delevary
    };
    const { data } = await axios.post(`${baseUrl}/api/v1/order/${id}`, body, {
      headers: {
        'token': localStorage.getItem("userToken")
      }
    });

    if (data.message == "success") {
     
      nav("/");
      setCartCount(0);
    }
  }


  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    const cityData = delevaryData.find(item => item.place === selectedCity); 
    if (cityData) {
      setDelevary(cityData.price);  
      ShippingForm.setFieldValue("delevary", cityData.price);  
    }
  };


  async function allPlace() {
    const {data} = await axios.get(`${baseUrl}/api/v1/delevary`);
    console.log(data.place);
    setDelevaryData(data.place);
  }

  useEffect(() => {
    console.log(delevary);
  }
  , [delevary
    ]);
    

  return (
    <>
     

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={ShippingForm.handleSubmit} action="">
              <div className="py-2 w-100">
                <label htmlFor="address" className="fw-bolder fs-3 text-end w-100 py-2">: العنوان</label>
                <select
                  onChange={(e) => { 
                    ShippingForm.handleChange(e);
                    handleCityChange(e); 
                  }}
                  value={ShippingForm.values.street}
                  className="form-control text-end"
                  name="street"
                  id="street"
                >
                  {delevaryData?.map((address, index) => (
                    <option key={index} value={address.place}>  
                      {address.place}
                    </option>
                  ))}
                </select>
                <p className="text-danger">{ShippingForm.errors.street}</p>
              </div>
              <div className="py-2 w-100">
                <label htmlFor="city" className='fw-bolder fs-3 text-end w-100 py-2'> : العنوان ب التفاصيل  </label>
                <input
                  onChange={ShippingForm.handleChange}
                  value={ShippingForm.values.city}
                  className="form-control text-end"
                  type="text"
                  name="city"
                  id="city"
                />
                <p className="text-danger">{ShippingForm.errors.city}</p>
              </div>

              <div className="py-2 w-100">
                <label htmlFor="phone" className='fw-bolder fs-3 text-end w-100 py-2'> : رقم الهاتف</label>
                <input
                  onChange={ShippingForm.handleChange}
                  value={ShippingForm.values.phone}
                  className="form-control text-end"
                  type="tel"
                  name="phone"
                  id="phone"
                />
                <p className="text-danger">{ShippingForm.errors.phone}</p>
              </div>

              <button type="submit" className="btn btn-danger w-100 d-block my-3">
                <i className="fa-brands fa-cc-amazon-pay px-2"></i> pay
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
