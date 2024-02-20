import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CustomerRouters from "./Routers/CustomerRouters"
import AdminRouters from "./Routers/AdminRouters"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

function App() {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Router>
                <Routes>
                    <Route path="/*" element={<CustomerRouters />}></Route>
                    <Route path="/admin/*" element={<AdminRouters />}></Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
