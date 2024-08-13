import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Category } from "@mui/icons-material";

const listStyle = {
  maxHeight: 200,
  overflow: "auto",
  borderRadius: "4px",
  padding: "8px",
  width: "500px",
};

export default function DropDownFilter({
  filterObj,
  handleFilterChange,
  newSelectedTags,
  setNewSelectedTags,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const shouldRunEffect = useRef(false);
  const listRef = useRef(null);
  const tags = filterObj?.data || [];
  const givenObject = newSelectedTags;
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);

  };
  const handleClear = () => {
    
    let copyObject = givenObject
    
    setNewSelectedTags();

  };
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleToggle = (tag) => {
    // Create a new object based on newSelectedTags
    const updatedGivenObject = { ...newSelectedTags };

    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );

    if (updatedGivenObject[filterObj.keyName] === undefined) {
      updatedGivenObject[filterObj.keyName] = [tag];
    } else {
      updatedGivenObject[filterObj.keyName] = [
        ...updatedGivenObject[filterObj.keyName],
        tag,
      ];
    }

    console.log(updatedGivenObject);
    // Set the updated array
    setNewSelectedTags(updatedGivenObject);

    shouldRunEffect.current = true;
    // handleFilterChange(newSelectedTags);
  };

  useEffect(() => {
    // Check if the flag is true before running the effect
    if (shouldRunEffect.current) {
      handleFilterChange(newSelectedTags);
      // Reset the flag after running the effect
      shouldRunEffect.current = false;
    }
  }, [newSelectedTags]);
  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTags = [...filteredTags].sort((a, b) => a.localeCompare(b));
  const sortedAndSelectedTags = [
    ...selectedTags.filter((tag) => sortedTags.includes(tag)),
    ...sortedTags.filter((tag) => !selectedTags.includes(tag)),
  ];

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          background: "#F4511E",
          color: "white",
          borderRadius: "10px",
          "&:hover": {
            background: "#d84315",
          },
          margin: "5px",
        }}
      >
        <LocalOfferIcon sx={{ fontSize: "15px" }} />
        <Typography sx={{ fontSize: "14px", padding: "2px" }}>
          {filterObj.name}
        </Typography>
        <ArrowDropDownIcon sx={{ fontSize: "15px" }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Less box shadow
          borderRadius: "20px", // More border radius
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="h2">
              {filterObj.name}
            </Typography>
            <Button onClick={handleClear} sx={{ color: "#f44336" }}>
              Clear
            </Button>
          </Box>
          <TextField
            id="search-tags"
            placeholder={`Search ${filterObj.name}`}
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              background: "#F6F6F7",
              borderRadius: "10px",
              "& fieldset": { border: "none" },
            }}
          />

          <List sx={listStyle} ref={listRef}>
            {sortedAndSelectedTags.map((tag) => (
              <ListItem
                key={tag}
                button
                onClick={() => handleToggle(tag)}
                sx={{
                  backgroundColor: selectedTags.includes(tag)
                    ? "#ffcdd2"
                    : "inherit",
                  display: "flex",
                  justifyContent: "space-between",
                  borderRadius: "10px",
                  margin: "5px",
                  width: "95%",
                }}
              >
                <div
                  style={{
                    background: "white",
                    border: "1px solid #F6F6F7",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary={tag}
                    sx={{
                      fontSize: "1em",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                    disableTypography
                  />
                </div>
                {selectedTags.includes(tag) && (
                  <CheckIcon sx={{ color: "#f44336" }} />
                )}
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClose} sx={{ mt: 2, color: "#f44336" }}>
            Close
          </Button>
        </Box>
      </Menu>
    </div>
  );
}
