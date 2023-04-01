import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY, GET_CATEGORIES } from "../graphql/categories";
import { CirclePicker } from 'react-color';


export function CategoryForm({ user_id }) {
  const [category, setCategory] = useState({
    color: "",
    name: "",
    owner: user_id,
  });

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [
      {
        query: GET_CATEGORIES,
        variables: { owner: user_id },
      }
    ],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleChangeComplete = (color) => {
    // set in category the color 
    setCategory({ ...category, color: color.hex });

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCategory({ variables: { ...category } });
  };

  return (
    <form
      className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200"
      onSubmit={handleSubmit}
    >
      {/*  <!-- Body--> */}
      <div className="p-6">
        <header className="mb-4 text-center">
          <h3 className="text-xl font-medium text-slate-700">Add category</h3>
        </header>
        <div className="flex flex-col space-y-8">
          {/*      <!-- Input field --> */}
          <div className="relative my-6">
            <input
              id="id-b03"
              type="name"
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Task name"
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#d9259d] focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <label
              htmlFor="id-b03"
              className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#d9259d] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Category name
            </label>
            <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
              <span>Type your category name</span>
            </small>
          </div>
          {/*      <!-- Input field --> */}
          <div className="relative my-6 flex justify-center">
            <CirclePicker
              color={category.color}
              onChangeComplete={handleChangeComplete}
              colors={[
                '#E9B0E2', "#9ED9F1", "#D3B4F5", "#F4CEB8", "#9AEBC6", "#F3B4B3"
              ]}
            />
          </div>
        </div>
      </div>
      {/*  <!-- Action base sized basic button --> */}
      <div className="flex justify-end p-6 ">
        <button
          className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-[#d9259d] px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-[#d9259d] focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed  disabled:bg-[#d9259d3c] disabled:shadow-none "
          type="submit"
          disabled={!category.name || !category.color || loading}
        >
          <span>Create</span>
        </button>
      </div>
    </form>
  );
}
