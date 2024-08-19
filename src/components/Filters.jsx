import { TextField, Button } from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DropDownFilter from "./DropDownFilter";


function Filters({
  filterButtons,
  searchQuery,
  handleSearchChange,
  handleFilterChange,
}) {
  const [filterQuery, setfilterQuery] = useState({});
  
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      {filterButtons.map((filterObj) => (
        <div key={filterObj.name}>
          <DropDownFilter
            filterObj={filterObj}
            handleFilterChange={handleFilterChange}
            filterQuery={filterQuery}
            setfilterQuery={setfilterQuery}
          />
        </div>
      ))}
      <TextField
        placeholder="Search by Policy Name"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          marginLeft: "auto", 
          width: "20%",
          marginTop: "2px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Default box shadow
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none", // Remove border
            },
            "&:hover fieldset": {
              border: "none", // Remove border on hover
            },
            "&.Mui-focused fieldset": {
              border: "none", // Remove border on focus
            },
          },
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Increased box shadow on hover
          },
          "&.Mui-focused": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Maintain increased box shadow on focus
          },
        }}
      />
    </div>
  );
}

export default Filters;
