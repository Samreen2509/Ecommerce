const CategoryCard = (props) => {
  const { sdata } = props;
  const { image, name } = sdata;
  return (
    <div className="m-4 mb-16 flex h-40 w-40 flex-wrap place-content-center justify-center rounded-md border-2 border-solid transition duration-500 hover:-translate-y-3 hover:border-gray-600 sm:h-80 sm:w-64 md:h-96 md:w-80">
      <img
        className="m-4 h-48 w-full object-contain sm:m-6 sm:h-56 md:m-8 md:h-64"
        alt="cardImg"
        src={image.url}
      />
      <h3 className="relative text-lg font-bold sm:text-xl">{name}</h3>
    </div>
  );
};
export default CategoryCard;
