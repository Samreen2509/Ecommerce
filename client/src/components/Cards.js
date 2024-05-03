
const Cards = (props) =>{
    const {sdata}=props;
    const {image,category}=sdata;
    return(
       <div className="flex w-80 h-96 m-10 flex-wrap justify-center place-content-center rounded-md border-solid  border-2 hover:border-gray-600">
         <img className="w-60 h-64 m-8 " alt="cardImg" src={image} />
         <h3 className="font-bold text-xl">{category}</h3>
       </div>
    )
   }
   export default Cards;