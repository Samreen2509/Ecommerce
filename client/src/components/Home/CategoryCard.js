const CategoryCard = (props) => {
  const { sdata } = props;
  const { image, name } = sdata;
  return (
    <div className="m-10 flex h-96 w-80 flex-wrap place-content-center justify-center rounded-md border-2 border-solid transition delay-300 ease-in-out  hover:-translate-y-3 hover:border-gray-600">
      <img className="m-8 h-64 w-60 " alt="cardImg" src={image.url} />
      <h3 className="text-xl font-bold">{name}</h3>
    </div>
  );
};
export default CategoryCard;
