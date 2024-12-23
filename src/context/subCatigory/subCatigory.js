import axios from "axios";
import { createContext, useEffect, useState } from "react";





export let subCatigoryContext =createContext()


export default function SubCatigoryContextProvider(props){



    const baseUrl = "https://final-pro-api-j1v7.onrender.com"
    const [allSubCatigory , setAllSubCatigory]=useState([])



    useEffect(()=>{
        allCatigories()
    },[])



    async function allCatigories(){

        const {data} = await axios.get(`${baseUrl}/api/v1/subCategory`).catch((err)=>{
            console.log(err);
        })

        setAllSubCatigory(data.subcategories)
        
    }

    

    return <subCatigoryContext.Provider value={{allSubCatigory}}> 
        {props.children}
    </subCatigoryContext.Provider>


}