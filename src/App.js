import "./App.css";
import { useEffect, useState } from "react";
import Listing from "./components/listing";
import ListItemForm from "./components/listItemForm";
import { loadInputs, saveInputs } from "./storage";
import SearchBar from "./components/searchBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || 
      (item.categories && item.categories.some(c => selectedCategories.includes(c)));
    return matchesSearch && matchesCategory;
  });

  const editItem = items.find((item) => item.id === editingItemId) ?? null;

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

  const handleEditStart = (id) => {
    setEditingItemId(id);
  };

  const handleEditSave = async (updatedItem) => {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setEditingItemId(null);
    await updateItems(updatedItems);
  };


  const handleCancelEdit = () => {
    setEditingItemId(null);
  };

  const handleMoveUp = async (id) => {
    const index = items.findIndex((item) => item.id === id);
    if (index > 0) {
      const updatedItems = [...items];
      [updatedItems[index - 1], updatedItems[index]] = [
        updatedItems[index],
        updatedItems[index - 1],
      ];
      await updateItems(updatedItems);
    }
  };

  const handleMoveDown = async (id) => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1 && index < items.length - 1) {
      const updatedItems = [...items];
      [updatedItems[index + 1], updatedItems[index]] = [
        updatedItems[index],
        updatedItems[index + 1],
      ];
      await updateItems(updatedItems);
    }
  };

  const updateItems = async (newItems) => {
    setItems(newItems);
    await saveInputs(newItems);
  };

  return (
    <div className="app-container">
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <Listing
        items={filteredItems}
        onCheck={handleCheck}
        onRemove={handleRemove}
        onEdit={handleEditStart}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />
      <ListItemForm
        onAdd={handleAdd}
        onEdit={handleEditSave}
        editItem={editItem}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default App;
