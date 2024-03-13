import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";
import { Tab, Tabs } from "./Tab";
import { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import Pagination from "../../Custommer/nComponent/Pagination";
import classNames from "classnames";
import { api } from "../../config/apiConfig";
import { Button } from "@mui/material";

const cl = classNames.bind();

const ModalImage = ({ isVisible, onClose, onSelectImage }) => {
  const [totalPage, setTotalPage] = useState(0);
  const [selectImage, setSelectImage] = useState(null);
  const [images, setImages] = useState(null);
  const [query, setQuery] = useState({ page: 0, size: 3 });

  const fetchApi = async () => {
    let params = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join("&");
    console.log("params", params);
    params = params ? `?${params}` : "";

    const data = await api.get(`/file/image${params}`);
    const result = data.data;
    console.log("result", data);
    setQuery((prev) => ({
      ...prev,
      page: result.data.currentPage,
      size: result.data.pageSize,
    }));
    setTotalPage(result.data.totalPage);
    setImages(result.data.content);
  };

  useEffect(() => {
    if (isVisible) {
      setSelectImage(null);
      fetchApi();
    }
  }, [isVisible, query.page, query.size]);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper-modal") {
      setSelectImage(null);
      onClose();
    }
  };
  const handleUploadImage = async (file) => {
    if (!file) {
      alert("file null");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      await api.post("/file/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchApi();
      alert("upload success");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  const handleDeleteImage = async (image) => {
    if (image) {
      try {
        await api.delete(`/file/image/${image.id}`);
        setSelectImage(null);
        fetchApi();
        alert("delete success");
      } catch (error) {
        alert("delete error");
      }
    }
  };
  const handlePaginationChange = ({ page, pageSize }) => {
    setQuery((prev) => ({ ...prev, page: page - 1, size: pageSize }));
  };

  return (
    <>
      <div
        id="wrapper-modal"
        onClick={handleClose}
        className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-0 flex justify-center items-center">
        <div className="w-[90%] relative min-h-96 bg-white p-3 rounded-xl">
          <button
            onClick={() => onClose()}
            className="p-2 absolute top-1 right-1 hover:bg-bg_hover rounded-md">
            <IoCloseOutline className="w-5 h-5" />
          </button>
          <div className="w-[100%]">
            <Tabs>
              <Tab label="chon">
                <div className=" h-[70vh]">
                  <div className="flex w-[100%] space-x-5">
                    <div className="px-2 py-4 mx-auto border overflow-auto h-[70vh] w-[80%]">
                      <ul className="flex justify-center flex-wrap ">
                        {images &&
                          images.map((v) => (
                            <li
                              key={v.url}
                              onClick={() => setSelectImage(v)}
                              className={cl(
                                "m-3 border-2 rounded-lg overflow-hidden cursor-pointe drop-shadow-md",
                                {
                                  " border-blue-600 border-2":
                                    selectImage === v,
                                }
                              )}>
                              <img
                                className="w-40 h-40  object-cover"
                                src={v?.url}
                                alt=""></img>{" "}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="bg-slate-200 w-[25%] overflow-auto h-[70vh]">
                      <div className="p-2">
                        <div className="w-max mx-auto font-medium text-lg">
                          {" "}
                          chi tiết
                        </div>
                        <hr className="w-11/12 mx-auto my-2" />
                        <div className="flex justify-center items-center">
                          {selectImage && selectImage?.url && (
                            <div className="flex flex-col justify-center items-center">
                              <img
                                className={cl(
                                  "w-40 h-40 object-cover border drop-shadow-lg rounded-lg "
                                )}
                                src={selectImage?.url}
                                alt=""
                              />
                              <button
                                onClick={() => handleDeleteImage(selectImage)}
                                className="mt-2 rounded-lg bg-red-500 text-sm font-light hover:bg-opacity-85 text-white  px-3 py-1">
                                delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Pagination
                    className="shadow-md text-gray-700 hover:text-gray-900 active:text-gray-500 bg-white rounded-lg"
                    onChange={handlePaginationChange}
                    pageSizelist={[3, 6, 9]}
                    page={query.page + 1}
                    totalPage={totalPage}
                    pageSize={query.size}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      onSelectImage(selectImage);
                    }}
                    className=" rounded-lg bg-btn text-lg font-normal hover:bg-opacity-85 text-black  px-3 py-1">
                    select
                  </Button>
                </div>
              </Tab>
              <Tab label="them">
                <ImageUpload onUpload={handleUploadImage} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

ModalImage.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  onSelectImage: PropTypes.func,
};

export default ModalImage;
