import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let whichlistContext = createContext();
export default function WhichlistContextProvider(props) {
  let [WhichlistCount, setWhichlistCount] = useState();
  let [WhichlistProduct, setWhichlistProduct] = useState([]);

  useEffect(() => {

    async function gitData() {
      let { data } = await getAllWhichlistData();
      if (localStorage.getItem("userToken")) {
        setWhichlistProduct(data.wishlist);
      } else {
        setWhichlistProduct(null);
      }
    }

    gitData();
  }, []);

  async function getAllWhichlistData() {
    return await axios.get(`https://final-pro-api-j1v7.onrender.com/api/v1/wishlist`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  async function addWishlist(id) {
      return await axios.patch(`https://final-pro-api-j1v7.onrender.com/api/v1/wishlist`,{ product: id },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    // Fetch the updated wishlist data from the server
  

   
  }

  async function deletWhichData(id) {
    return await axios.delete(
      `https://final-pro-api-j1v7.onrender.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
  

    
  }

  return (
    <whichlistContext.Provider
      value={{
        addWishlist,
        setWhichlistCount,
        WhichlistCount,
        getAllWhichlistData,
        deletWhichData,
        WhichlistProduct,
        setWhichlistProduct,
      }}
    >
      {props.children}
    </whichlistContext.Provider>
  );
}
