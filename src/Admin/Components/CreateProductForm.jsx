import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

function CreateProductForm() {
  const dispath = useDispatch();
  const [productData, setProductData] = useState({
    imageUrl:"", 
    brand:"", 
    title:"", 
    color:"", 
    discountedPrice:"", 
    price:"", 
    discountPersent:"", 
    size:initialSizes,
    quantity:"", 
    topLevelCategory:"", 
    secondLevelCategory:"",
    thirdLevelCategory:"",
    description:"",
  });
 
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name==="size_quantity"?name="quantity":name=e.target.name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispath(createProduct({ data: productData, jwt }));
    console.log(productData);
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
              label="Image URL"
              name="imageURl"
              value={productData.imageURl}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
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
              label="Discount Percentage"
              name="discountPresent"
              type="number"
              value={productData.discountPersent}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category">
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category">
                <MenuItem value="men">Clothing</MenuItem>
                <MenuItem value="women">Brand</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category">
                <MenuItem value="men">Tops</MenuItem>
                <MenuItem value="women">Dresses</MenuItem>
                <MenuItem value="men">T-shirt</MenuItem>
                <MenuItem value="women">Saree</MenuItem>
                <MenuItem value="women">Lengha Choli</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              multiline
              label="Description"
              name="description"
              rows={3}
              value={productData.description}
              onChange={handleChange}
            />
          </Grid>
          {productData.size.map((size, index) => (
            <Grid container item spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Size Name"
                  name="name"
                  value={size.name}
                  onChange={(event) => handleSizeChange(event, index)}
                  required
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

export default CreateProductForm;
