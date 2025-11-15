import "./App.css";
import { useState } from "react";
import Listing from "./components/listing";
import AddingListItem from "./components/addingListItem";

function App() {
  const [items, setItems] = useState( localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []);

  const handleCheck = (id) => {
    const updatedItems = [...items];
    const itemIndex = updatedItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return;
    }

    updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
    updateItems(updatedItems);
  };

  const handleRemove = (id) => {
    updateItems(items.filter((item) => item.id !== id));
  };

  const handleAdd = (newItem) => {
    updateItems([...items, newItem]);
  };

  const updateItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));  
  }

  return (
    <div className="App">
      <Listing items={items} onCheck={handleCheck} onRemove={handleRemove} />
      <AddingListItem onAdd={handleAdd} />
    </div>
  );
}

export default App;
