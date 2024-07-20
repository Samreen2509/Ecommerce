import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImagePreview from '../Utils/ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleUser,
  addUser,
  updateUser,
  updateAvatar,
} from '../../../features/userSlice';

function UserEditDetails({ id, edit }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
    newPassword: '',
    avatar: null,
  });
  const [avatarData, setAvatarData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { singleUser, newUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getSingleUser({ id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleUser) {
      setUserData({
        name: singleUser.name,
        username: singleUser.username,
        email: singleUser.email,
        role: singleUser.role,
        newPassword: '',
        password: '',
        avatar: singleUser.avatar,
      });
    }
  }, [singleUser]);

  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const { name, value, files } = e.target;
    const file = files[0];
    setAvatarData((prevData) => ({
      ...prevData,
      image: file,
      imageName: file.name,
    }));

    setUserData({
      avatar: null,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
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
      dispatch(updateUser({ id, userData }));
      if (avatarData) {
        dispatch(updateAvatar({ id, avatarData }));
      }
      navigate('./');
    }

    if (id == 'new' && edit == 'true') {
      dispatch(addUser({ userData }));
      if (avatarData) {
        const id = newUser._id;
        dispatch(updateAvatar({ id, avatarData }));
      }
      navigate('./');
    }
  };

  const handleClearImage = () => {
    setUserData((prevData) => ({
      ...prevData,
      avatar: null,
    }));

    setAvatarData(null);
    setImagePreview(null);
    setIsPreviewVisible(false);
  };

  const inputFields = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Name',
    },

    {
      id: 'username',
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Username',
    },
    {
      id: 'email',
      name: 'email',
      type: 'text',
      label: 'Email',
      placeholder: 'email',
    },
    {
      id: 'role',
      name: 'role',
      type: 'select',
      label: 'Role',
      placeholder: 'Role',
    },
    {
      id: 'password',
      name: 'password',
      type: 'text',
      label: 'Password',
      placeholder: 'Password',
    },
    {
      id: 'newPassword',
      name: 'newPassword',
      type: 'text',
      label: 'New Password',
      placeholder: 'New Password',
    },
  ];

  const userRole = [{ name: 'USER' }, { name: 'ADMIN' }];

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-10">
          {inputFields.map((field) =>
            (id === 'new' && edit === 'true' && field.name === 'newPassword') ||
            (id !== 'new' && field.id === 'password') ? null : (
              <div className="flex flex-col" key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                {field.type == 'select' ? (
                  <select
                    id={field.id}
                    name={field.name}
                    className="h-10 rounded-md border border-gray-400 bg-transparent px-2 py-2 text-base"
                    value={userData.role}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {userRole &&
                      userRole.map((item, index) => (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
                    value={userData[field.name] || ''}
                    onChange={handleInputChange}
                    disabled={id !== 'new' && edit !== 'true'}
                  />
                )}
              </div>
            )
          )}

          <div className="flex w-full flex-col">
            <label htmlFor="image">Avatar</label>
            {!userData?.avatar && !avatarData ? (
              <input
                type="file"
                id="image"
                name="image"
                placeholder="User Main Image"
                className="flex h-10 w-full items-center justify-start rounded-md border border-gray-400 px-2 py-2 text-base"
                onChange={handleAvatarChange}
              />
            ) : (
              <div className="flex h-10 w-full items-center justify-center rounded-md px-2 ">
                <h1 className="w-full">
                  {userData?.avatar?.public_id
                    ? userData.avatar.public_id
                    : avatarData.imageName}
                </h1>
                <div
                  onClick={handleClearImage}
                  className="mx-3 flex h-full w-20 cursor-pointer items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200"
                >
                  Clear
                </div>
                <div
                  onClick={() => setIsPreviewVisible(true)}
                  className="flex h-full w-20 cursor-pointer items-center justify-center rounded-md border-gray-400 bg-gray-800 text-white hover:bg-gray-700"
                >
                  View
                </div>
              </div>
            )}
            {isPreviewVisible && (
              <ImagePreview
                image={
                  userData?.avatar?.secure_url
                    ? userData.avatar.secure_url
                    : imagePreview
                }
                onClose={() => setIsPreviewVisible(false)}
              />
            )}
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

export default UserEditDetails;
