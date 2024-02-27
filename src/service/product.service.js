
import FormData from 'form-data';
import axios from 'axios';


const productService = {
  getAllColorOfProduct: (product) => {
    const { variations } = product;
    if (variations) {
      return variations
        .map((v) => v.color)
        .filter((value, index, self) => self.indexOf(value) === index);
    }
    return null;
  },
  getAllSizeOfProduct: (product) => {
    const { variations } = product;
    if (variations) {
      const uniqueSizes = variations.reduce((acc, curr) => {
        if (!acc.find((item) => item.name === curr.size)) {
          acc.push({ name: curr.size, inStock: curr.quantity > 0 });
        }
        return acc;
      }, []);
      return uniqueSizes;
    }
    return null;
  },

  createProduct: async (productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });
  
    try {
      const response = await axios.post("/api/products", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      if (response.status === 201) {
        return { success: true, message: "Product created successfully" };
      } else {
        return { success: false, message: "Failed to create product" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};

export default productService;
