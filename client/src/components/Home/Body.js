import Shimmer from '../Loading/Shimmer.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import CategoryCard from './CategoryCard.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Body = () => {
  const { id } = useParams();
  const { isUserVerified } = useSelector(state => state.auth)
  const [storeSection, setStoreSection] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://fakestoreapi.com/products');
      const json = await data.json();
      setStoreSection(json);
    };
    fetchData();
  }, []);

  return storeSection.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="">
        {isUserVerified ? <p className='text-white bg-black text-lg text-center'>
          <span className='text-slate-300 hover:underline cursor-pointer mr-2'>click here</span>please verify your account. A verification link already sent to your email address
        </p> : ''}
        <Carousel />
      </div>
      <div className="min-h-min">
        <div className="mx-48 my-8 text-5xl font-bold">
          <h1>Shop by category</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {storeSection.map((s, i) => (
            <Link to={'/category/' + s.id} key={i} className="link">
              <CategoryCard key={s.id} sdata={s} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Body;
