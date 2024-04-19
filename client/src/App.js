import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import Navbar from "./components/Navbar";
import Cart from './components/Cart';


const App = () => (
    <div className="App">
        <div>
            <section id="home">
                <Home />
            </section> 
            <section id="products">
                <Products />
            </section>
        </div>

    </div>
);



export default App;



/* Nav switch tabs to seperated pages below here in case we need later, please delete if no longer need.
<Router>
<Navbar />
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/cart" element={<Cart />} />
</Routes>
</Router>
*/