import React from 'react';

function ImagePreview({ image, onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className=" flex h-96 w-96 flex-col items-end justify-center rounded-md border bg-white p-3">
          <button
            onClick={onClose}
            className="mb-2 h-9 rounded border border-gray-400 px-2 "
          >
            Close
          </button>
          <img
            src={image}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default ImagePreview;
