import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Button, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

  // Sync controlled fields whenever the editItem changes
  useEffect(() => {
    setName(editItem?.name ?? "");
    setLink(editItem?.link ?? "");
    setItemType(editItem?.itemType ?? "none");
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    if (isEditing) {
      onEdit({ ...editItem, name, link, itemType });
    } else {
      onAdd({ id: uuidv4(), name, link, itemType, checked: false });
      setName("");
      setLink("");
      setItemType("none");
    }
  };

  const handleCancel = () => {
    setName("");
    setLink("");
    setItemType("none");
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

        <div className="form-actions">
          <ToggleButtonGroup
            value={itemType}
            exclusive
            onChange={(_, newType) => {
              if (newType !== null) setItemType(newType);
            }}
            aria-label="Item type"
            size="small"
          >
            {ITEM_TYPES.map(({ value, label, Icon }) => (
              <ToggleButton key={value} value={value} aria-label={label}>
                <Tooltip title={label}>
                  <Icon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

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
