import { RadioGroup } from "@headlessui/react"
import { Box, Grid, LinearProgress, Rating } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ProductReviewCart from "./ProductReviewCart"
import { coolmate } from "../../../Data/coolmate"
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard"
import { api } from "../../../config/apiConfig"
import productService from "../../../service/product.service"
import { useSelect } from "@mui/base"
import { useDispatch, useSelector } from "react-redux"
import { authAction, selectAuth } from "../../../State/auth.slice"
import { cartAction, fetchAddToCart } from "../../../State/cart.slice"
import { sizeWidth } from "@mui/system"
import { toast } from "react-toastify"

const highlights = ["Hand cut and sewn locally", "Dyed with our proprietary colors", "Pre-washed & pre-shrunk", "Ultra-soft 100% cotton"]
const details =
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.'
// const product111 = {
//     name: "Basic Tee 6-Pack",
//     price: "$192",
//     href: "#",
//     breadcrumbs: [
//         { id: 1, name: "Men", href: "#" },
//         { id: 2, name: "Clothing", href: "#" },
//     ],
//     images: [
//         {
//             src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2023/_CMM7839_2.jpg",
//             alt: "Two each of gray, white, and black shirts laying flat.",
//         },
//         {
//             src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2023/CS_CMM7865.jpg",
//             alt: "Model wearing plain black basic tee.",
//         },
//         {
//             src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2023/_CMM7872.jpg",
//             alt: "Model wearing plain gray basic tee.",
//         },
//         {
//             src: "https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2023/_CMM7899_36.jpg",
//             alt: "Model wearing plain white basic tee.",
//         },
//     ],
//     colors: [
//         { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//         { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//         { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//     ],
//     sizes: [
//         { name: "S", inStock: true },
//         { name: "M", inStock: true },
//         { name: "L", inStock: true },
//     ],
//     description:
//         'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//     highlights: ["Hand cut and sewn locally", "Dyed with our proprietary colors", "Pre-washed & pre-shrunk", "Ultra-soft 100% cotton"],
//     details:
//         'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }

const cl = classNames.bind()

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function ProductDetail() {
    const { id } = useParams()

    const dispatch = useDispatch()

    const currentUser = useSelector(selectAuth.selectCurrentUser)
    const [variation, setVariation] = useState(null)
    const [product, setProduct] = useState(null)

    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)

    console.log(product)
    useEffect(() => {
        const fetch = async () => {
            const a = await api.get(`/product/${id}`)
            const prd = a.data.data
            setProduct({
                ...prd,
                colors: productService.getAllColorOfProduct(prd),
                sizes: productService.getAllSizeOfProduct(prd),
            })
        }
        fetch()
    }, [id])

    useEffect(() => {
        if (selectedSize && selectedColor) {
            console.log(product.variations)
            const a = product.variations.filter((v) => v.color === selectedColor && v.size == selectedSize)
            console.log(a)
            setVariation(a[0].id)
        }
    })
    console.log(variation)

    const handleAddToCart = async () => {
        // check variaton
        if (!variation) {
            toast("vui long chon mau va size")
            return
        }

        // check user and handle create userMod
        if (currentUser) {
            dispatch(
                cartAction.addToCart({
                    productVariationId: variation,
                    quantity: 1,
                    price: product.price,
                })
            )
            await dispatch(fetchAddToCart())
            toast("add cart is success")
        } else {
            console.log("ccc")
        }

        // navigate("/cart")
    }

    const handleChangeColor = (a) => {
        setSelectedColor(a)
    }
    const handleChangeSize = (a) => {
        setSelectedSize(a)
    }

    return (
        <div className="bg-white">
            <div className="pt-6">
                {/* <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav> */}

                {/* Image & Product Infor */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
                    {/* Image gallery */}
                    <div className="flex flex-col items-center ml-[10rem]">
                        <div className="overflow-hidden rounded-lg max-w-[35rem] max-h-[45rem]">
                            <img src={product?.image} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="flex flex-wrap space-x-5 justify-center mt-5">
                            {product &&
                                product?.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg max-w-[4rem] max-h-[4rem] mt-2 transition duration-500 ease-in-out transform hover:shadow-lg"
                                    >
                                        <img src={image} alt={image} className="h-full w-full object-cover object-center" />
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 pt-5 sm:px-6 lg:grid lg:max-w-xl lg:px-1 lg:pb-20">
                        <div className="lg:col-span-2">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{product?.name}</h1>
                            <h1 className="text-sm-5 text-gray-500 ocpacity-60 pt-1">{product?.description}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-1">
                            <h2 className="sr-only">Product information</h2>

                            <div className="flex space-x-4 items-center text-lg lg:text-xl text-gray-900 mt-4">
                                <p className="font-semibold">{product && product.discount > 0 ? product?.discount : product?.price}</p>
                                {product && product?.discount > 0 && <p className="opacity-40 line-through">{product?.price}</p>}
                                {/* <p className="text-red-600 from-neutral-100">49%</p> */}
                            </div>

                            {/* Reviews */}
                            <div className="mt-4 p-4 bg-purple-100 rounded-lg shadow-md">
                                <div className="flex items-center space-x-3">
                                    <Rating name="read-only" value={4} readOnly />
                                    <p className="opacity-70 text-sm text-blue-600">40000 rating</p>
                                    <p className="ml-3 text-sm font-semibold text-blue-600 hover:text-blue-400">10000 review</p>
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                <RadioGroup value={selectedColor} onChange={handleChangeColor} className="mt-3">
                                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                    <div className="flex items-center space-x-3">
                                        {product &&
                                            product.colors &&
                                            product.colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color,
                                                            active && checked ? "ring ring-offset-1" : "",
                                                            !active && checked ? "ring-2" : "",
                                                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span" className="sr-only">
                                                        {`bg-${color}-500`}
                                                    </RadioGroup.Label>
                                                    <span
                                                        // aria-hidden="true"
                                                        className={cl(`h-8 w-8 rounded-full border border-black border-opacity-10 bg-${color}-500`)}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Sizes */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Kích thước</h3>
                                    <a href="#" className="text-sm font-medium text-red-600 hover:text-indigo-500">
                                        Hướng dẫn chọn size
                                    </a>
                                </div>

                                <RadioGroup value={selectedSize} onChange={handleChangeSize} className="mt-4">
                                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        {product &&
                                            product.sizes &&
                                            product?.sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size.name}
                                                    disabled={!size.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? "cursor-pointer bg-white text-gray-900 shadow-lg"
                                                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                                                            active ? "ring-2 ring-indigo-500" : "",
                                                            "group relative flex items-center justify-center rounded-lg border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-2"
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                            {size.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? "border" : "border-2",
                                                                        checked ? "border-indigo-500" : "border-transparent",
                                                                        "pointer-events-none absolute -inset-px rounded-lg"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-gray-200"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                    </div>
                                </RadioGroup>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="mt-4 w-full bg-gray-700 text-white hover:text-black py-2 rounded-md hover:bg-gray-300 focus:outline-none"
                            >
                                Thêm giỏ hàng
                            </button>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                                <h3 className="sr-only">Description</h3>
                                <span className="text-lg font-semibold text-blue-600">Đặc điểm nổi bật</span>
                                <div className="space-y-6 mt-2">
                                    <p className="text-base text-gray-900">{product?.description}</p>
                                </div>
                            </div>

                            <div className="mt-10 p-4 bg-blue-100 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-blue-600">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {highlights.map((highlight) => (
                                            <li key={highlight} className="text-blue-400">
                                                <span className="text-blue-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10 p-4 bg-green-100 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold text-green-600">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-green-600">{details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rating and review */}
                <section className="bg-gray-100 p-5 rounded-lg shadow-lg">
                    <h1 className="font-bold text-2xl pb-4">Review Product</h1>
                    <div className="border p-5 bg-white rounded-lg shadow-md">
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <div className="space-y-5">
                                    {[1, 1, 1].map((item, index) => (
                                        <ProductReviewCart key={index} />
                                    ))}
                                </div>
                            </Grid>

                            {/* Product Rating */}
                            <Grid item xs={5}>
                                <h1 className="font-bold text-xl">Product Rating</h1>
                                <div className="flex items-center space-x-3 mt-2">
                                    <Rating value={4.6} precision={5} readOnly />
                                    <p className="text-gray-600"> 10000 Rating</p>
                                </div>

                                <Box className="mt-5">
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p className="font-semibold"> Excellent</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={40}
                                                color="primary" // blue color
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className="mt-5">
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p className="font-semibold">Verry Good</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={45}
                                                color="secondary" // red color
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className="mt-5">
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p className="font-semibold">Good</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={30}
                                                color="success" // green color
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box className="mt-5">
                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p className="font-semibold">Poor</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress
                                                sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                                                variant="determinate"
                                                value={15}
                                                color="warning" // yellow color
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </section>

                {/* Similar Product */}
                <section className="bg-gray-100 p-5 rounded-lg shadow-lg">
                    <h1 className="font-bold text-2xl pb-4">Similar Products</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Array(6)
                            .fill()
                            .map((_, index) => (
                                <div className="max-w-xs mx-auto" key={index}>
                                    <HomeSectionCard product={coolmate[index]} />
                                </div>
                            ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
