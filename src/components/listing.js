import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Checkbox } from "@mui/material";

const Listing = (props) => {
  const { items = [], onCheck, onRemove } = props;

  if (!items.length) {
    return <div>No items available.</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {item.name}
          </a>

          <Checkbox checked={item.checked} onChange={() => onCheck(item.id)} />

          <Button onClick={() => onRemove(item.id)} startIcon={<RemoveIcon />}>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Listing;
