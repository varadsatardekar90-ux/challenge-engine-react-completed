import { useRef,useEffect } from "react";

const FilterBar = () =>{
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(()=> {
    searchInputRef.current?.focus();
  },[]
  )


return(
  <input id="search-input"
  ref={searchInputRef}
  />
);
};


export default FilterBar;