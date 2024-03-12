import { useState } from "react"
import PropTypes from "prop-types"
import { MdOutlineFileUpload } from "react-icons/md"

const ImageUpload = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        if (file) {
            setSelectedFile(file)
        } else {
            setSelectedFile(null)
        }
    }

    return (
        <section className="container w-full mx-auto items-center py-32">
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                <div className="px-4 py-6">
                    <div
                        id="image-preview"
                        className={`max-w-sm p-6 mb-4 ${
                            selectedFile ? "bg-gray-100" : "border-dashed border-2 border-gray-400"
                        } rounded-lg items-center mx-auto text-center cursor-pointer`}
                    >
                        <input id="upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        <label htmlFor="upload" className="cursor-pointer">
                            {selectedFile ? (
                                <img src={URL.createObjectURL(selectedFile)} className="max-h-48 rounded-lg mx-auto" alt="Image preview" />
                            ) : (
                                <>
                                    <MdOutlineFileUpload className="w-6 h-6" />
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                                    <p className="font-normal text-sm text-gray-400 md:px-6">
                                        Choose photo size should be less than <b className="text-gray-600">2mb</b>
                                    </p>
                                    <p className="font-normal text-sm text-gray-400 md:px-6">
                                        and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                                    </p>
                                    <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
                                </>
                            )}
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-full">
                            <label
                                onClick={() => onUpload(selectedFile)}
                                className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
                            >
                                <span className="text-center ml-2">Upload</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

ImageUpload.propTypes = {
    onUpload: PropTypes.func,
}

export default ImageUpload
