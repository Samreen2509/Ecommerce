import Shimmer from "./Shimmer";
  import { useState,useEffect } from "react";
  import { Link } from "react-router-dom";
  import Carousell from "./Carousell";
  import Cards from "./Cards";
  import { useParams } from "react-router-dom";
   const Body = () => {
      const {id}=useParams();
      const [storeSection,setStoreSection]=useState([]);
       useEffect(()=>{
     
      const fetchData = async()=>{
           const data= await fetch("https://fakestoreapi.com/products");
           const json=await data.json();
          setStoreSection(json);
      }
      fetchData();
     },[]);
     return storeSection.length === 0?<Shimmer/>:(
      <div className="body">
         <div className=""><Carousell/></div>
         <div className="min-h-min">
           <div className="font-bold text-5xl mx-48"> <h1>Shop by category</h1></div>
           <div className="flex flex-wrap justify-center">
           {storeSection.map((s) =>(
               <Link to={"/category/"+s.id} className="link"> <Cards key={s.id} sdata={s}/></Link>
            ))}
            </div>
         </div>
        </div>
    )
  }
  export default Body;


