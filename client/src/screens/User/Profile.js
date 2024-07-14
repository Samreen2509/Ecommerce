import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit, MdVerified } from 'react-icons/md';
import { User } from '../../features/authSlice';
import { updateAvatar, updateUser } from '../../features/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { updatedUser, isLoading } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [avatarData, setAvatarData] = useState(null);
  const [editableFields, setEditableFields] = useState({});

  useEffect(() => {
    dispatch(User());
  }, [dispatch]);

  useEffect(() => {
    if (updatedUser) {
      setProfileData({
        id: updatedUser?._id,
        name: updatedUser?.name,
        username: updatedUser?.username,
        email: updatedUser?.email,
        role: updatedUser?.role,
        newPassword: '',
        password: '',
        avatar: updatedUser?.avatar,
        emailVerified: updatedUser?.isEmailVerified,
      });
    } else {
      setProfileData({
        id: userData?._id,
        name: userData?.name,
        username: userData?.username,
        email: userData?.email,
        role: userData?.role,
        newPassword: '',
        password: '',
        avatar: userData?.avatar,
        emailVerified: userData?.isEmailVerified,
      });
    }
  }, [userData, updatedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = (name) => {
    setEditableFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleCancelClick = () => {
    setUpdateData(null);
  };

  const handleSubmitClick = () => {
    if (!isLoading) {
      if (!updateData?.password) {
        toast.error('Enter Password');
      }

      const id = profileData?.id;
      if (updateData) {
        dispatch(updateUser({ id, userData: updateData }));
        setUpdateData(null);
        setEditableFields({});
        updatedUser && toast.success('Profile Updated');
      }

      if (avatarData) {
        dispatch(updateAvatar({ id, avatarData }));
        setAvatarData(null);
        setEditableFields({});
        updatedUser && toast.success('Profile Updated');
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          avatar: { url: reader.result },
        }));
      };
      reader.readAsDataURL(file);

      setAvatarData((prevData) => ({
        ...prevData,
        image: file,
        imageName: file.name,
      }));
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const inputList = [
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
      placeholder: 'Email',
    },
    {
      id: 'newPassword',
      name: 'newPassword',
      type: 'password',
      label: 'New Password',
      placeholder: 'New Password',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Current Password',
    },
  ];

  return (
    <div className="px-80 pt-10">
      <div className="relative mb-5 cursor-pointer">
        {profileData?.avatar?.url ? (
          <div className="relative h-20 w-20 rounded-full">
            <img
              className="h-full w-full rounded-full"
              src={profileData.avatar.url}
              alt="Avatar"
            />
            <button
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-white"
              onClick={handleButtonClick}
            >
              <MdEdit size={16} />
            </button>
            {profileData?.emailVerified && (
              <div className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                <MdVerified size={16} />
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-300 text-2xl font-bold">
            {profileData?.username.charAt(0).toUpperCase()}
            <button
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-white"
              onClick={handleButtonClick}
            >
              <MdEdit size={16} />
            </button>
            {profileData?.emailVerified && (
              <div className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                <MdVerified size={16} />
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-x-10 gap-y-10">
        {inputList.map((item, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <label htmlFor={item.name} className="mr-5 w-32">
              {item.label}
            </label>
            <input
              type={item.type}
              id={item.id}
              name={item.name}
              placeholder={item.placeholder}
              className="h-10 flex-1 rounded-md border border-gray-400 px-2 py-2 text-base"
              value={profileData?.[item.name] || ''}
              onChange={handleInputChange}
              disabled={
                !editableFields?.[item.name] && item.name !== 'password'
              }
            />
            <div
              className={`${
                item.name === 'password' ? 'invisible' : ''
              } flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white ${
                updateData?.[item.name]
                  ? 'cursor-not-allowed bg-gray-600'
                  : 'bg-gray-800'
              }`}
              onClick={() => handleEditClick(item.name)}
            >
              <MdEdit />
            </div>
          </div>
        ))}
      </div>

      <div className="my-6 flex items-center justify-end gap-x-5">
        <button
          onClick={handleCancelClick}
          disabled={isLoading}
          className="flex h-11 cursor-pointer items-center justify-center rounded-md border px-5 hover:bg-primary hover:text-white"
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          onClick={handleSubmitClick}
          className="flex h-11 cursor-pointer items-center justify-center rounded-md border bg-gray-800 px-5 text-white hover:bg-primary"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
