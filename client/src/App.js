import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import Navbar from "./components/Navbar";


const App = () => (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </Router>
    </div>
);



export default App;