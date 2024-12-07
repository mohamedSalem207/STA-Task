import { useState } from "react";

type SearchProps = {
  id: string;
  placeholder: string;
  disabled?: boolean;
  onSearch: (search: string) => void;
};

export default function Search({
  id,
  placeholder,
  onSearch,
  disabled,
}: SearchProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center relative mb-5">
      <label
        htmlFor={id}
        className="text-primary absolute cursor-pointer start-[10px]"
      >
        <i className="fa-solid  fa-magnifying-glass" />
      </label>

      <input
        type="text"
        id={id}
        className="block h-[50px] disabled:opacity-60 disabled:cursor-not-allowed border-2 font-medium rounded-lg ps-[35px] pe-5 placeholder:text-gray-400 bg-gray-100 text-center lg:w-[35%] w-full border-primary"
        placeholder={placeholder}
        disabled={disabled}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);

          onSearch(e.target.value);
        }}
      />
    </div>
  );
}
