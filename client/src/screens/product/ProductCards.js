const ProductCard = (props) => {
  const { sdata } = props;
  const { image, title, price } = sdata;
  return (
    <div className="m-10 flex h-80 w-64 flex-wrap place-content-center justify-center rounded-md ">
      <div>
        <img
          className="h-64 w-64 border-2 border-solid object-contain hover:border-gray-600"
          alt="cardImg"
          src={image}
        />
      </div>
      <div>
        <h3 className="my-4 w-64 ">
          {title} - {price}
        </h3>
      </div>
    </div>
  );
};
export default ProductCard;
