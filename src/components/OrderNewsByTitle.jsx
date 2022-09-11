import React from "react";
import { useDispatch } from "react-redux";
import { orderNewsByTitle } from "../redux/actions";

export default function OrderNewsByTitle() {
  const dispatch = useDispatch();

  function handleOnChange(e) {
    e.preventDefault();
    dispatch(orderNewsByTitle(e.target.value));
  }

  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-64">
        <select 
          className="
            form-select 
            appearance-none
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
            onChange={ (e) => handleOnChange(e) }>
            <option disabled>Alphabetical order</option>
            <option value="Asc">Ascending</option>
            <option value="Desc">Descending</option>
          </select>
        </div>
      </div>
  );
}