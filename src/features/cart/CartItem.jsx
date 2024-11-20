import PropTypes from "prop-types";
import React from "react";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { decreaseItemQuantity, deleteItem,getCurrentQuantityById, increaseItemQuantity } from "./CardSlice";
function CartItem({ item }) {
 const dispatch =useDispatch()
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector((state) => getCurrentQuantityById(state, pizzaId));

  return (
    <li className="py-4 sm:flex sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p>{formatCurrency(totalPrice)}</p>
         <button onClick={()=>dispatch(decreaseItemQuantity(pizzaId))} className="bg-yellow-300 px-4 py-2 rounded-full">-</button>
        <p>
          {currentQuantity}
          </p> 
        <button onClick={()=>dispatch(increaseItemQuantity(pizzaId))} className="bg-yellow-300 px-4 py-2  rounded-full">+</button> 
        
        <button className="   inline-block  px-4 py-2
    text-stone-800 uppercase tracking-wide rounded-full
     hover:bg-yellow-300 bg-yellow-400 transition-colors duration-300 
     focus:outline-none focus:ring focus:ring-yellow-300
     focus:bg-yellow-300 focus:ring-offset-2
     disabled:cursor-not-allowed sm:px-5 sm:py-2.5 text-xs" onClick={()=>dispatch(deleteItem( pizzaId))}>Delete</button>
      </div>
    </li>
  );
}
CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired, // Assuming pizzaId is a number
    name: PropTypes.string.isRequired,   // Name of the pizza
    quantity: PropTypes.number.isRequired, // Quantity ordered
    totalPrice: PropTypes.number.isRequired, // Total price of the item
  }).isRequired, // The `item` prop itself is required
};
export default CartItem;
