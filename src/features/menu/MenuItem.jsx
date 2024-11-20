import React from "react";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {decreaseItemQuantity, increaseItemQuantity , addItem, deleteItem, getCurrentQuantityById } from "../cart/CardSlice";

function MenuItem({ pizza }) {
 const distpatch= useDispatch()

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

 const currentQuantity=useSelector(getCurrentQuantityById(id))
 const IsInCart=currentQuantity>0
   
  function handleAdd(){
     const newItems={
      pizzaId: id,
     name: name,
     quantity: 1,
    unitPrice: unitPrice,
    totalPrice: unitPrice*1,
     }
     distpatch(addItem( newItems))
     }
    
  
  return (
    <li className="flex  gap-4 py-2 ">
      <img src={imageUrl} alt={name} className={`w-24 ${soldOut?"opacity-70 grayscale":""}`} />
      <div className="flex flex-col  grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm font-medium text-stone-500">Sold out</p>}
        
         {IsInCart &&<div className="flex  items-center">
          <button onClick={()=> distpatch(decreaseItemQuantity(id))} className="bg-yellow-300 px-4 py-2 rounded-full">-</button>
          <p>
            {currentQuantity}
            </p> 
          <button onClick={()=> distpatch(increaseItemQuantity(id))} className="bg-yellow-300 px-4 py-2  rounded-full">+</button> 
         <button className="   inline-block  px-4 py-2
    text-stone-800 uppercase tracking-wide rounded-full
    hover:bg-yellow-300 bg-yellow-400 transition-colors duration-300 
    focus:outline-none focus:ring focus:ring-yellow-300
    focus:bg-yellow-300 focus:ring-offset-2
    disabled:cursor-not-allowed sm:px-5 sm:py-2.5 text-xs"
     onClick={()=> distpatch(deleteItem( id))}>Delete</button>
    </div>}
     
        
        
         {!soldOut&&!IsInCart&& <button className="   inline-block  px-4 py-2
    text-stone-800 uppercase tracking-wide rounded-full
     hover:bg-yellow-300 bg-yellow-400 transition-colors duration-300 
     focus:outline-none focus:ring focus:ring-yellow-300
     focus:bg-yellow-300 focus:ring-offset-2
     disabled:cursor-not-allowed sm:px-5 sm:py-2.5 text-xs" onClick={()=>handleAdd(id)}>ADD TO CART</button>}
        </div>
      </div>
    </li>
  );
}
MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    find: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
