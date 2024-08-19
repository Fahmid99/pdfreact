import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
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
import { Close } from "@mui/icons-material";

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
  filterQuery,
  setfilterQuery,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const shouldRunEffect = useRef(false);
  const listRef = useRef(null);
  const tags = filterObj?.data || [];

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = (e) => {
    e.stopPropagation()
    let copyObject = { ...filterQuery };
    delete copyObject[filterObj.keyName];
    setSelectedTags([]);
    setfilterQuery(copyObject);
    shouldRunEffect.current = true;
  };

  useEffect(() => {
    // Check if the flag is true before running the effect
    handleFilterChange(filterQuery);
    // Reset the flag after running the effect
  }, [filterQuery, handleFilterChange]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleToggle = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      const tagsIncluded = prevSelectedTags.includes(tag);
      const filterQuery = tagsIncluded
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag];

      setfilterQuery((prevNewSelectedTags) => {
        let updatedGivenObject = { ...prevNewSelectedTags };

        if (!tagsIncluded) {
          if (!updatedGivenObject[filterObj.keyName]) {
            updatedGivenObject[filterObj.keyName] = [tag];
          } else {
            updatedGivenObject[filterObj.keyName].push(tag);
          }
        } else {
          updatedGivenObject[filterObj.keyName] = updatedGivenObject[
            filterObj.keyName
          ].filter((t) => t !== tag);
        }

        // If the updated tags array is empty, delete the key from the object
        if (updatedGivenObject[filterObj.keyName].length === 0) {
          delete updatedGivenObject[filterObj.keyName];
        }

        return updatedGivenObject;
      });

      return filterQuery;
    });
    shouldRunEffect.current = true;
  };

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
        {selectedTags.length > 0 && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0 6px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
              marginLeft: "5px",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight:"bold" }}>
              {selectedTags.length} Selected
            </Typography>
          </Box>
        )}
        <ArrowDropDownIcon sx={{ fontSize: "18px" }} />
        {selectedTags.length > 0 && (
          <IconButton onClick={handleClear} size="small" sx={{  "&:hover": {
            background: "#992a08", // Change to your desired hover color
          },}}>
            <Close sx={{fontSize: "14px", color:"white"}} />
          </IconButton>
        )}
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
