import React, { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getTotalCartPrice } from "../cart/CardSlice";
import store from "../../../store"
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );


function CreateOrder() {
  const {userName,position,address,status,error}=  useSelector(user=>user.user)
  
  const isLoading=status==="loading";
  const navigation = useNavigation();
  const Error = useActionData();
  const dispatch=useDispatch()
 
  const isSubmitting = navigation.state === "submitting";
  
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(state=>state.cart.cart);
  const Price=useSelector(getTotalCartPrice)
const priority=withPriority? Price*0.2:0;
const totalPrice=Price+priority
  
  if(!cart.length)return<EmptyCart/>


  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let&apos;s go!</h2>
      <Form method="POST" >
        
        <div className="mb-5  gap-2 sm:flex sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input"type="text" defaultValue={userName} name="customer" required />
        </div>

        <div className="mb-5  gap-2 sm:flex sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow ">
            <input className="input"type="tel" name="phone" required />
            {Error?.phone && <p className="text-xs mt-2 rounded-md bg-red-100 p-2 text-red-700">{Error.phone}</p>}
          </div>
        </div>
       
        <div className="mb-5  gap-2 sm:flex sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          {!position.latitude&&!position.longitude&&<span className="right-1 absolute top-6">
         <button className="bg-yellow-400 py-1 px-2 rounded-full  " disabled={isLoading} onClick={(e)=>{
             e.preventDefault()
             dispatch(fetchAddress())}}>get Address</button>

        </span>}
          <div className="grow">
            <input type="text" name="address" required
            className="input" disabled={isLoading} defaultValue={address}/>
          </div>
          {status==="error" && <p className="text-xs mt-2 rounded-md bg-red-100 p-2 text-red-700">{error}</p>}
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="accent-yellow-400
             focus:outline-none focus:ring
                  focus:ring-yellow-400 border mb-8 mr-2"
             value={withPriority}
             onChange={(e) => setWithPriority(e.target.checked)}

          />
          <label className='ml-2'htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type='hidden' name='location' value={position.latitude&&position.longitude?`${position.latitude},${position.longitude}`:''}/>
          <Button
             disabled={isSubmitting}>
            {isSubmitting ? "placing order...." : `Order now for ${formatCurrency(totalPrice)} `}
          </Button>
        </div>
       
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const error = {};
  if (!isValidPhone(order.phone))
    error.phone =
      "please give as correct phone nember. we might need it to contact you";
  if (Object.keys(error).length > 0) return error;
  const newOrder = await createOrder(order);
     store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
