import { Button, Grid, TextField, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useEffect, useState } from "react";
import "./createProduct.css";
// import { api } from "../../config/apiConfig";
import { getAccessToken, getUserId } from "../../utils/authUtils";
import axios, { Axios } from "axios";
import productService from "../../service/product.service";

function CreateProductForm() {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    categoryIds: [],
    images: [],
    variations: [],
  });
  const [imageUrl, setImageUrl] = useState("");

  axios
    .get("/api/categories")
    .then((response) => {
      console.log(response.data);
      setCategories(response.data);
    })
    .catch((error) => console.error(error));

  const handleChange = (event) => {
    if (event.target.name === "image") {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setProductData({ ...productData, images: [file] });
    } else if (event.target.name === "categoryIds") {
      const selectedOptions = Array.from(event.target.selectedOptions);
      const selectedValues = selectedOptions.map((option) => option.value);
      setProductData({ ...productData, categoryIds: selectedValues });
    } else {
      setProductData({
        ...productData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleVariationChange = (event, index) => {
    const newVariations = [...productData.variations];
    newVariations[index][event.target.name] = event.target.value;
    setProductData({ ...productData, variations: newVariations });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await createProduct();
    if (result.success) {
      alert("Product created successfully");
    } else {
      alert("Failed to create product: " + result.message);
    }
  };

  const createProduct = async () => {
    const formData = new FormData();
    // Append product data to formData
    for (const key in productData) {
      if (key === "images") {
        productData[key].forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else if (key === "variations") {
        productData[key].forEach((variation, index) => {
          for (const variationKey in variation) {
            formData.append(
              `variations[${index}][${variationKey}]`,
              variation[variationKey]
            );
          }
        });
      } else if (Array.isArray(productData[key])) {
        productData[key].forEach((value, index) => {
          formData.append(`${key}[${index}]`, value);
        });
      } else {
        formData.append(key, productData[key]);
      }
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Network error:", error); // Debugging line
      return { success: false, message: error.message };
    }
  };

  return (
    <Fragment>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center">
        Add New Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              name="image"
              onChange={handleChange}
            />
            <label
              htmlFor="raised-button-file"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">
              <Button variant="raised" component="span">
                Tải hình ảnh lên
              </Button>
            </label>

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Product"
                style={{ width: "200px", height: "auto" }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount"
              name="discount"
              type="number"
              value={productData.discount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={productData.status}
              onChange={handleChange}
            />
          </Grid>
          {/* Category IDs */}
          <Grid item xs={12}>
            <div style={{ width: "100%" }}>
              <label htmlFor="category-select">Category</label>
              <select
                id="category-select"
                name="categoryIds"
                value={productData.categoryIds}
                onChange={handleChange}
                multiple
                style={{ width: "100%" }}>
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </Grid>
          {/* Variations */}
          {productData.variations.map((variation, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Parent ID"
                  name="parentId"
                  value={variation.parentId}
                  onChange={(event) => handleVariationChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={variation.title}
                  onChange={(event) => handleVariationChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={variation.description}
                  onChange={(event) => handleVariationChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Thumb"
                  name="thumb"
                  value={variation.thumb}
                  onChange={(event) => handleVariationChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Color"
                  name="color"
                  value={variation.color}
                  onChange={(event) => handleVariationChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Size"
                  name="size"
                  value={variation.size}
                  onChange={(event) => handleVariationChange(event, index)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  value={variation.quantity}
                  onChange={(event) => handleVariationChange(event, index)}
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit">
              Add new Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
}

// async function createProduct({ data }) {
//   console.log("Input data:", data);
//   const formData = new FormData();
//   Object.keys(data).forEach((key) => {
//     if (key === "images" && Array.isArray(data[key])) {
//       data[key].forEach((image, index) => {
//         formData.append(`${key}[${index}]`, image);
//       });
//     } else {
//       formData.append(key, data[key]);
//     }
//   });

//   // Log the contents of the FormData object
//   for (let [key, value] of formData.entries()) {
//     console.log(`${key}: ${value}`);
//   }

//   try {
//     const response = await api.post("/product", formData, {
//       headers: {
//         authorization: getAccessToken(),
//         "x-client-id": getUserId(),
//       },
//     });
//     console.log("API Response:", response);

//     if (response.status >= 200 && response.status < 300) {
//       return { success: true, product: response.data };
//     } else {
//       console.error("Unexpected response status:", response.status);
//       return { success: false };
//     }
//   } catch (error) {
//     console.error("Error when fetching data:", error);
//     if (error.response) {
//       console.error("Error details:", error.response);
//       if (error.response.status === 404) {
//         console.error("Could not find category id:", error.response.data);
//       }
//     }
//     return { success: false }; // Ensure a value is returned in case of error
//   }
// }

// async function createProduct({ data }) {
//   console.log('Input data:', data);

//   try {
//     const response = await api.post("/product", data, {
//       headers: {
//         authorization: getAccessToken(),
//         "x-client-id": getUserId(),
//         'Content-Type': 'application/json',
//       },
//     });
//     console.log("API Response:", response);

//     if (response.status >= 200 && response.status < 300) {
//       return { success: true, product: response.data };
//     } else {
//       console.error("Unexpected response status:", response.status);
//       return { success: false };
//     }
//   } catch (error) {
//     console.error("Error when fetching data:", error);
//     if (error.response) {
//       console.error("Error details:", error.response);
//       if (error.response.status === 404) {
//         console.error("Could not find category id:", error.response.data);
//       }
//     }
//     return { success: false };
//   }
// }

export default CreateProductForm;
