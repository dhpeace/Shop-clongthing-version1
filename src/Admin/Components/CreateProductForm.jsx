import { Button, Grid, Select, TextField, Typography } from "@mui/material"
// eslint-disable-next-line no-unused-vars
import React, { Fragment, useEffect, useState } from "react"
import "./createProduct.css"
import { api } from "../../config/apiConfig"
import { getAccessToken, getUserId } from "../../utils/authUtils"
import axios from "axios"
import productService from "../../service/product.service"
import { TreeItem, TreeView } from "@mui/x-tree-view"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import cln from "classnames"
import ModalImage from "./ImageModal"
const cl = cln.bind()

// getCategory
const getCategory = (id, cates) => {
    for (const cate of cates) {
        if (cate.id === id) {
            return cate
        } else if (cate.child) {
            const result = getCategory(id, cate.child)
            if (result) {
                return result
            }
        }
    }
    return null
}

function CreateProductForm() {
    const [productData, setProductData] = useState({
        name: "",
        image: "",
        images: [],
        description: "",
        price: 100.0,
        priceImport: 50.0,
        categoryIds: [],
        variations: [],
        status: "",
    })

    const [visible, setVisible] = useState(false)
    const [selectImage, setSelectImage] = useState({
        id: null,
        publicId: "",
        url: "",
    })

    const [categories, setCategories] = useState([])
    const [imageUrl, setImageUrl] = useState("")
    const [currentVariation, setCurrentVariation] = useState({
        color: "",
        size: "",
        quantity: 0,
    })
    const [variations, setVariations] = useState([])

    const addVariation = () => {
        const newVariations = [...variations, currentVariation]
        setVariations(newVariations)
        setProductData({ ...productData, variations: newVariations })
        setCurrentVariation({ color: "", size: "", quantity: 0 })
    }

    useEffect(() => {
        const fetch = async () => {
            const a = await api.get("/category")
            const child = a.data.data.filter((v) => v.parentId !== null)
            const parent = a.data.data.filter((v) => v.parentId === null)
            setCategories(
                parent.map((v) => ({
                    ...v,
                    child: child.filter((c) => c.parentId === v.id),
                }))
            )
        }
        fetch()
    }, [])
    console.log("catessss", categories)
    console.log("product", productData)

    const handleChange = (event) => {
        if (event.target.name === "image") {
            const file = event.target.files[0]
            const url = URL.createObjectURL(file)
            setImageUrl(url)
            setProductData({ ...productData, images: [file] })
        } else if (event.target.name === "categoryIds") {
            const selectedOptions = Array.from(event.target.selectedOptions)
            const selectedValues = selectedOptions.map((option) => option.value)
            setProductData({ ...productData, categoryIds: selectedValues })
        } else {
            setProductData({
                ...productData,
                [event.target.name]: event.target.value,
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await createProduct()
        if (result.success) {
            alert("Product created successfully")
        } else {
            alert("Failed to create product: " + result.message)
        }
    }

    const handleVariationChange = (e) => {
        setCurrentVariation({
            ...currentVariation,
            [e.target.name]: e.target.value,
        })
    }
    const handleSelectImage = (image) => {
        setVisible(!visible)
        setSelectImage(image)
        console.log("select image", image)
    }
    const createProduct = async () => {
        const formData = new FormData()
        for (const key in productData) {
            if (key === "images") {
                productData[key].forEach((image, index) => {
                    formData.append(`images[${index}]`, image)
                })
            } else if (key === "variations") {
                // Stringify the variations array
                formData.append(key, JSON.stringify(productData[key]))
            } else if (Array.isArray(productData[key])) {
                productData[key].forEach((value, index) => {
                    formData.append(`${key}[${index}]`, value)
                })
            } else {
                formData.append(key, productData[key])
            }
        }

        axios
            .post("/product", formData)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = response.data
                return { success: true, data }
            })
            .catch((error) => {
                console.error("Network error:", error)
                return { success: false, message: error.message }
            })
    }

    return (
        <Fragment>
            <ModalImage isVisible={visible} onClose={() => setVisible(false)} onSelectImage={handleSelectImage} />
            <div className="py-5 ml-16 text-xl font-bold">Add New Product</div>
            <form onSubmit={handleSubmit} className="createProductContainer mx-auto w-screen">
                <div className="grid grid-cols-1 gap-4">
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex items-center gap-4">
                        <input
                            accept="image/*"
                            className="hidden"
                            id="raised-button-file"
                            multiple
                            type="file"
                            name="image"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="raised-button-file"
                            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
                        >
                            <Button variant="raised" component="span">
                                Upload Image
                            </Button>
                        </label>
                        <Button variant="contained" onClick={() => setVisible(!visible)}>
                            select image
                        </Button>
                        {selectImage && <img src={selectImage?.url} alt="Product" className="w-24 h-24 object-cover rounded-md" />}
                    </div>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <TextField fullWidth label="Price" name="price" value={productData.price} onChange={handleChange} className="w-full" />
                    <TextField fullWidth label="Status" name="status" value={productData.status} onChange={handleChange} className="w-full" />
                    {/* Category IDs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="w-full">
                            <label htmlFor="category-select" className="block font-bold mb-2">
                                Select Product Category
                            </label>
                            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                <div className="overflow-y-auto h-60 max-w-md">
                                    <TreeView
                                        aria-label="file system navigator"
                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                        defaultExpandIcon={<ChevronRightIcon />}
                                        className="h-60 w-full overflow-y-auto"
                                        onNodeSelect={(e, node) => {
                                            console.log("node", node)
                                            setProductData((prev) => ({
                                                ...prev,
                                                categoryIds: [...prev.categoryIds, node],
                                            }))
                                        }}
                                        // defaultChecked={query?.categoryId}
                                    >
                                        {categories &&
                                            categories.map((v) => (
                                                <TreeItem
                                                    key={v.id}
                                                    nodeId={v.id}
                                                    label={
                                                        <p
                                                            className={cl({
                                                                "text-red-500": productData?.categoryIds.find((cate) => v.id === cate),
                                                            })}
                                                        >
                                                            {v.title}
                                                        </p>
                                                    }
                                                >
                                                    {v.child &&
                                                        v.child.map((c) => (
                                                            <TreeItem
                                                                key={c.id}
                                                                nodeId={c.id}
                                                                label={
                                                                    <p
                                                                        className={cl({
                                                                            "text-red-500": productData?.categoryIds.find((cate) => v.id === cate),
                                                                        })}
                                                                    >
                                                                        {c.title}
                                                                    </p>
                                                                }
                                                            ></TreeItem>
                                                        ))}
                                                </TreeItem>
                                            ))}
                                    </TreeView>
                                </div>
                            </ul>
                        </div>
                        <div>
                            <h1 className="text-xl text-gray-800 mb-4">Product Categories</h1>
                            {productData &&
                                productData?.categoryIds.map((v, i) => {
                                    const a = getCategory(v, categories)
                                    return (
                                        <p key={i} className="mb-2 text-gray-600">
                                            {a.title}
                                        </p>
                                    )
                                })}
                        </div>
                    </div>

                    {/* Variations */}
                    <div className="flex space-x-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700">Color</label>
                            <input
                                type="text"
                                name="color"
                                value={currentVariation.color}
                                onChange={handleVariationChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700">Size</label>
                            <input
                                type="text"
                                name="size"
                                value={currentVariation.size}
                                onChange={handleVariationChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={currentVariation.quantity}
                                onChange={handleVariationChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        <button onClick={addVariation} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                            Add Variation
                        </button>
                    </div>

                    {/* Button add new Product */}
                    <div>
                        <Button variant="contained" className="py-20" size="large" type="submit">
                            Add new Product
                        </Button>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default CreateProductForm
