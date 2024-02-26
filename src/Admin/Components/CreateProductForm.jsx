import { Button, Grid, TextField, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useEffect, useState } from "react";
import { api } from "../../config/apiConfig";
import { getAccessToken, getUserId } from "../../utils/authUtils";

function CreateProductForm() {
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    images: [""],
    description: "",
    price: 0,
    discount: 0,
    categoryIds: [""],
    variations: [
      {
        id: "",
        parentId: "",
        title: "",
        description: "",
        thumb: "",
        color: "",
        size: "",
        quantity: 0,
      },
    ],
    status: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "categoryIds" || e.target.name === "images") {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value.split(","),
      });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleVariationChange = (e, index) => {
    const newVariations = [...productData.variations];
    newVariations[index][e.target.name] = e.target.value;
    setProductData({ ...productData, variations: newVariations });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProduct({ data: productData });
      if (response && response.success) {
        console.log("Sản phẩm add thành công:", response.product);
      } else {
        console.log("Failed to add product");
      }
    } catch (error) {
      console.error("Lỗi khi add sản phẩm:", error);
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
            <TextField
              fullWidth
              label="Image"
              name="image"
              value={productData.image}
              onChange={handleChange}
            />
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
            <TextField
              fullWidth
              label="Category IDs"
              name="categoryIds"
              value={productData.categoryIds}
              onChange={handleChange}
            />
          </Grid>

          {/* Variations */}
          {productData.variations.map((variation, index) => (
            <Grid container item spacing={3} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ID"
                  name="id"
                  value={variation.id}
                  onChange={(event) => handleVariationChange(event, index)}
                />
              </Grid>
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

async function createProduct({ data }) {
  try {
    const response = await api.post("/product", data, {
      headers: {
        authorization: getAccessToken(),
        "x-client-id": getUserId(),
      },
    });
    console.log("API Response:", response);

    if (response.status === 200) {
      return { success: true, product: response.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Lỗi khi fetching dữ liệu:", error);
    console.error("Error details:", error.response);
    return { success: false };
  }
}

export default CreateProductForm;
