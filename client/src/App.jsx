import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import {BrowserRouter as Router, Navigate, Route, Routes,} from "react-router-dom";
import {useSelector} from "react-redux";
import Whislist from "./pages/Whislist";
import Search from "./pages/Search"

const App = () => {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <Router>
            <Routes>
                <Route exatc path="/" element={<Home></Home>}></Route>
                <Route path="/products/" element={<ProductList></ProductList>}></Route>
                <Route path="/products/:category" element={<ProductList></ProductList>}></Route>
                <Route path="/product/:id" element={<Product></Product>}></Route>
                <Route path="/cart" element={<Cart></Cart>}></Route>
                <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}></Route>
                <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}></Route>
                <Route path="/success" element={<Success></Success>}></Route>
                <Route path="/whislist" element={user ? <Whislist/> : <Navigate to="/login"/>}></Route>
                <Route path="/search" element={<Search></Search>}></Route>
            </Routes>
        </Router>
    );
};

export default App;
