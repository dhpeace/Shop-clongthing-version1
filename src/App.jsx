import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CustomerRouters from "./Routers/CustomerRouters"
import AdminRouters from "./Routers/AdminRouters"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchInfo } from "./State/auth.slice"
import { fetchGetCartUser } from "./State/cart.slice"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchInfo())
            await dispatch(fetchGetCartUser())
        }
        fetch()
    }, [])
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
