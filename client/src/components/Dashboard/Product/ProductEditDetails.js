import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImagePreview from '../Utils/ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  getCategory,
  getColors,
  getSingleProducts,
  updateProduct,
} from '../../../features/dashboardSlice';
import { toast } from 'react-toastify';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';

function ProductEditDetails({ id, edit }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    size: '',
    price: '',
    stock: '',
    mainImage: null,
    mainImageName: '',
    category: '',
    color: '',
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imagePreview, setImagePreview] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { categories, colors, SuccessMsg, error, singleProduct } = useSelector(
    (state) => state.dashboard
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(productData);

  useEffect(() => {
    if (id !== 'new') {
      dispatch(getColors());
      dispatch(getCategory());
      dispatch(getSingleProducts({ id }));
    }
<<<<<<< Updated upstream
  }, [id, dispatch]);
=======
  }, [id]);
>>>>>>> Stashed changes

  useEffect(() => {
    if (id !== 'new' && edit == 'true') {
      if (singleProduct) {
        setProductData({
          name: singleProduct.name,
          description: singleProduct.description,
          size: singleProduct.size,
          price: singleProduct.price,
          stock: singleProduct.stock,
<<<<<<< Updated upstream
          stock: singleProduct.stock,
=======
>>>>>>> Stashed changes
          mainImage: singleProduct.mainImage,
          mainImageName: singleProduct.mainImage?.public_id,
          category: singleProduct.category,
          color: singleProduct.color,
        });
<<<<<<< Updated upstream
=======
        try {
          const contentState = convertFromRaw(
            JSON.parse(singleProduct.description)
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        } catch (error) {
          console.error('Error parsing description JSON:', error);
          setEditorState(() => EditorState.createEmpty());
        }
>>>>>>> Stashed changes
      }
    }
  }, [singleProduct]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log(productData);

    if (name === 'mainImage' && files && files.length > 0) {
      const file = files[0];
      setProductData((prevData) => ({
        ...prevData,
        mainImage: file,
        mainImageName: file.name,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      k;
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(productData);

    if (id != 'new' && edit != 'true') {
      navigate(`./?id=${id}&edit=true`);
    }

    if (id == 'new' && edit != 'true') {
      navigate('./');
    }

    if (id != 'new' && edit == 'true') {
      dispatch(updateProduct({ productData, id }));
      console.log(SuccessMsg);
      if (SuccessMsg !== null) {
        toast.success(SuccessMsg);
        navigate('./');
      }
      toast.error(error);
    }

    if (id == 'new' && edit == 'true') {
      dispatch(addProduct({ productData }));
      toast.success('Product added successfully');
      navigate('./');
    }
  };

  const handleClearImage = () => {
    setProductData((prevData) => ({
      ...prevData,
      mainImage: null,
      mainImageName: '',
    }));
    setImagePreview(null);
    setIsPreviewVisible(false);
  };

  const inputFields = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Name',
      placeholder: 'Product Name',
    },
    {
      id: 'description',
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Product Description',
      defaultValue: 'description',
    },
    {
      id: 'size',
      name: 'size',
      type: 'text',
      label: 'Size - (S, M, XL)',
      placeholder: 'Product Size',
    },
    {
      id: 'price',
      name: 'price',
      type: 'number',
      label: 'Price',
      placeholder: 'Product Price',
    },
    {
      id: 'stock',
      name: 'stock',
      type: 'number',
      label: 'Stock',
      placeholder: 'Product Stock',
    },
  ];

  const handleEditorChange = (state) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    setProductData((prevProductData) => ({
      ...prevProductData,
      description: JSON.stringify(rawContentState),
    }));
  };

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-10">
          {inputFields.map((field) => (
            <div className="flex flex-col" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              {field.type === 'textarea' ? (
                <div className="min-h-52 rounded-md border border-gray-400 bg-transparent px-2 py-2">
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                      options: [
                        'inline',
                        'blockType',
                        'list',
                        'textAlign',
                        'link',
                        'history',
                      ],
                      inline: {
                        options: ['bold', 'italic', 'underline'],
                      },
                      blockType: {
                        options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
                      },
                    }}
                  />
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="h-10 rounded-md border border-gray-400 px-2 py-2 text-base"
                  value={productData[field.name] || ''}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}
          <div className="flex w-full flex-col">
            <label htmlFor="mainImage">Main Image</label>
            {!productData.mainImage ? (
              <input
                type="file"
                id="mainImage"
                name="mainImage"
                placeholder="Product Main Image"
                className="flex h-10 w-full items-center justify-start rounded-md border border-gray-400 px-2 py-2 text-base"
                onChange={handleInputChange}
              />
            ) : (
              <div className="flex h-10 w-full items-center justify-center rounded-md px-2 ">
                <h1 className="w-full">
                  {productData.mainImage.public_id
                    ? productData.mainImage.public_id
                    : productData.mainImageName}
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
                  productData.mainImage.secure_url
                    ? productData.mainImage.secure_url
                    : imagePreview
                }
                onClose={() => setIsPreviewVisible(false)}
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-x-3">
            <div className="flex w-1/2 flex-col">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="h-10 rounded-md border border-gray-400 bg-transparent px-2 py-2 text-base"
                value={productData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select
                </option>
                {categories &&
                  categories.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="color">Color</label>
              <select
                id="color"
                name="color"
                className="h-10 rounded-md border border-gray-400 bg-transparent px-2 py-2 text-base"
                value={productData.color}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select color
                </option>
                {colors &&
                  colors.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  ))}
              </select>
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
              {edit ? 'Publish' : 'Edit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductEditDetails;
