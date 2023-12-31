import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { getData } from '@/services/requester';
import { ProductType } from '@/types/types';

type Props = {
  params: { category: string }
}
const CategoryPage: React.FC<Props> = async ({ params }) => {
  const productsByCat: ProductType[] = await getData(`products?category=${params.category}`);

  return (
    <div className='flex flex-wrap text-red-500'>
      {productsByCat.map(item => {
        return (
          <Link className='w-full h-[60vh] border-r-2 border-b-2 sm:w-1/2 lg:w-1/3 border-red-500 p-4 flex flex-col justify-between group odd:bg-fuchsia-50' 
            key={item.id} 
            href={`/product/${item.id}`}
          >
            {/* IMAGE CONTAINER */}
            {item.img && ( 
              <div className='relative h-[80%]'>
                <Image src={item.img} alt="" fill objectFit='contain'/>
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className='flex items-center justify-between font-bold '>
              <h1 className='text-2xl uppercase p-2'>{item.title}</h1>
              <h2 className='group-hover:hidden text-xl'>${item.price}</h2>
              <button className='hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md'>
                Add to Cart
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  )
}

export default CategoryPage;
