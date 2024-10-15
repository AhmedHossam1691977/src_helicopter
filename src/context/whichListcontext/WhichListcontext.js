import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let whichlistContext = createContext() 
export default function WhichlistContextProvider (props){

    let [WhichlistCount ,setWhichlistCount] = useState()


    useEffect(()=>{

        async function gitData () {
        let {data} =await getAllWhichlistData()
        } 


        gitData ()
        // search ()


    },[WhichlistCount])









    async function getAllWhichlistData(){
       
            return await axios.get(`https://project-model.onrender.com/api/v1/wishlist`, {
                headers: {
                    'token': localStorage.getItem("userToken")
                }
            });


    }

    function addWishlist(id){
        console.log(id ,localStorage.getItem("userToken"));
        
        return axios.patch(`https://project-model.onrender.com/api/v1/wishlist`,{"product": id},{
            headers:{
                'token' :localStorage.getItem("userToken")
            }
        })
    }






  function deletWhichData(id){
        return axios.delete(`https://project-model.onrender.com/api/v1/wishlist/${id}`,{
            headers:{
                'token' :localStorage.getItem("userToken")
            }
        })
    }





    return <whichlistContext.Provider value={{addWishlist ,setWhichlistCount,WhichlistCount,getAllWhichlistData,deletWhichData}}>
        {props.children}
    </whichlistContext.Provider>

}

