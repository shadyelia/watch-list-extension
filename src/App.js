import "./App.css";
import { useState } from "react";
import Listing from "./components/listing";
import AddingListItem from "./components/addingListItem";

function App() {
  const [items, setItems] = useState([]);

  const handleCheck = (id) => {
    const updatedItems = [...items];
    const itemIndex = updatedItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return;
    }

    updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
    setItems(updatedItems);
  };

  const handleRemove = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAdd = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="App">
      <Listing items={items} onCheck={handleCheck} onRemove={handleRemove} />
      <AddingListItem onAdd={handleAdd} />
    </div>
  );
}

export default App;
