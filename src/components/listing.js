import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IconButton, Checkbox, Tooltip, Snackbar } from "@mui/material";
import { ITEM_TYPES } from "./listItemForm";

/**
 * Returns the icon component for a given itemType value.
 * Falls back to the "none" icon when the type is unrecognised.
 */
const TypeIcon = ({ itemType }) => {
  const match = ITEM_TYPES.find((t) => t.value === itemType) ?? ITEM_TYPES[0];
  const { Icon, label } = match;
  return (
    <Tooltip title={label}>
      <Icon
        fontSize="small"
        aria-label={label}
        style={{ verticalAlign: "middle", marginRight: 4, opacity: 0.7 }}
      />
    </Tooltip>
  );
};

const Listing = (props) => {
  const { items = [], onCheck, onRemove, onEdit, onMoveUp, onMoveDown } = props;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbarMessage("Copied to clipboard!");
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 2000);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  if (!items.length) {
    return <div className="no-items">No items available.</div>;
  }

  return (
    <>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={item.id}>
            <div className={"item-content " + (item.checked ? "checked" : "")}>
              <Checkbox
                checked={item.checked}
                onChange={() => onCheck(item.id)}
                size="small"
                sx={{ padding: "4px", marginRight: "4px" }}
              />

              <span style={{ width: "24px", flexShrink: 0, textAlign: "right", color: "#9ca3af", fontSize: "0.85rem", paddingRight: "4px" }}>
                {index + 1}.
              </span>

              <TypeIcon itemType={item.itemType} />

              {item.link ? (
                <Tooltip title={item.name} placement="top" disableInteractive>
                  <a className="item-name" href={item.link} target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                </Tooltip>
              ) : (
                <Tooltip title={item.name} placement="top" disableInteractive>
                  <span
                    className="item-name"
                    onClick={() => handleCopy(item.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </span>
                </Tooltip>
              )}
            </div>
            <div className="item-actions">
              <Tooltip title="Move Up">
                <IconButton onClick={() => onMoveUp(item.id)} size="small">
                  <ArrowUpwardIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Move Down">
                <IconButton onClick={() => onMoveDown(item.id)} size="small">
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton onClick={() => onEdit(item.id)} size="small" color="primary">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove">
                <IconButton onClick={() => onRemove(item.id)} size="small" color="error">
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            bgcolor: '#0f1118',
            color: '#e8e8ee',
            border: '1px solid rgba(167, 139, 250, 0.4)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            fontFamily: 'inherit'
          }
        }}
      />
    </>
  );
};

export default Listing;
