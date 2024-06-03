import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAddressId,
  getAddress,
  getSelectAddress,
} from '../../features/orderSlice';

function OrderAddressPage() {
  const [userData, setUserData] = useState({
    phone: '',
    name: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    country: 'IND',
  });
  const [isNewAddress, setIsNewAddress] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.order);
  const [limitAddress, setlimitAddress] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(getAddress(userInfo._id));
    }
    if (addresses.length >= 4) {
      setlimitAddress(true);
    }
  }, [dispatch, userInfo]);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!isNewAddress) {
      const userId = userInfo._id;
      const addressData = {
        address: userData.address,
        city: userData.city,
        pincode: userData.pincode,
        state: userData.state,
        country: userData.country,
      };

      dispatch(createAddressId({ addressData, userId }));
    }
  };

  const handleSelectChange = (e) => {
    const selectedAddress = addresses.find(
      (address) => address._id === e.target.value
    );
    if (selectedAddress) {
      dispatch(getSelectAddress(selectedAddress._id));
    }
    if (selectedAddress) {
      setUserData({
        ...userData,
        ...selectedAddress,
      });

      setIsNewAddress(false);
    } else {
      setIsNewAddress(true);
      setUserData({
        phone: '',
        name: '',
        email: '',
        address: '',
        city: '',
        pincode: '',
        state: '',
        country: 'IND',
      });
    }
  };

  const handleCreateNewAddress = () => {
    const userId = userInfo._id;
    const addressData = {
      address: userData.address,
      city: userData.city,
      pincode: userData.pincode,
      state: userData.state,
      country: userData.country,
    };

    dispatch(createAddressId({ addressData, userId }));
    dispatch(getAddress(userInfo._id));
  };

  const isDisabled =
    !userData.phone ||
    !userData.name ||
    !userData.email ||
    !userData.address ||
    !userData.city ||
    !userData.pincode ||
    !userData.state;

  return (
    <div className="flex w-full justify-center gap-4 md:h-screen">
      <div className="flex w-full  flex-col gap-y-2 p-4">
        <h2 className=" text-xl font-semibold">Delivery</h2>
        <form
          onSubmit={isNewAddress ? handleCreateNewAddress : handleAddressSubmit}
          className="space-y-2"
        >
          <div className="space-y-2">
            <select
              onChange={handleSelectChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              {addresses.map((address, index) => (
                <option key={index} value={address._id}>
                  {address.address}, {address.city}, {address.state},{' '}
                  {address.country} - {address.pincode}
                </option>
              ))}
              {limitAddress ? '' : <option value="new">Add New Address</option>}
            </select>
          </div>
          {isNewAddress && (
            <>
              <div className="space-y-2">
                <input
                  type="number"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserDataChange}
                  placeholder="Mobile Number"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={userData.name}
                      onChange={handleUserDataChange}
                      placeholder="Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={userData.email}
                      onChange={handleUserDataChange}
                      placeholder="Email"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleUserDataChange}
                placeholder="Address"
                className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={userData.city}
                      onChange={handleUserDataChange}
                      placeholder="City"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <input
                      type="number"
                      name="pincode"
                      value={userData.pincode}
                      onChange={handleUserDataChange}
                      placeholder="Pincode"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5 w-full">
                <select
                  name="state"
                  value={userData.state}
                  onChange={handleUserDataChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">Select State</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
              <div className="mb-5 w-full">
                <select
                  name="country"
                  value={userData.country}
                  onChange={handleUserDataChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="IND">India</option>
                  <option value="USA">United States</option>
                </select>
              </div>
            </>
          )}
          {isNewAddress ? (
            <button
              className={`w-1/2 rounded-lg px-4 py-2 text-base text-white ${
                isDisabled ? 'bg-blue-300' : 'cursor-pointer bg-blue-500'
              }`}
              disabled={isDisabled}
              type="submit"
              onClick={() => handleCreateNewAddress()}
            >
              Create New Address
            </button>
          ) : (
            ' '
          )}
        </form>
      </div>
    </div>
  );
}

export default OrderAddressPage;
