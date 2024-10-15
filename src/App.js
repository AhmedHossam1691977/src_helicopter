import React, { useEffect, useState } from 'react'
import Home from './component/home/Home.jsx'
import About from './component/about/About.jsx'
import Contact from './component/contact/Contact.jsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout.jsx'
import SignUp from './component/signUp/SignUp.jsx'
import ResetEmail from './component/resetEmail/ResetEmail.jsx'
import Login from './component/login/Login.jsx'
import Cart from './component/cart/Cart.jsx'
import Whichlist from './component/whichlist/Whichlist.jsx'
import ProtectedRouter from './ProtectedData.jsx'
import ForgetPassword from './component/forgetPassword/ForgetPassword.jsx'
import VerifyResetCode from './component/verifyResetCode/VerifyResetCode.jsx'
import ResetPassword from './component/resetPassword/ResetPassword.jsx'
import { jwtDecode } from 'jwt-decode'
import Catigory from './component/catigory/Catigory.jsx'
import Product from './component/product/Product.jsx'
import UserAddress from './component/userAddress/UserAddress.jsx'
import ProductOfCatigory from './component/ProductOfCatigory/ProductOfCatigory.jsx'
import CatigoryContextProvider from './context/catigoryCotext/CatigoryCotext.js'
import ProductDetelse from './component/productDetelse/ProductDetelse.jsx'
import ProductContextProvider from './context/productContext/ProductContext.js'
import CartContextProvider from './context/cartConteext/cartContext.js'
import Payment from './component/payment/Payment.jsx'
import WhichlistContextProvider from './context/whichListcontext/WhichListcontext.js'
import NotFound from './component/notFound/NotFound.jsx'
import Setting from './component/setting/Setting.jsx'
import Orders from './component/orders/Orders.jsx'


export default function App() {

  let [userdata,setuserdata] =useState(null)





  function savedata(data){
    setuserdata(data)
  }




// Logout
  function Logout(){
    savedata(null)
    localStorage.removeItem("userToken")
    return  <Navigate to='/login'/>
  }



    // stop back for refresh

    useEffect(()=>{
      if(localStorage.getItem("userToken") ){
        let token = localStorage.getItem('userToken')
        let data =jwtDecode(token)
        savedata(data)
      }
    },[])

  let Routes = createBrowserRouter([
    {path:'/',element:<Layout Logout={Logout} userdata={userdata}/>,children:[
      {path:'/',element:<Home/>},
      {path:'about',element:<About/>},
      {path:'contact',element:<Contact/>},

      {path:'cart',element:<ProtectedRouter><Cart/></ProtectedRouter>},
      {path:'whichlist',element:<ProtectedRouter> <Whichlist/> </ProtectedRouter>},
      {path:'catigory',element:<ProtectedRouter> <Catigory/> </ProtectedRouter>},
      {path:'product',element:<> <Product/> </>},
      {path:'userAddress',element:<ProtectedRouter> <UserAddress/> </ProtectedRouter>},
      {path:'setting',element:<ProtectedRouter> <Setting/> </ProtectedRouter>},
      {path:'orders',element:<ProtectedRouter> <Orders/> </ProtectedRouter>},


      {path:'productOfCatigory/:id',element:<> <ProductOfCatigory/> </>},
      {path:'productDetelse/:id',element:<ProtectedRouter> <ProductDetelse/> </ProtectedRouter>},
      {path:'payment/:id',element:<ProtectedRouter> <Payment/> </ProtectedRouter>},
      





      {path:'signup',element:<SignUp />},
      {path:'ResetEmail',element:<ResetEmail  savedata={savedata}/>},
      {path:'login',element:<Login savedata={savedata}/>},
      {path:'forgetPassword',element:<ForgetPassword/>},
      {path:'verifyResetCode',element:<VerifyResetCode/>},
      {path:'resetPassword',element:<ResetPassword/>},

      {path:"*" ,element:<NotFound/>}




  ]}
  ])



  return <>
<WhichlistContextProvider>
  <CartContextProvider>
    <CatigoryContextProvider>
      <ProductContextProvider>
        <RouterProvider router={Routes} />
      </ProductContextProvider>
    </CatigoryContextProvider>
  </CartContextProvider>
</WhichlistContextProvider>
 
   
      
  

  </>
}
