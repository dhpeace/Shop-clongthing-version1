import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";

// find products
export const findProducts = async (dispatch) => {
  const { data } = api.get(`/api/v1/product`);
  console.log(data);
  dispatch({ type: FIND_PRODUCTS_REQUEST, payload: data.content });
};

// find products by ID
export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  try {
    const { data } = api.get(`/api/products/id/${productId}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};
