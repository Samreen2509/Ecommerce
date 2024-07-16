import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, getAllProducts } from '../../features/productSlice';
import { getAllCategory } from '../../features/categorySlice';
import { getAllColor } from '../../features/colorSlice';
import ProductCard from './ProductCards';
import Pagination from './Pagination';
import Spinner from '../../components/Spinner';
import { useSearchParams } from 'react-router-dom';
import {
  MobileFiltersDialog,
  ProductFilters,
  SortAndViewOptions,
} from './ProductFilters';

const sortOptions = [
  { name: 'Price: Low to High', value: 'low_to_high' },
  { name: 'Price: High to Low', value: 'high_to_low' },
];

function ProductPage() {
  const dispatch = useDispatch();
  const { filterProduct, products, loading } = useSelector(
    (state) => state.product
  );
  const { category } = useSelector((state) => state.category);
  const { colors } = useSelector((state) => state.color);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [formState, setFormState] = useState([]);
  const [selectedSort, setSelectedSort] = useState('low_to_high');
  const [page, setPage] = useState(1);
  const [isCallFilterData, setIsCallFilterData] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = 3;

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllColor());
  }, [dispatch]);

  useEffect(() => {
    const size = searchParams.get('size');
    const categoryId = searchParams.get('categoryId');
    const colorId = searchParams.get('colorId');
    const sortBy = searchParams.get('sortBy');

    const filterData = {
      categoryId: categoryId ? categoryId.split(',') : [],
      colorId: colorId ? colorId.split(',') : '',
      size: size ? size.split(',') : '',
      sortBy: sortBy || '',
    };
    if (size || categoryId || size || sortBy) {
      setIsCallFilterData(true);
      dispatch(filterProducts({ filterData }));
    } else {
      dispatch(getAllProducts({ page }));
    }

    console.log(filterData);
  }, [dispatch, page, selectedSort, searchParams]);

  useEffect(() => {
    const size = searchParams.get('size');
    const categoryId = searchParams.get('categoryId');
    const colorId = searchParams.get('colorId');

    const updatedFilters = [];

    if (colors) {
      updatedFilters.push({
        id: 'color',
        name: 'Color',
        options: colors.map((item) => ({
          key: item._id,
          value: item._id,
          label: item.name,
          checked: colorId ? colorId.split(',').includes(item._id) : false,
        })),
      });
    }
    if (category) {
      updatedFilters.push({
        id: 'category',
        name: 'Category',
        options: category.map((item) => ({
          key: item._id,
          value: item._id,
          label: item.name,
          checked: categoryId
            ? categoryId.split(',').includes(item._id)
            : false,
        })),
      });
    }

    updatedFilters.push({
      id: 'size',
      name: 'Size',
      options: [
        {
          value: 'X',
          label: 'X',
          checked: size ? size.split(',').includes('X') : false,
        },
        {
          value: 'XL',
          label: 'XL',
          checked: size ? size.split(',').includes('XL') : false,
        },
        {
          value: 'S',
          label: 'S',
          checked: size ? size.split(',').includes('S') : false,
        },
        {
          value: 'M',
          label: 'M',
          checked: size ? size.split(',').includes('M') : false,
        },
        {
          value: 'L',
          label: 'L',
          checked: size ? size.split(',').includes('L') : false,
        },
      ],
    });

    setFormState(updatedFilters);
  }, [colors, category, searchParams]);

  const handleSortClick = (value) => {
    setSelectedSort(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCallFilterData(true);

    const formData = new FormData(event.target);
    const selectedFilters = formState.reduce((acc, section) => {
      acc[section.id] = formData.getAll(`${section.id}[]`);
      return acc;
    }, {});

    const filterData = {
      page: page,
      ...(selectedFilters.category && { categoryId: selectedFilters.category }),
      ...(selectedFilters.color && {
        colorId: selectedFilters.color.join(','),
      }),
      ...(selectedFilters.size && { size: selectedFilters.size.join(',') }),
      sortBy: selectedSort,
    };

    setSearchParams({
      page: page,
      ...(selectedFilters.category && {
        categoryId: selectedFilters.category.join(','),
      }),
      ...(selectedFilters.color && {
        colorId: selectedFilters.color.join(','),
      }),
      ...(selectedFilters.size && { size: selectedFilters.size.join(',') }),
      sortBy: selectedSort,
    });
    console.log(filterData);
    dispatch(filterProducts({ filterData }));
  };

  const sortProducts = (products) => {
    return products.slice().sort((a, b) => {
      if (selectedSort === 'low_to_high') {
        return a.price - b.price;
      } else if (selectedSort === 'high_to_low') {
        return b.price - a.price;
      } else {
        return 0;
      }
    });
  };

  const renderProducts = (productList) => (
    <>
      {sortProducts(productList).map((product) => (
        <ProductCard key={product._id} sdata={product} />
      ))}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );

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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
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
              {loading ? (
                <Spinner />
              ) : !isCallFilterData ? (
                products && products.length > 0 ? (
                  renderProducts(products)
                ) : (
                  <div className="mr-24 mt-20">
                    <h1 className="text-3xl">Products are not available</h1>
                  </div>
                )
              ) : filterProduct && filterProduct.length > 0 ? (
                sortProducts(filterProduct).map((product) => (
                  <ProductCard key={product._id} sdata={product} />
                ))
              ) : (
                <div className="mr-24 mt-20">
                  <h1 className="text-3xl">
                    Filtered products are not available
                  </h1>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductPage;
