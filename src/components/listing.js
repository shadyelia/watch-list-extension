import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Checkbox, Tooltip } from "@mui/material";
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
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          <div className={"item-content " + (item.checked ? "checked" : "")}>
            <Checkbox
              checked={item.checked}
              onChange={() => onCheck(item.id)}
            />

            <span>{index + 1}. </span>

            <TypeIcon itemType={item.itemType} />

            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}
          </div>

          <Button onClick={() => onEdit(item.id)} startIcon={<EditIcon />} />
          <Button onClick={() => onRemove(item.id)} startIcon={<RemoveIcon />} />
        </li>
      ))}
    </ul>
  );
};

export default Listing;
