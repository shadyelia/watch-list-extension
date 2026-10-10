import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategorySelect from "./categorySelect";

const SearchBar = (props) => {
    const { searchTerm, setSearchTerm, selectedCategories, setSelectedCategories } = props;
    return (
        <div className="search-bar" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
              sx={{ width: 140, minWidth: 140 }}
            />
        </div>
    )
}

export default SearchBar;