"use client"

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  product: ProductType;
}
const Price: React.FC<Props> = ({ product }) => {
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const { addToCart } = useCartStore();

  useEffect(() => {
   useCartStore.persist.rehydrate(); 
  }, [])

  useEffect(() => {
    if (product.options?.length) {
      setTotalPrice(quantity * product.price + product.options[selected].additionalPrice);
    }
  }, [quantity, selected, product]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: totalPrice,
      ...(product.options?.length && {optionTitle: product.options[selected].title}),
      quantity: quantity
    })

    toast.success("The product added to the cart!");
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${totalPrice}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {product.options?.length && product.options?.map((option, index) => (
          <button
            key={option.title}
            className="min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md"
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "rgb(248 113 113)"
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>

          <div className="flex gap-4 items-center">
            <button onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : prev)}>{"<"}</button>
            <button>{quantity}</button>
            <button onClick={() => setQuantity(prev => prev < 9 ? prev + 1 : prev)}>{">"}</button>
          </div>
        </div>

        <span className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-400"
          onClick={() => handleCart()}
        >
          Add to Cart
        </span>
      </div>
    </div>
  )
}

export default Price;
