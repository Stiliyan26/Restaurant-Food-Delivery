import React from "react"
import Image from "next/image";
import Price from "@/components/Price";
import { getData } from "@/services/requester";
import { ProductType } from "@/types/types";
import DeleteButton from "@/components/DeleteButton";

type Params = {
  params: {
    id: string
  }
}

const SingleProduct: React.FC<Params> = async ({ params }) => {
  const singleProduct: ProductType = await getData(`products/${params.id}`);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTIANER */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            fill
            objectFit="contain"
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {singleProduct.title}
        </h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>

      <DeleteButton id={singleProduct.id} />
    </div>
  )
}

export default SingleProduct;
