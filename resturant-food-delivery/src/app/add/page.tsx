"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type OptionType = {
  title: string,
  additionalPrice: number
}

type InputType = {
  title: string,
  desc: string,
  price: number,
  catSlug: string
}
const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<InputType>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState({
    title: "",
    additionalPrice: 0
  });

  const [options, setOptions] = useState<OptionType[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push('/');
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const changeOption = (e: ChangeEvent<HTMLInputElement>) => {
    setOption(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    
    setFile(item);
  }
  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "resturant");
    
    const response = await fetch("https://api.cloudinary.com/v1_1/stiliyan26/image", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      mode: 'no-cors',
      body: data
    });
    const resData = await response.json();

    return resData.url
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch(`http://localhost:3000/api/products`, {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options
        })
      });

      const data = await res.json();

      //router.push(`/product/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form className="shadow-lg flex flex-wrap gap-4 p-8" onSubmit={handleSubmit}>
        <h1>Add New Product</h1>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="text">Title</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm" type="text" name="title"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="text">Image</label>
          <input
            onChange={handleChangeImg}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="file"
            name="img"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="text">Desc</label>
          <textarea onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" name="desc" />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="text">Price</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm" type="number" name="price"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="text">Category</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="catSlug"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="text">Options</label>

          <div>
            <input
              onChange={changeOption}
              className="ring-1 ring-red-200 p-2 rounded-sm" type="text" placeholder="Title" name="title"
            />
            <input
              onChange={changeOption}
              className="ring-1 ring-red-200 p-2 rounded-sm" type="number" placeholder="Additional Price" name="additionalPrice"
            />
          </div>

          <div className="w-52 bg-red-500 text-white p-2"
            onClick={() => setOptions(prev => [...prev, option])}
          >
            Add Option
          </div>
        </div>

        <div>
          {options.map((option, index) => (
            <div key={index} className="ring-1 p-2 ring-red-500 rounded-md cursor-pointer"
              onClick={() => setOptions(prev => prev.filter(item => item.title !== option.title))}
            >
              <span>{option.title}</span>
              <span>${option.additionalPrice}</span>
            </div>
          ))}
        </div>

        <button type="submit" className="p-2 w-full bg-red-500 text-white">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddPage
