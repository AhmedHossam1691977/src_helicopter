import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let whichlistContext = createContext();
export default function WhichlistContextProvider(props) {
  let [WhichlistCount, setWhichlistCount] = useState();
  let [WhichlistProduct, setWhichlistProduct] = useState(null);

  useEffect(() => {
    console.log("hi wichlist");

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
    return await axios.get(`https://project-model.onrender.com/api/v1/wishlist`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  async function addWishlist(id) {
    await axios.patch(
      `https://project-model.onrender.com/api/v1/wishlist`,
      { product: id },
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    // Fetch the updated wishlist data from the server
    let { data } = await getAllWhichlistData();
    setWhichlistProduct(data.wishlist);
    setWhichlistCount(data.wishlist.length);
  }

  async function deletWhichData(id) {
    await axios.delete(
      `https://project-model.onrender.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    // Fetch the updated wishlist data from the server
    let { data } = await getAllWhichlistData();
    setWhichlistProduct(data.wishlist);
    setWhichlistCount(data.wishlist.length);
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
