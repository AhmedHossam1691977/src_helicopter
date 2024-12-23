import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(); 

export default function CartContextProvider(props) {
    let [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        async function gitData() {
            let { data } = await getAllCartData();
            setCartCount(data.cartItems);
            
        }

        // تحقق من وجود userToken قبل استدعاء gitData
        if (localStorage.getItem("userToken")) {
            gitData();
        } else {
            setCartCount(0); // إذا لم يكن هناك userToken، يتم تعيين cartCount إلى 0
        }
    }, []);


    useEffect(() => {
        async function gitData() {
            let { data } = await getAllCartData();
            setCartCount(data.cartItems);
            
        }

        // تحقق من وجود userToken قبل استدعاء gitData
        if (localStorage.getItem("userToken")) {
            gitData();
        } else {
            setCartCount(0); // إذا لم يكن هناك userToken، يتم تعيين cartCount إلى 0
        }
    }, [localStorage.getItem("userToken")],cartCount);


    async function getAllCartData() {
        return await axios.get(`https://final-pro-api-j1v7.onrender.com/api/v1/cart`, {
            headers: {
                'token': localStorage.getItem("userToken")
            }
        });
    }

    function deletAllCartData() {
        return axios.delete(`https://final-pro-api-j1v7.onrender.com/api/v1/cart`, {
            headers: {
                'token': localStorage.getItem("userToken")
            }
        });
    }

    function addCart(id) {
        console.log(id);
        
        return axios.post(`https://final-pro-api-j1v7.onrender.com/api/v1/cart`, { "product": id }, {
            headers: {
                'token': localStorage.getItem("userToken")
            }
        });
    }

    function updateProductQuantany(id, quantity) {
        console.log(id);
      
        return axios.put(`https://final-pro-api-j1v7.onrender.com/api/v1/cart/${id}`, { "quantity": quantity }, {
            headers: {
                'token': localStorage.getItem("userToken")
            }
        });
    }

    function deletCartData(id) {
        return axios.delete(`https://final-pro-api-j1v7.onrender.com/api/v1/cart/${id}`, {
            headers: {
                'token': localStorage.getItem("userToken")
            }
        });
    }

    return (
        <CartContext.Provider value={{ addCart, getAllCartData, cartCount, updateProductQuantany, setCartCount, deletCartData, deletAllCartData }}>
            {props.children}
        </CartContext.Provider>
    );
}
