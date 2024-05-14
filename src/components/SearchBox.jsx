import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const SearchBox = ({ onSearch }) => {
  const inputRef = useRef();
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);

    if(event.target.value.length >= 3 || event.target.value.length === 0) {
      onSearch(event.target.value);
    }
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        focusInput();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="search-box-container">
      <input
        ref={inputRef}
        className="search-box"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <div className="keyboard-shortcut">Ctrl + /</div>
    </div>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBox;
