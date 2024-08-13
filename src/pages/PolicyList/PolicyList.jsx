import { useState, useEffect } from "react";
import { Paper, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PolicyTable from "./components/PolicyTable";
import Filters from "../../components/Filters";

const PolicyList = ({ data }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("dateCreated");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPolicyType, setSelectedPolicyType] = useState("");
  const [newFilteredData, setNewFilteredData] = useState(data);

  const navigate = useNavigate();
  const uniqueCategories = [
    ...new Set(data.reduce((acc, policy) => acc.concat(policy.categories), [])),
  ];
  const uniqueTags = [
    ...new Set(data.reduce((acc, policy) => acc.concat(policy.tags), [])),
  ];
  const uniquePolicyTypes = [
    ...new Set(data.map((policy) => policy.policyType)),
  ];

  // Create filterButtons array
  const filterButtons = [
    { name: "Categories", data: uniqueCategories, keyName: "categories" },
    { name: "Tags", data: uniqueTags, keyName: "tags" },
    { name: "Policy Type", data: uniquePolicyTypes, keyName: "policyType" },
  ];

  const handleFilterChange = (givenArray) => {
    // let filteredData = [];
    // // Iterate through each object in the given array
    // for (const givenObject of givenArray) {
    //   // Filter policies based on the given object's properties
    //   const matchingPolicies = data.filter((policy) =>
    //     Object.keys(givenObject).every(
    //       (key) => policy[key] === givenObject[key]
    //     )
    //   );
    //   // Add matching policies to the filteredData array
    //   filteredData.push(...matchingPolicies);

    // }

    const filteredData = data.filter((item) => {
      if (Object.keys(givenArray).length > 0) {
        for (let key in givenArray) {
          if (item[key] === undefined || !givenArray[key].includes(item[key])) {
            return false;
          }
        }
      }
      return true;
    });

    console.log(filteredData);
    setNewFilteredData(filteredData);
  };

  useEffect(() => {
    if (newFilteredData.length > 0) {
      console.log(newFilteredData);
    }
  }, [newFilteredData]);

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

  const sortedData = newFilteredData.sort((a, b) => {
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
        <Filters
          filterButtons={filterButtons}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleFilterChange={handleFilterChange}
          setSelectedTags={setSelectedTags}
        />
        <PolicyTable
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
          sortedData={sortedData}
          handleRowClick={handleRowClick}
          order={order}
        />
      </div>
    </Paper>
  );
};

export default PolicyList;
