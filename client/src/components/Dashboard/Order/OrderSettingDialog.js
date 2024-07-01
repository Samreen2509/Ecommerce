import React from 'react';

function OrderSettingDialog({ id, status, title }) {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <form>
          <div>
            <label for="status">Status</label>
            <select>
              <option>Pending</option>
              <option>Completed</option>
              <option>Canceled</option>
            </select>
          </div>
          <div>
            <label for="payment">Payment</label>
            <div>Complered</div>
          </div>
        </form>
      </div>
    </>
  );
}

export default OrderSettingDialog;
