import { TextField } from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DropDownFilter from "./DropDownFilter";

function Filters({
  filterButtons,
  searchQuery,
  handleSearchChange,
  handleFilterChange,
  setSelectedTags,
}) {
  const [newSelectedTags, setNewSelectedTags] = useState({});
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      {filterButtons.map((filterObj) => (
        <div key={filterObj.name}>
          <DropDownFilter
            filterObj={filterObj}
            handleFilterChange={handleFilterChange}
            newSelectedTags={newSelectedTags}
            setNewSelectedTags={setNewSelectedTags}
          />
        </div>
      ))}
      <TextField
        placeholder="Search by Policy Name"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ width: "20%", marginTop: "2px" }}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default Filters;
