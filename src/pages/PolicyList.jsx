import { useState, useRef } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Paper,
  TextField,
  Chip,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PolicyIcon from "@mui/icons-material/Description";
import DateIcon from "@mui/icons-material/CalendarToday";
import ReadStatusIcon from "@mui/icons-material/Visibility";
import CategoryIcon from "@mui/icons-material/Category";
import TagIcon from "@mui/icons-material/Label";
import PolicyTypeIcon from "@mui/icons-material/Policy";
import SearchIcon from "@mui/icons-material/Search";
import TagFilter from "../components/TagFilter";
import InputAdornment from "@mui/material/InputAdornment";

const PolicyList = ({ data }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPolicyType, setSelectedPolicyType] = useState("");
  const navigate = useNavigate();
  const uniqueCategories = [...new Set(data.reduce((acc, policy) => acc.concat(policy.categories), []))];
  const uniqueTags = [...new Set(data.reduce((acc, policy) => acc.concat(policy.tags), []))];
  const uniquePolicyTypes = [...new Set(data.map(policy => policy.policyType))];
  
  // Create filterButtons array
  const filterButtons = [
    { name: "Categories", data: uniqueCategories },
    { name: "Tags", data: uniqueTags },
    { name: "Policy Type", data: uniquePolicyTypes }
  ];
  const iconStyles = { marginRight: "5px", color: "#757575" };
console.log(filterButtons[0].data)
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

  const handleDeleteChip = (categoryToDelete) => {
    setSelectedCategories((categories) =>
      categories.filter((category) => category !== categoryToDelete)
    );
  };

  const handleDeleteTag = (tagToDelete) => {
    setSelectedTags((tags) =>
      tags.filter((tag) => tag !== tagToDelete)
    );
  };

  const handleDeletePolicyType = () => {
    setSelectedPolicyType("");
  };

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.some((category) => row.categories.includes(category))) &&
      (selectedTags.length === 0 ||
        selectedTags.some((tag) => row.tags.includes(tag))) &&
      (selectedPolicyType === "" || row.policyType === selectedPolicyType)
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
      style={{
        width: "100%",
        padding: "16px",
        margin: "16px 0",
        overflow: "auto",
        background: "#F8FAFC",
        height: "100%",
      }}
      elevation={0}
    >
      <Typography variant="h5" style={{ marginBottom: "16px" }}>
        Policy List
      </Typography>
      <Divider style={{ marginBottom: "16px" }} />

      <div
        style={{
          border: "1px solid #E8E9ED",
          borderRadius: "15px",
          padding: "10px",
          background: "white",
        }}
      >
        <div style={{ display: "flex", marginBottom: "10px" }}>
          {filterButtons.map((filterObj) => (
            <div key={filterObj.name}>
              <TagFilter filterObj={filterObj} />
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

        {selectedTags.length > 0 && (
          <div
            style={{
              padding: "16px",
              marginBottom: "16px",
              borderRadius: "16px",
              border: "3px dashed #EEEEEE",
            }}
          >
            <Box>
              {selectedTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  style={{ margin: "4px" }}
                />
              ))}
            </Box>
          </div>
        )}

        {selectedPolicyType && (
          <div
            style={{
              padding: "16px",
              marginBottom: "16px",
              borderRadius: "16px",
              border: "3px dashed #EEEEEE",
            }}
          >
            <Box>
              <Chip
                label={selectedPolicyType}
                onDelete={handleDeletePolicyType}
                style={{ margin: "4px" }}
              />
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
                  id: "readStatus",
                  label: "Read Status",
                  icon: <ReadStatusIcon style={iconStyles} />,
                },
                {
                  id: "categories",
                  label: "Categories",
                  icon: <CategoryIcon style={iconStyles} />,
                },
                {
                  id: "tags",
                  label: "Tags",
                  icon: <TagIcon style={iconStyles} />,
                },
                {
                  id: "policyType",
                  label: "Policy Type",
                  icon: <PolicyTypeIcon style={iconStyles} />,
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
                <TableCell>{row.categories.join(", ")}</TableCell>
                <TableCell>{row.tags.join(", ")}</TableCell>
                <TableCell>{row.policyType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

export default PolicyList;
