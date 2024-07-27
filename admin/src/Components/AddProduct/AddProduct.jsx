import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null); // Use null instead of false
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        let responseData;
        let formData = new FormData();
        formData.append('image', image); // Use 'image' as the fieldname

        // First upload the image
        await fetch('http://localhost:4000/api/products/upload', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => { responseData = data });

        if (responseData.success) {
            // If image upload was successful, set the image URL in product details
            let product = { ...productDetails, image: responseData.image_url };
            console.log(product);

            // Then send the product details
            await fetch('http://localhost:4000/api/products', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            })
            .then((res) => res.json())
            .then((data) => {
                data.success ? alert("Product Added") : alert("Failed");
            });
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='type here..'/>
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='type here..'/>
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='type here..'/>
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
