"use client"

import { useEffect, useState } from "react";

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
}
const Price: React.FC<Props> = ({ price, id, options }) => {
  const [totalPrice, setTotalPrice] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setTotalPrice(quantity * price + (options?.[selected]?.additionalPrice || 0));
  }, [quantity, selected, options, price]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${totalPrice.toFixed(2)}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
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

        <span className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-400">
          Add to Cart
        </span>
      </div>
    </div>
  )
}

export default Price;
