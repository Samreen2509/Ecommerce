import { Link } from 'react-router-dom';

const CategoryCard = (props) => {
  const { sdata } = props;
  const { image, name, _id } = sdata;
  return (
    <div className="flex justify-center rounded-md border border-opacity-40 bg-white px-2 py-2 transition duration-300 hover:border-transparent hover:shadow-md hover:shadow-black">
      <Link to={`/category/${_id}`}>
        <img
          className="h-40 rounded-md object-contain md:h-80 lg:h-56"
          alt="cardImg"
          src={image.url}
        />
        <h3 className="mt-2 w-full text-center text-sm font-bold md:text-lg lg:text-lg">
          {name}
        </h3>
      </Link>
    </div>
  );
};
export default CategoryCard;
