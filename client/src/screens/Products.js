import Shimmer from "../components/Shimmer";
  import { Link } from "react-router-dom";
  import CategoryCard from "../components/CategoryCard";
  import useProduct from "../utils/useProduct";
  import { useParams } from "react-router-dom";
   const Products = () => {
      
      const {id}=useParams();
      const productSection =useProduct(id);
      if(productSection === null)
         return <Shimmer/>;
     return (
      <div className="body">
         <div className="min-h-min">
           <div className="font-bold text-5xl mx-48"> <h1>Shop by category</h1></div>
           <div className="flex flex-wrap justify-center">
           {productSection.map((s) =>(
               <Link to="/singleProduct" className="link"> <CategoryCard key={s.id} sdata={s}/></Link>
            ))}
            </div>
         </div>
        </div>
    )
  }
  export default Products;
