import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  Chip,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PolicyIcon from "@mui/icons-material/Description";
import DateIcon from "@mui/icons-material/CalendarToday";
import CreatorIcon from "@mui/icons-material/Person";
import ReadStatusIcon from "@mui/icons-material/Visibility";
import CategoryIcon from "@mui/icons-material/Category";

const PolicyList = ({ data }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const iconStyles = { marginRight: "5px", color: "#757575" };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (id) => {
    navigate(`/pdfviewer/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDeleteChip = (categoryToDelete) => {
    setSelectedCategories((categories) =>
      categories.filter((category) => category !== categoryToDelete)
    );
  };

  const filteredData = data.filter(
    (row) =>
      row.name && // Ensure row.name is defined
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(row.category))
  );

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy === "dateCreated") {
      return order === "asc"
        ? new Date(a[orderBy]) - new Date(b[orderBy])
        : new Date(b[orderBy]) - new Date(a[orderBy]);
    }
    return order === "asc"
      ? a[orderBy].localeCompare(b[orderBy])
      : b[orderBy].localeCompare(a[orderBy]);
  });

  return (
    <Paper
      style={{ width: "100%", padding: "16px", margin: "16px 0", overflow:"auto" }}
      elevation={0} 
    >
      <Typography variant="h5" style={{ marginBottom: "16px" }}>
        Policy List
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <TextField
          label="Search by Policy Name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ flex: 1 }}
        />
        <FormControl variant="outlined" style={{ flex: 1 }}>
          <InputLabel>Sort by Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Sort by Category"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {[
              "Health",
              "Finance",
              "Education",
              "Technology",
              "Environment",
            ].map((category) => (
              <MenuItem key={category} value={category}>
                <FormControlLabel
                  value={category}
                  control={<Radio />}
                  label={category}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {selectedCategories.length > 0 && (
        <div
          style={{
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "16px",
            border: "3px dashed #EEEEEE",
          }}
        >
          <Box>
            {selectedCategories.map((category) => (
              <Chip
                key={category}
                label={category}
                onDelete={() => handleDeleteChip(category)}
                style={{ margin: "4px" }}
              />
            ))}
          </Box>
        </div>
      )}
      <Table>
        <TableHead>
          <TableRow style={{ background: "#f5f5f5" }}>
            {[
              {
                id: "name",
                label: "Policy",
                icon: <PolicyIcon style={iconStyles} />,
              },
              {
                id: "dateCreated",
                label: "Date Created",
                icon: <DateIcon style={iconStyles} />,
              },
              {
                id: "creator",
                label: "Creator",
                icon: <CreatorIcon style={iconStyles} />,
              },
              {
                id: "readStatus",
                label: "Read Status",
                icon: <ReadStatusIcon style={iconStyles} />,
              },
              {
                id: "category",
                label: "Category",
                icon: <CategoryIcon style={iconStyles} />,
              },
            ].map((headCell) => (
              <TableCell key={headCell.id}>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleRequestSort(headCell.id)}
                >
                  {headCell.icon}
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow
              key={row.id}
              hover
              onClick={() => handleRowClick(row.id)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.dateCreated}</TableCell>
              <TableCell>{row.creator}</TableCell>
              <TableCell>
                <Chip
                  label={row.readStatus ? "Complete" : "Incomplete"}
                  style={{
                    width: "100px",
                    backgroundColor: row.readStatus ? "#2196f3" : "#ef5350",
                    color: "white",
                  }}
                />
              </TableCell>
              <TableCell>{row.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PolicyList;
