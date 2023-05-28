/* eslint-disable no-unused-vars */
import React, { useState ,useEffect } from "react";

export const Search = (props) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData = props.data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleItemClick = (item) => {
    setSelectedItem(item);
    props.citiesToAlert(item)
    // Do something with the selected item, like show it in a modal or send it to a server
  };

  return (
    <div className="check">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חיפוש"
      />
         {/* {selectedItem && (
        <div>
          <h2>Selected item: {selectedItem.name}</h2>
          <p>Zone: {selectedItem.zone}</p>
          <p>Time: {selectedItem.time}</p>
          <p>Coordinates: {selectedItem.lat}, {selectedItem.lng}</p>
        </div>
      )} */}
      <ul>
        {filteredData.map((item) => (
          <li key={item.value} onClick={() => handleItemClick(item)}>
            {item.name}
          </li>
        ))}
      </ul>
   
    </div>
  );
};