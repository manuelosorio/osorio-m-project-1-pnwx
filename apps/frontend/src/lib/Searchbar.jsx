import React, { useState } from 'react';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery) {
      // Handle your search logic here.
      // Maybe redirect to a search results page or fetch some data.
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>
        <img
          src="https://cdn-manuelosorio.cyclic.app/api/icons/search?color=%230A2239&size=24&stroke_width=2"
          alt="search icon"
        />
      </button>
    </div>
  );
}

export default SearchBar;
