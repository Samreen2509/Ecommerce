import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, getAllProducts } from '../../features/productSlice';
import { getAllCategory } from '../../features/categorySlice';
import { getAllColor } from '../../features/colorSlice';
import { MobileFiltersDialog, ProductFilters } from './ProductDetailsPage';
import ProductCard from './ProductCards';
import Pagination from './Pagination';
import Spinner from '../../components/Spinner';

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
  const totalPages = 3;

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllColor());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProducts({ page }));
  }, [dispatch, page, selectedSort]);

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
    if (category) {
      updatedFilters.push({
        id: 'category',
        name: 'Category',
        options: category.map((item) => ({
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
    setIsCallFilterData(true);

    const formData = new FormData(event.target);
    const selectedFilters = formState.reduce((acc, section) => {
      acc[section.id] = formData.getAll(`${section.id}[]`);
      return acc;
    }, {});

    const filterData = {
      page: page,
      categoryId: selectedFilters.category,
      colorId: selectedFilters.color?.join(','),
      size: selectedFilters.size?.join(','),
      sortBy: selectedSort,
    };

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
        <ProductCard sdata={product} key={product._id} />
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
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <div
                            className={`${
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500'
                            } ${active ? 'bg-gray-200' : ''} block px-4 py-2 text-sm`}
                            onClick={() => handleSortClick(option.value)}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
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
                products.length ? (
                  renderProducts(products)
                ) : (
                  <div className="mr-24 mt-20">
                    <h1 className="text-3xl">Product is not available</h1>
                  </div>
                )
              ) : filterProduct.length ? (
                sortProducts(filterProduct).map((product) => (
                  <ProductCard sdata={product} key={product._id} />
                ))
              ) : (
                <div className="mr-24 mt-20">
                  <h1 className="text-3xl">Product is not available</h1>
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
