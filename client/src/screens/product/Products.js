import Shimmer from '../../components/Loading/Shimmer.js';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCards.js';
import useProduct from './useProduct.js';
import { useParams } from 'react-router-dom';

const Products = () => {
  const { id } = useParams();
  const productSection = useProduct(id);
  if (productSection === null) return <Shimmer />;

  return (
    <div className="body">
      <div className="min-h-min">
        <div className="mx-48 text-5xl font-bold">
          <h1>Shop by category</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {productSection.map((s) => (
            <Link to="/singleProduct" className="link">
              <ProductCard key={s.id} sdata={s} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Products;
