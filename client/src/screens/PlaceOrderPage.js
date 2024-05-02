import React from "react";

function PlaceOrderPage() {
  return (
    <div className="relative bottom-0 grid h-full w-full bg-slate-100 px-2 md:grid-cols-2 md:px-10">
      <div className="flex flex-col gap-y-8 p-4">
        <h2 className="text-xl font-semibold">Delivery</h2>
        <div className="space-y-2">
          <input
            type="number"
            name="phone"
            placeholder="Mobile Number"
            className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <h2 className="text-xl font-semibold">Delivery</h2>
        <div className="space-y-2">
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  placeholder="First Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  placeholder="Last Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <input
                  type="text"
                  name="City"
                  id="city"
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
                  placeholder="Pincode"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <select
              name="State"
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
          <div className="mb-5">
            <select
              name="country"
              className="w-full rounded-md border border-[#e0e0e0] bg-white px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="IND">India</option>
              <option value="USA">United States</option>
            </select>
          </div>
        </div>
      </div>

      {/* Side box */}
      <div className="h-screen w-full pt-5">
        <div className="select-none overflow-x-auto border border-black bg-white  text-black">
          <div className="overflow-x-auto">
            <table className="min-w-full whitespace-nowrap text-left text-sm">
              <thead className="border-b-2 border-t uppercase tracking-wider">
                <tr>
                  <th
                    colSpan="2"
                    className="border-b px-6 py-4 text-center text-xl "
                  >
                    Order Summary
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b ">
                  <td className="border-x px-6 py-4 font-semibold">ITEMS</td>
                  <td className="border-x px-6 py-4 ">₹129.99</td>
                </tr>

                <tr className="border-b ">
                  <td className="border-x px-6 py-4 font-semibold">SHIPPING</td>
                  <td className="border-x px-6 py-4 ">₹89.50</td>
                </tr>

                <tr className="border-b ">
                  <td className="border-x px-6 py-4 font-semibold">TAX</td>
                  <td className="border-x px-6 py-4 ">₹10</td>
                </tr>

                <tr className="border-b ">
                  <td className="border-x px-6 py-4 font-semibold">TOTAL</td>
                  <td className="border-x px-6 py-4 ">₹449.99</td>
                </tr>
                <tr className="border-b ">
                  <td colSpan={2} className="w-full border-x px-6 py-4">
                    <button className="w-full rounded-xl bg-orange-500 px-4 py-2 text-base text-white">
                      Payment
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
