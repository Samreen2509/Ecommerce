const CategoryCard = (props) => {
  const { sdata } = props;
  const { image, title, price } = sdata;
  return (
    <div className="m-10 flex h-96 w-80 flex-wrap place-content-center justify-center rounded-md border-2  border-solid hover:border-gray-600">
      <img className="m-8 h-64 w-60 " alt="cardImg" src={image} />
      <h3 className="">
        {title} - {price}
      </h3>
    </div>
  );
};
export default CategoryCard;
