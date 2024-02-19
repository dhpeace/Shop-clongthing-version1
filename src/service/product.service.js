const productService = {
    getAllColorOfProduct: (product) => {
        const { variations } = product
        console.log(variations)
        if (variations) {
            return variations.map((v) => v.color).filter((value, index, self) => self.indexOf(value) === index)
        }
        return null
    },
    getAllSizeOfProduct: (product) => {
        const { variations } = product
        if (variations) {
            const uniqueSizes = variations.reduce((acc, curr) => {
                if (!acc.find((item) => item.name === curr.size)) {
                    acc.push({ name: curr.size, inStock: curr.quantity > 0 })
                }
                return acc
            }, [])
            return uniqueSizes
        }
        return null
    },
}
export default productService
