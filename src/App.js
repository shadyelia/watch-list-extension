import "./App.css";
import { useEffect, useState } from "react";
import Listing from "./components/listing";
import AddingListItem from "./components/addingListItem";
import { loadInputs, saveInputs } from "./storage";
import SearchBar from "./components/searchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadInputs().then(setItems);
  }, []);

  const handleCheck = async (id) => {
    const updatedItems = [...items];
    const itemIndex = updatedItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return;
    }

    updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;
    await updateItems(updatedItems);
  };

  const handleRemove = async (id) => {
    await updateItems(items.filter((item) => item.id !== id));
  };

  const handleAdd = async (newItem) => {
    await updateItems([...items, newItem]);
  };

  const updateItems = async (newItems) => {
    setItems(newItems);
    await saveInputs(newItems);
  };

  return (
    <div className="app-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Listing items={filteredItems} onCheck={handleCheck} onRemove={handleRemove} />
      <AddingListItem onAdd={handleAdd} />
    </div>
  );
}

export default App;
