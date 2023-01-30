import { useState } from "react";
import style from "./Search.module.css";

const Search = function (props) {
  const [query, setQuery] = useState("");

  const queryHandler = function (e) {
    props.onAddQuery(e.target.value);
    setQuery(e.target.value);
  };

  const submitFormHandler = function (e) {
    e.preventDefault();
    props.onAddQuery(query);
  };

  return (
    <form className={style.search} onSubmit={submitFormHandler}>
      <label htmlFor="Search Notes"></label>
      <input
        type="search"
        id="Search Notes"
        placeholder="search notes"
        onChange={queryHandler}
      />
    </form>
  );
};
export default Search;
