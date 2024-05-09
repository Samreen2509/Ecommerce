import Shimmer from '../Loading/Shimmer.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import CategoryCard from './CategoryCard.js';
import { useParams } from 'react-router-dom';

const Body = () => {
  const { id } = useParams();
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
        <Carousel />
      </div>
      <div className="min-h-min">
        <div className="mx-48 text-5xl font-bold">
          {' '}
          <h1>Shop by category</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {storeSection.map((s, i) => (
            <Link to={'/category/' + s.id} key={i} className="link">
              {' '}
              <CategoryCard key={s.id} sdata={s} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Body;
