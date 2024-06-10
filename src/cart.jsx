import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { RemoveFromCart } from "./RTK-store/createslice";
export default function Cart() {
  let [total, setTotal] = useState(0);
  let { cart } = useSelector((state) => state);

  let dispatch = useDispatch();
  console.log(cart);
  useEffect(() => {
    total = 0;
    cart.map((index) => {
      total += index.price;
    });
    total.toFixed(2);
    console.log(total);
    setTotal(total);
  }, [cart]);
  console.log(total);
  function remove(product) {
    dispatch(RemoveFromCart(product.id));
  }

  function plus(product) {
    total += product.price;

    setTotal(total);
  }
  function minus(product) {
    if (total > 0) {
      total -= product.price;

      setTotal(total);
    } else {
      dispatch(RemoveFromCart(product.id));
    }
  }
  return (
    <div>
      <div className="product-list">
        {cart.map((index) => {
          return (
            <div key={index.id} className="product">
              <img src={index.image} alt="" />
              <p className="title">{index.title}</p>
              <p>rating: {index.rating?.rate} of 5</p>
              <p>Price: {index.price} $</p>

              <button
                onClick={() => {
                  remove(index);
                }}
              >
                Remove from cart
              </button>
              <div className="quantity">
                <button
                  className="plus"
                  onClick={() => {
                    plus(index);
                  }}
                >
                  +
                </button>

                <button
                  className="plus"
                  onClick={() => {
                    minus(index);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {total == 0 ? (
        <h3 style={{ textAlign: "center", marginTop: 20 }}>
          Add to cart to see items here
        </h3>
      ) : (
        <p className="total">Total : {total} $</p>
      )}
    </div>
  );
}
