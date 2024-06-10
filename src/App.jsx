import logo from "./logo.svg";
import "./App.css";
import Home from "./home";
import Cart from "./cart";
import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function App() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let { cart } = useSelector((state) => state);

  useEffect(() => {
    let getData = async () => {
      let d = await fetch("https://fakestoreapi.com/products");
      let k = await d.json();
      if (k) {
        console.log(k);
        setLoading(false);
        setData(k);
      }
    };
    getData();
  }, []);
  let [cat, setCat] = useState("All");
  function change(e) {
    setCat(e.target.value);
    console.log(e.target.value);
  }
  return (
    <div>
      <div className="navbar">
        <img
          style={{ height: 50, width: 100 }}
          src="https://cdn.dribbble.com/users/4843167/screenshots/14540242/dribbble-min_4x.jpg"
          alt=""
        />
        <div>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <p>Home</p>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/cart"}>
            <div className="cartItem">
              <p>Cart</p>
              <p className="count">{cart.length}</p>
            </div>
          </Link>

          <select
            name="category"
            id="categories"
            onChange={(e) => {
              change(e);
            }}
          >
            <option value="men's clothing">men's clothing</option>
            <option value="women's clothing">women's clothing</option>
            <option value="electronics">electronics</option>
            <option value="jewelery">jewelery</option>
            <option value="All" selected>
              All
            </option>
          </select>
        </div>
      </div>
      {/*       <Circles height={"50"} width={"50"} visible={true} color="black" />
       */}{" "}
      <Routes>
        <Route
          path="/"
          element={<Home loading={loading} data={data} cat={cat} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
