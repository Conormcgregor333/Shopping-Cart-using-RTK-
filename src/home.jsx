import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Circles } from "react-loader-spinner";
import "./App.css";
import { useDispatch } from "react-redux";
import { addToCart, RemoveFromCart } from "./RTK-store/createslice";
export default function Home({ loading, data, cat }) {
  /*  let [category, setCatgory] = useState("");
  document.getElementById("category").addEventListener("click", () => {
    let y = document.getElementById("category");
    let x = y.value;
    setCatgory(x);
  }); */
  let dispatch = useDispatch();
  let { cart } = useSelector((state) => state);

  function handleAdd(product) {
    dispatch(addToCart(product));
    console.log(product);
  }
  function removeFromCart(product) {
    dispatch(RemoveFromCart(product.id));
    console.log(product.id);
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: 20 }}>
        Shop your heart out
      </h2>
      <div className="product-list">
        {loading ? (
          <div className="circle">
            {" "}
            <Circles height={"50"} width={"50"} visible={true} color="black" />
          </div>
        ) : (
          data.map((index) => {
            return (
              <div
                style={
                  cat === index.category
                    ? { display: "block" }
                    : cat == "All"
                    ? { display: "block" }
                    : { display: "none" }
                }
                key={index.id}
                className="product"
              >
                <img src={index.image} alt="" />
                <p className="title">{index.title}</p>
                <p>rating: {index.rating?.rate} of 5</p>
                <p>Price: {index.price} $</p>
                <p>{index.rating.count > 0 ? "Instock" : "out of stock"}</p>
                <p>
                  {index.rating.count > 0
                    ? "Count :" + index.rating.count
                    : null}
                </p>
                <button
                  onClick={() => {
                    cart.some((item) => item.id == index.id)
                      ? removeFromCart(index)
                      : handleAdd(index);
                  }}
                >
                  {cart.some((item) => item.id == index.id)
                    ? "Remove from cart"
                    : "Add to cart"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
