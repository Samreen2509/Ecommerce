import { useEffect, useState } from 'react';

import { filterProducts } from '../../features/productSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCards.js';
import { getAllCategory } from '../../features/categorySlice.js';
import { getAllColor } from '../../features/colorSlice.js';
import Shimmer from '../../components/Loading/Shimmer.js';
import {
  MobileFiltersDialog,
  ProductFilters,
  SortAndViewOptions,
} from './ProductFilters.js';

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const { filterProduct, products, loading } = useSelector(
    (state) => state.product
  );
  const { category } = useSelector((state) => state.category);
  const { colors } = useSelector((state) => state.color);
  const { categoryId } = useParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [formState, setFormState] = useState([]);
  const [selectedSort, setSelectedSort] = useState('low_to_high');

  useEffect(() => {
    const filterData = {
      page: 1,
      limit: 12,
      categoryId: categoryId,
    };
    dispatch(filterProducts({ filterData }));
    dispatch(getAllCategory());
    dispatch(getAllColor());
  }, [dispatch, categoryId]);

  useEffect(() => {
    const updatedFilters = [];

    if (colors) {
      updatedFilters.push({
        id: 'color',
        name: 'Color',
        options: colors.map((item) => ({
          key: item._id,
          value: item._id,
          label: item.name,
          checked: false,
        })),
      });
    }

    updatedFilters.push({
      id: 'size',
      name: 'Size',
      options: [
        { value: 'X', label: 'X', checked: false },
        { value: 'XL', label: 'XL', checked: false },
        { value: 'S', label: 'S', checked: false },
        { value: 'M', label: 'M', checked: false },
        { value: 'L', label: 'L', checked: false },
      ],
    });

    setFormState(updatedFilters);
  }, [colors, category]);

  const handleSortClick = (value) => {
    setSelectedSort(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedFilters = formState.reduce((acc, section) => {
      acc[section.id] = formData.getAll(`${section.id}[]`);
      return acc;
    }, {});

    const filterData = {
      page: 1,
      limit: 12,
      categoryId: categoryId,
      colorId: selectedFilters.color?.join(','),
      size: selectedFilters.size?.join(','),
      sortBy: selectedSort,
    };
    console.log(selectedSort);
    // Clean up the filterData object by removing undefined keys
    Object.keys(filterData).forEach((key) => {
      if (!filterData[key]) {
        delete filterData[key];
      }
    });

    console.log(filterData);
    dispatch(filterProducts({ filterData }));
  };

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="h-full bg-white">
      <MobileFiltersDialog
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        formState={formState}
        handleSubmit={handleSubmit}
      />

      <main className="mx-auto px-4 sm:px-6 md:max-w-7xl lg:max-w-full lg:px-20">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
          <h1 className="m-auto text-2xl font-bold md:mt-10 md:text-3xl lg:ml-20 lg:text-5xl">
            New Arrivals
          </h1>

          <SortAndViewOptions
            handleSortClick={handleSortClick}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
        </div>

        <section aria-labelledby="products-heading" className="pb-16 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="flex gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <ProductFilters formState={formState} handleSubmit={handleSubmit} />

            {/* Product grid */}
            <div className="mt-2 flex w-full flex-wrap gap-x-10 gap-y-10">
              {
                <>
                  {filterProduct === null && products?.length === 0 ? (
                    <p>No products found.</p>
                  ) : (
                    <>
                      {filterProduct === null
                        ? products?.map((product, index) => (
                            <ProductCard key={index} sdata={product} />
                          ))
                        : filterProduct?.map((product, index) => (
                            <ProductCard key={index} sdata={product} />
                          ))}
                    </>
                  )}
                </>
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductDetailsPage;
