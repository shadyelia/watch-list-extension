import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CategorySelect from "./categorySelect";

/**
 * ITEM_TYPES – the three supported content types.
 * Each entry has a value, label, and the MUI icon component to render.
 */
export const ITEM_TYPES = [
  { value: "none",   label: "None",   Icon: QuestionMarkIcon },
  { value: "movie",  label: "Movie",  Icon: LocalMoviesIcon },
  { value: "series", label: "Series", Icon: LiveTvIcon },
];

/**
 * ListItemForm – handles both adding a new item and editing an existing one.
 *
 * Props:
 *   onAdd(newItem)          – called when submitting a new item
 *   onEdit(updatedItem)     – called when submitting an edited item
 *   editItem                – the item object to edit; switches form to edit mode
 *   onCancelEdit()          – called when the user cancels an in-progress edit
 */
const ListItemForm = (props) => {
  const { onAdd, onEdit, editItem, onCancelEdit } = props;
  const isEditing = Boolean(editItem);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [itemType, setItemType] = useState("none");
  const [categories, setCategories] = useState([]);

  // Sync controlled fields whenever the editItem changes
  useEffect(() => {
    setName(editItem?.name ?? "");
    setLink(editItem?.link ?? "");
    setItemType(editItem?.itemType ?? "none");
    setCategories(editItem?.categories ?? []);
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    if (isEditing) {
      onEdit({ ...editItem, name, link, itemType, categories });
    } else {
      onAdd({ id: uuidv4(), name, link, itemType, checked: false, categories });
      setName("");
      setLink("");
      setItemType("none");
      setCategories([]);
    }
  };

  const handleCancel = () => {
    setName("");
    setLink("");
    setItemType("none");
    setCategories([]);
    onCancelEdit?.();
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        {isEditing && (
          <div className="editing-badge">
            <EditIcon fontSize="inherit" /> Editing Item
          </div>
        )}
        <div className="form-row">
          <TextField
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            label={isEditing ? "Edit Name" : "Name"}
          />
          <TextField
            placeholder="Link (optional)"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            label={isEditing ? "Edit Link" : "Link"}
          />
        </div>
        <div className="form-row">
          <CategorySelect 
            selectedCategories={categories}
            onChange={setCategories}
            size="small"
            sx={{ flex: 1 }}
          />
        </div>

        <div className="form-actions">
          <FormControl size="small" sx={{ width: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              label="Type"
              renderValue={(selected) => {
                const selectedType = ITEM_TYPES.find(t => t.value === selected);
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {selectedType && <selectedType.Icon fontSize="small" />}
                    <span>{selectedType?.label}</span>
                  </div>
                );
              }}
            >
              {ITEM_TYPES.map(({ value, label, Icon }) => (
                <MenuItem key={value} value={value}>
                  <ListItemIcon>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="form-actions-right">
            {isEditing && (
              <Button type="button" onClick={handleCancel} color="inherit">
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              color={isEditing ? "secondary" : "primary"}
              startIcon={isEditing ? <EditIcon /> : <AddIcon />}
              disableElevation
            >
              {isEditing ? "Save" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListItemForm;
