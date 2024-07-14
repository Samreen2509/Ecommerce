import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';

import { filterProducts } from '../../features/productSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ProductCard from './ProductCards.js';
import { getAllCategory } from '../../features/categorySlice.js';
import { getAllColor } from '../../features/colorSlice.js';
import Spinner from '../../components/Spinner.js';
import Shimmer from '../../components/Loading/Shimmer.js';

const sortOptions = [
  {
    name: 'Price: Low to High',
    value: 'low_to_high',
  },
  {
    name: 'Price: High to Low',
    value: 'high_to_low',
  },
];

function ProductFilters({ formState, handleSubmit }) {
  return (
    <form className="hidden w-72 lg:block" onSubmit={handleSubmit}>
      <h3 className="sr-only">Categories</h3>
      {formState.map((section) => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      <button
        type="submit"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Apply Filters
      </button>
    </form>
  );
}

function MobileFiltersDialog({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  formState,
  handleSubmit,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <ProductFilters
                formState={formState}
                handleSubmit={handleSubmit}
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

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
  console.log(filterProduct);
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
                          <a
                            href="#"
                            className={`${
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500'
                            } ${
                              active ? 'bg-gray-200' : ''
                            } block px-4 py-2 text-sm`}
                            onClick={() => handleSortClick(option.value)}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
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

export { ProductFilters, MobileFiltersDialog, ProductDetailsPage };
