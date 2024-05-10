const ProductCard = (props) => {
  const { sdata } = props;
  const { image, title, price } = sdata;
  return (
    <div className="m-10 flex h-80 w-64 flex-wrap place-content-center justify-center rounded-md ">
      <div>
        <img
          className="h-64 w-64 border-2 border-solid hover:border-gray-600 object-contain"
          alt="cardImg"
          src={image}
        />
      </div>
      <div>
        <h3 className="w-64 my-4 ">
          {title} - {price}
        </h3>
      </div>
    </div>
  );
};
export default ProductCard;