import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Products from './components/Products';
import Navbar from "./components/Navbar";
import Cart from './components/Cart';

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div>
            <section id="home">
              <Home />
            </section> 
            <section id="products">
              <Products />
            </section>
          </div>
        }/>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  </Router>
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