import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let catigoryContext = createContext();




export default function CatigoryContextProvider(props){

    const baseUrl = "https://portfolio-api-p4u7.onrender.com"
    const [allCatigory , setAllCatigory]=useState([])



    useEffect(()=>{
        allCatigories()
    },[])



    async function allCatigories(){

        const {data} = await axios.get(`${baseUrl}/api/v1/categories`).catch((err)=>{
            console.log(err);
        })
        // console.log(data);
        setAllCatigory(data.categories)
        
    }


    return <catigoryContext.Provider value={{allCatigory}}>
        {props.children}
    </catigoryContext.Provider>

}  