import React from "react";

function PlaceOrderPage() {
  return (
    <div className="h-full grid md:grid-cols-2 w-full md:px-10 px-2 bg-white">
      <div className="flex flex-col p-4 gap-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Shipping</h2>
          <h4 className="font-bold ">
            Address:{" "}
            <span className="font-normal">
              Iris Watson P.O. Box 283 8562 Fusce Rd. Frederick Nebraska 20620
              (372) 587-2335
            </span>
          </h4>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Payment Method</h2>
          <h4 className="font-bold ">
            Method :<span className="font-normal">Paypal</span>
          </h4>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Order Items</h2>
          <h4 className="font-bold ">
            Method :<span className="font-normal">Paypal</span>
          </h4>
        </div>
      </div>
      <div className="h-screen w-full ">
        <div className="overflow-x-auto bg-white border border-black text-black  select-none">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="uppercase tracking-wider border-b-2 border-t">
                <tr>
                  <th
                    colSpan="2"
                    className="px-6 py-4 text-center text-xl border-b "
                  >
                    Order Summary
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b ">
                  <td className="px-6 py-4 border-x font-semibold">ITEMS</td>
                  <td className="px-6 py-4 border-x ">₹129.99</td>
                </tr>

                <tr className="border-b ">
                  <td className="px-6 py-4 border-x font-semibold">SHIPPING</td>
                  <td className="px-6 py-4 border-x ">₹89.50</td>
                </tr>

                <tr className="border-b ">
                  <td className="px-6 py-4 border-x font-semibold">TAX</td>
                  <td className="px-6 py-4 border-x ">₹10</td>
                </tr>

                <tr className="border-b ">
                  <td className="px-6 py-4 border-x font-semibold">TOTAL</td>
                  <td className="px-6 py-4 border-x ">₹449.99</td>
                </tr>
                <tr className="border-b ">
                  <td colSpan={2} className="px-6 py-4 border-x ">
                    <button className="bg-orange-500 px-4 py-2 rounded-2xl text-white text-base">
                      Place Order
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
