import React from 'react';
import { Link } from 'react-router-dom';

function ProductOrder({ orderData }) {
  console.log(orderData);

  const { address, city, pincode, state, country } = orderData.address;

  return (
    <div className="mt-4 flex w-full flex-col items-start justify-center md:mt-6 md:flex-row md:items-start md:space-x-6 xl:space-x-8">
      <div className="flex w-full flex-col">
        {orderData &&
          orderData.items.map((item) => (
            <div
              key={item._id}
              className="flex w-full gap-x-10    pb-4 md:w-full md:pb-8"
            >
              <Link
                to={`/singleProduct/${item.product._id}`}
                className="w-full pb-4 md:w-96 md:pb-2"
              >
                <img
                  className="hidden w-full md:block"
                  draggable="false"
                  src={item.product.mainImage.url}
                  alt="product"
                />
                <img
                  className="w-full md:hidden"
                  src={item.product.mainImage.url}
                  alt="product"
                />
              </Link>

              <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 md:flex-row md:space-y-0">
                <div className="flex w-full flex-col items-start justify-start space-y-8">
                  <h3 className="text-xl font-semibold capitalize leading-6 text-gray-800 xl:text-2xl">
                    {item.product.name}
                  </h3>
                  <div className="flex flex-col items-start justify-start space-y-2">
                    <p className="text-lg leading-none text-gray-700">
                      <span className="text-black">Size: </span> {item.size}
                    </p>
                    <p className="text-lg leading-none text-gray-700">
                      <span className="text-black">Quantity: </span>{' '}
                      {item.quantity}
                    </p>
                    <p className="text-lg leading-none text-gray-700">
                      <span className="text-black">Price: </span>{' '}
                      {item.product.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
          <div className="flex w-full flex-col items-start justify-start space-y-8">
            <h3 className="text-xl font-semibold capitalize leading-6 text-gray-800 xl:text-2xl">
              Customer
            </h3>
            <div className="flex flex-col items-start justify-start space-y-2">
              <p className="text-sm leading-none text-gray-700">
                <span className="text-black">Email: </span>{' '}
                {orderData.customer.email}
              </p>
              <p className="text-sm leading-none text-gray-800">
                <span className="text-black">name: </span>{' '}
                {orderData.customer.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
          <div className="flex w-full flex-col items-start justify-start space-y-8">
            <h3 className="text-xl font-semibold capitalize leading-6 text-gray-800 xl:text-2xl">
              Payment
            </h3>
            <div className="flex flex-col items-start justify-start space-y-2">
              <p className="text-sm leading-none text-gray-700">
                <span className="text-black">Price: </span>{' '}
                {orderData.payment.price}
              </p>
              <p className="text-sm leading-none text-gray-800">
                <span className="text-black">Status: </span>{' '}
                {orderData.payment.status}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200 pb-8 md:flex-row md:space-y-0">
          <div className="flex w-full flex-col items-start justify-start space-y-8">
            <h3 className="text-xl font-semibold capitalize leading-6 text-gray-800 xl:text-2xl">
              Address
            </h3>
            <div className="flex flex-col items-start justify-start space-y-2">
              <p className="text-sm leading-none text-gray-700">
                {(address, city, state, pincode, country)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductOrder;
