import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Checkbox } from "@mui/material";

const Listing = (props) => {
  const { items = [], onCheck, onRemove } = props;

  if (!items.length) {
    return <div>No items available.</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id}>
          <div className={item.checked ? "checked" : ""}>
            <Checkbox
              checked={item.checked}
              onChange={() => onCheck(item.id)}
            />

            <span>{index + 1}. </span>

            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}
          </div>
          <Button onClick={() => onRemove(item.id)} startIcon={<RemoveIcon />}>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Listing;
