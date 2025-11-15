import { TextField } from "@mui/material";

const SearchBar = (props) => {
    const { searchTerm, setSearchTerm } = props;
    return (
        <div className="search-bar">
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}

export default SearchBar;