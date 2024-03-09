import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/apiConfig";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import cln from "classnames";
import Pagination from "../../nComponent/Pagination";
// import { current } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import "./Product.css";

const sortOptions = [
  { name: "default", value: "name,asc" },
  { name: "Đánh giá cao nhất", value: "id" },
  { name: "Mới nhất", value: "name,desc" },
  { name: "Price: Thấp đến cao", value: "price,asc" },
  { name: "Price: Cao đến thấp", value: "price,desc" },
];
const cl = cln.bind();

const getAllColorOrSizeOfProducts = (products, type) => {
  if (products) {
    let all = [];
    // Duyệt qua mảng sản phẩm
    products.forEach((product) => {
      product.variations.forEach((variation) => {
        if (!all.includes(variation[type])) {
          all.push(variation[type]);
        }
      });
    });
    return all;
  }
};
const queryInitialState = {
  page: 0,
  size: 6,
  sort: null,
  categoryId: null,
  keySearch: null,
  color: null,
  sizee: null,
  minPrice: null,
  maxPrice: null,
};
export default function Product() {
  const inputRef = useRef();

  const [query, setQuery] = useState(queryInitialState);

  const [totalPage, setTotalPage] = useState(null);
  // const [price, setPrice] = useState({ minPrice: null, maxPrice: null })

  console.log("query", query);

  const [products, setProducts] = useState([]);
  const [categories, setCategoties] = useState();
  console.log("products", products);
  // const [selectCate, setSelectCate] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      const a = await api.get("/category");
      const child = a.data.data.filter((v) => v.parentId !== null);
      const parent = a.data.data.filter((v) => v.parentId === null);
      setCategoties(
        parent.map((v) => ({
          ...v,
          child: child.filter((c) => c.parentId === v.id),
        }))
      );
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let params = Object.keys(query)
        .filter((key) => query[key])
        .map((key) => `${key}=${query[key]}`)
        .join("&");
      console.log("params", params);
      params = params ? `?${params}` : null;

      try {
        const a = await api.get(`/product${params}`);
        console.log("data", a);
        const data = a.data;
        const option = {
          page: data.data.currentPage,
          size: data.data.pageSize,
          totalPage: data.data.totalPage,
        };

        console.log("option", option);
        console.log(data.data.content);

        setQuery((prev) => ({ ...prev, page: option.page, size: option.size }));
        setTotalPage(option.totalPage);
        setProducts(data.data.content);
      } catch (error) {
        toast(error.respone);
      }
    };
    fetchData();
  }, [...Object.keys(query).map((key) => query[key])]);

  // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const navigate = useNavigate();

  const handlClickToProductDetail = (product) => {
    navigate(`/product/${product.id}`);
  };
  const hanglePaginationChange = ({ page, pageSize }) => {
    setQuery((prev) => ({ ...prev, page: page - 1, size: pageSize }));
  };

  return (
    <div className="bg-white ">
      <div>
        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <div className="relative text-gray-600 flex justify-center items-center">
              <input
                ref={inputRef}
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    keySearch: e.target.value === "" ? null : e.target.value,
                    page: 0,
                  }))
                }
                value={!query?.keySearch ? "" : query?.keySearch}
                type="search"
                placeholder="Search"
                className="bg-white h-10 px-5 pr-10 border border-black/25 rounded-full text-sm focus:outline-none focus-within:border-blue-500 transition-transform duration-300"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4">
                <IoIosSearch />
              </button>
            </div>

            <div className="flex items-center">
              <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
                className="w-full">
                <InputLabel id="demo-select-small-label">Lọc</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={query?.sort}
                  label="size"
                  onChange={(e) =>
                    setQuery((prev) => ({
                      ...prev,
                      sort: e.target.value === "" ? null : e.target.value,
                      page: 0,
                    }))
                  }>
                  {sortOptions.map(({ name, value }) => (
                    <MenuItem key={name} value={value}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                // onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Bộ sưu tập
            </h1>
            <div className="flex space-x-6 mt-5 mb-1">
              <h1
                className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-1 px-3 rounded"
                // variant="contained"
                size="small"
                onClick={() =>
                  setQuery((prev) => ({
                    ...queryInitialState,
                    page: prev.page,
                    size: prev.size,
                  }))
                }>
                Tất cả sản phẩm
              </h1>
            </div>
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  <div>
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      sx={{
                        height: 240,
                        flexGrow: 1,
                        maxWidth: 400,
                        overflowY: "auto",
                      }}
                      onNodeSelect={(e, node) =>
                        setQuery((prev) => ({
                          ...prev,
                          categoryId: node,
                          page: 0,
                        }))
                      }
                      defaultChecked={query?.categoryId}>
                      {categories &&
                        categories.map((v) => (
                          <TreeItem
                            key={v.id}
                            nodeId={v.id}
                            label={
                              <p
                                className={cl({
                                  "text-red-500": query?.categoryId === v.id,
                                })}>
                                {v.title}
                              </p>
                            }>
                            {v.child &&
                              v.child.map((c) => (
                                <TreeItem
                                  key={c.id}
                                  nodeId={c.id}
                                  label={
                                    <p
                                      className={cl({
                                        "text-red-500":
                                          query?.categoryId === c.id,
                                      })}>
                                      {c.title}
                                    </p>
                                  }></TreeItem>
                              ))}
                          </TreeItem>
                        ))}
                    </TreeView>
                  </div>
                </ul>

                {/* color size price */}
                <div className="mt-3 bg-white shadow p-6 rounded-lg">
                  <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    size="small"
                    className="w-full">
                    <InputLabel
                      className="text-gray-700"
                      id="demo-select-small-label">
                      Color
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={query?.color}
                      label="Color"
                      onChange={(e) =>
                        setQuery((prev) => ({
                          ...prev,
                          color: e.target.value === "" ? null : e.target.value,
                          page: 0,
                        }))
                      }>
                      <MenuItem value="">none</MenuItem>
                      {products &&
                        getAllColorOrSizeOfProducts(products, "color").map(
                          (v) => (
                            <MenuItem
                              key={v}
                              value={v}
                              style={{ background: v }}>
                              {v}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  </FormControl>
                </div>
                <div className="mt-3 bg-white shadow p-6 rounded-lg">
                  <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    size="small"
                    className="w-full">
                    <InputLabel id="demo-select-small-label">size</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={query?.sizee}
                      label="size"
                      onChange={(e) =>
                        setQuery((prev) => ({
                          ...prev,
                          sizee: e.target.value === "" ? null : e.target.value,
                          page: 0,
                        }))
                      }>
                      <MenuItem value="">none</MenuItem>
                      {products &&
                        getAllColorOrSizeOfProducts(products, "size").map(
                          (v) => (
                            <MenuItem
                              key={v}
                              value={v}
                              style={{ background: v }}>
                              {v}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  </FormControl>
                </div>
                <div className="mt-3 bg-white shadow p-6 rounded-lg">
                  <div className="flex space-x-4">
                    <TextField
                      id="outlined-number"
                      onChange={(e) =>
                        setQuery((prev) => ({
                          ...prev,
                          minPrice:
                            e.target.value !== null
                              ? Number(e.target.value)
                              : null,
                          page: 0,
                        }))
                      }
                      value={query?.minPrice ? query.minPrice : ""}
                      label="min price (d)"
                      type="number"
                      size="small"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <span> - </span>
                    <TextField
                      id="outlined-number"
                      onChange={(e) => {
                        console.log("test", e.target.value);
                        setQuery((prev) => ({
                          ...prev,
                          maxPrice:
                            e.target.value !== null
                              ? Number(e.target.value)
                              : null,
                          page: 0,
                        }));
                      }}
                      value={query.maxPrice ? query.maxPrice : ""}
                      size="small"
                      label="max price (d)"
                      type="number"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex justify-center"></div>
                </div>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 w-full bg-gray-100 rounded-lg shadow-md">
                <div className="flex flex-wrap justify-center bg-white px-4 rounded-lg shadow-inner">
                  {products && products.length !== 0 ? (
                    products.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handlClickToProductDetail(item)}
                        className="m-4 cursor-pointer transform hover:scale-105 transition-transform duration-200">
                        <ProductCard product={item} />
                      </div>
                    ))
                  ) : (
                    <h1 className="text-gray-600 font-semibold text-2xl">
                      no product with:
                      {Object.keys(query)
                        .map((key) => `${key}=${query[key]}`)
                        .join("\n")}
                    </h1>
                  )}
                </div>
                <div className="flex items-center justify-end bg-white p-4 rounded-lg mt-4 shadow-inner">
                  <Pagination
                    className="shadow-md text-gray-700 hover:text-gray-900 active:text-gray-500 bg-white rounded-lg"
                    pageSizelist={[6, 9, 12]}
                    page={query.page + 1}
                    onChange={hanglePaginationChange}
                    totalPage={totalPage}
                    pageSize={query.size}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
