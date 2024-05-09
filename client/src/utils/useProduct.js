import { useState,useEffect } from "react";
const useProduct = (id) => {
    const [productSection,setProductSection]=useState(null);
    
    useEffect(()=>{
        const fetchData = async()=>{
             const data= await fetch("https://api.escuelajs.co/api/v1/products");
             const json=await data.json();
            setProductSection(json);
        }
        fetchData();
       },[]);
  return productSection;
}

export default useProduct;
