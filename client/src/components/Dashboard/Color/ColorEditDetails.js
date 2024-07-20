import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  getSingleColor,
  updateColor,
  addColor,
} from '../../../features/colorSlice';

function ColorEditDetails({ id, edit }) {
  const dispatch = useDispatch();
  const [colorData, setColorData] = useState({
    name: '',
    hexCode: '',
  });
  const { singleColor } = useSelector((state) => state.color);

  const navigate = useNavigate();
  useEffect(() => {
    if (id == 'new' && edit == 'false') {
      navigate('./');
    }
    if (id !== 'new') {
      dispatch(getSingleColor({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleColor) {
      setColorData({
        name: singleColor.name,
        hexCode: singleColor.hexCode,
      });
    }
  }, [singleColor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setColorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (id != 'new' && edit != 'true') {
      navigate(`./?id=${id}&edit=true`);
    }

    if (id == 'new' && edit != 'true') {
      navigate('./');
    }

    if (id != 'new' && edit == 'true') {
      dispatch(updateColor({ id, colorData }));
      navigate('./');
    }

    if (id == 'new' && edit == 'true') {
      console.log(colorData);
      dispatch(addColor({ colorData }));
      navigate('./');
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-10">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Color Name"
              className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
              value={colorData?.name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="hexCode">HexCode (#00000)</label>
            <div>
              <input
                type="text"
                id="hexCode"
                name="hexCode"
                placeholder="Color Hex Code"
                value={colorData.hexCode}
                className="flex h-10 flex-1 items-center justify-start rounded-md border border-gray-400 px-2 py-2 text-base"
                onChange={handleInputChange}
              />
              <div
                className="mx-3 flex h-full w-20 cursor-pointer items-center justify-center rounded-md"
                style={{ backgroundColor: colorData.hexCode }}
              ></div>
            </div>
          </div>
          <div className="my-5 flex items-center justify-start gap-x-3">
            <div className="flex h-10 w-36 cursor-pointer items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200">
              <Link
                to="./"
                className="flex h-full w-full items-center justify-center"
              >
                Cancel
              </Link>
            </div>
            <button
              type="submit"
              className="flex h-10 w-36 cursor-pointer items-center justify-center rounded-md border border-gray-800 bg-gray-800 text-white hover:border-gray-700 hover:bg-gray-700"
            >
              {edit == 'true' ? 'Publish' : 'Edit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ColorEditDetails;
