import AddIcon from "@mui/icons-material/Add";
import { Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const AddingListItem = (props) => {
  const { onAdd } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value
    if (!name) {
      return;
    }

    const link = e.target[2].value;

    onAdd({ id: uuidv4(), name, link, checked: false });
  
    e.target[0].value = "";
    e.target[2].value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField placeholder="Name" variant="outlined"  required/>
        <TextField placeholder="Link" variant="outlined" />

        <Button type="submit" startIcon={<AddIcon />}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddingListItem;
