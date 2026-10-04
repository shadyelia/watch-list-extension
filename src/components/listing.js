import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, Checkbox, Tooltip } from "@mui/material";
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
  const { items = [], onCheck, onRemove, onEdit } = props;

  if (!items.length) {
    return <div className="no-items">No items available.</div>;
  }

  return (
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

            <span style={{ minWidth: "20px", color: "#9ca3af", fontSize: "0.85rem" }}>
              {index + 1}
            </span>

            <TypeIcon itemType={item.itemType} />

            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}
          </div>
          <div className="item-actions">
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
  );
};

export default Listing;
