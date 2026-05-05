import cn from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";
type Props = {
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit?: React.SubmitEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn("flex relative items-center justify-center h-10", props.className)}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search Location... (e.g. New York, London, Tokyo)"
        className="px-4 py-2 w-full border dark:text-white border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-full"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md h-full flex items-center justify-center"
      >
        <IoSearch />
      </button>
    </form>
  );
}
