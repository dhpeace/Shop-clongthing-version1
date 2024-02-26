// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { api } from "../../config/apiConfig";
import Pagination from "@mui/material/Pagination";
import { Button, Card, CardHeader } from "@mui/material";
// import { useDispatch } from "react-redux";

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  // const dispath = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log(api);
        const response = await api.get(`/product?page=${page - 1}&size=1`);
        console.log("response", response.data);
        const products = response.data.data.content;
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetch();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // const handleProductDelete = (productId) => {
  //   dispath(deleteProduct(productId));
  // };

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Products" />
        <TableContainer
          component={Paper}
          className="w-full flex flex-row flex-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 max-h-96 overflow-y-auto">
          <Table className="w-full">
            <TableHead>
              <TableRow className="text-white bg-indigo-500">
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Image Product
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Product Name
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Price
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Description
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Color
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Size
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Quantity
                </TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) =>
                product.variations.map((variation, index) => (
                  <TableRow key={index} className="bg-white">
                    <TableCell
                      component="th"
                      scope="row"
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.price}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                      {product.description}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                      {variation.color}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                      {variation.size}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                      {variation.quantity}
                    </TableCell>

                    <TableCell align="left">
                      <Button
                        // onClick={() => handleProductDelete(product.id)}
                        variant="outlined">
                        Xoá
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Pagination count={10} page={page} onChange={handlePageChange} />
    </div>
  );
}

export default ProductsTable;
