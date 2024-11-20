import React from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./CardSlice";
import EmptyCart from "./EmptyCart"


function Cart() {
  const user=  useSelector(user=>user.user)
  const cart = useSelector(cart=>cart.cart)
  const dispatch=useDispatch()
  const art=cart.cart;
  if(!art.length)return <EmptyCart/>
  return (
    <div className="px-4 py-3 ">
      <Link to="/menu" className="text-sm text-blue-500 hover:text-blue-600 hover:underline">&larr; Back to menu</Link>

      <h2 className="mt-7 text-xl font-semibold">Your cart,{user.userName}</h2>
       <ul className="divide-y mt-3 divide-stone-200 border-b border-stone-200">{art.map(item=><CartItem item={item} key={item.pizzaId}/>)}</ul>
      <div className="mt-3 space-x-2">
        <Button  to="/order/new"> Order pizzas </Button>
       
        <button className="  inline-block  px-4 py-2.5 border-2 border-stone-200
    text-stone-400 uppercase tracking-wide rounded-full
     hover:bg-stone-300  transition-colors duration-300 
     focus:outline-none focus:ring focus:ring-stone-300
     focus:bg-stone-300 focus:ring-offset-2
     disabled:cursor-not-allowed sm:px-6 sm:py-3.5 hover:text-stone-800 focus:text-stone-800" onClick={()=>dispatch(clearCart())}>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
