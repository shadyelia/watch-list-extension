import { TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, ListItemIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategorySelect from "./categorySelect";
import { ITEM_TYPES } from "./listItemForm";

const SearchBar = (props) => {
    const { 
        searchTerm, 
        setSearchTerm, 
        selectedCategories, 
        setSelectedCategories,
        selectedTypes,
        setSelectedTypes
    } = props;

    const handleTypeChange = (event) => {
        const { value } = event.target;
        setSelectedTypes(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <div className="search-bar" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                }}
                sx={{ flex: 1 }}
                size="small"
            />
            <CategorySelect 
              selectedCategories={selectedCategories} 
              onChange={setSelectedCategories} 
              label="Categories"
              size="small"
              sx={{ width: 100, minWidth: 100 }}
            />
            <FormControl size="small" sx={{ width: 95, minWidth: 95 }}>
              <InputLabel>Type</InputLabel>
              <Select
                multiple
                value={selectedTypes}
                onChange={handleTypeChange}
                label="Type"
                renderValue={(selected) => 
                  selected.map(val => ITEM_TYPES.find(t => t.value === val)?.label).join(", ")
                }
              >
                {ITEM_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Checkbox checked={selectedTypes.indexOf(type.value) > -1} />
                    <ListItemIcon>
                      <type.Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={type.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>
        </div>
    )
}

export default SearchBar;