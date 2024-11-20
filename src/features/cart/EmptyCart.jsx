import React from "react";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div>
      <Link to="/menu" className="text-sm text-blue-500 hover:text-blue-600 hover:underline">&larr; Back to menu</Link>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
