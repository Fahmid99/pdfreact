import { useState, useEffect, useMemo, useCallback } from "react";
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

  const uniqueCategories = useMemo(() => [
    ...new Set(data.reduce((acc, policy) => acc.concat(policy.categories), [])),
  ], [data]);

  const uniqueTags = useMemo(() => [
    ...new Set(data.reduce((acc, policy) => acc.concat(policy.tags), [])),
  ], [data]);

  const uniquePolicyTypes = useMemo(() => [
    ...new Set(data.map((policy) => policy.policyType)),
  ], [data]);

  const filterButtons = useMemo(() => [
    { name: "Categories", data: uniqueCategories, keyName: "categories" },
    { name: "Tags", data: uniqueTags, keyName: "tags" },
    { name: "Policy Type", data: uniquePolicyTypes, keyName: "policyType" },
  ], [uniqueCategories, uniqueTags, uniquePolicyTypes]);

  const handleFilterChange = useCallback((givenArray) => {
    const filteredData = data.filter((item) => {
      if (Object.keys(givenArray).length > 0) {
        for (let key in givenArray) {
          if (item[key] === undefined) {
            return false;
          }
          if (Array.isArray(item[key])) {
            if (!item[key].some(tag => givenArray[key].includes(tag))) {
              return false;
            }
          } else {
            if (!givenArray[key].includes(item[key])) {
              return false;
            }
          }
        }
      }
      return true;
    });

    setNewFilteredData(filteredData);
  }, [data]);

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

  const sortedData = useMemo(() => {
    return newFilteredData.sort((a, b) => {
      if (orderBy === "dateCreated") {
        return order === "asc"
          ? new Date(a[orderBy]) - new Date(b[orderBy])
          : new Date(b[orderBy]) - new Date(a[orderBy]);
      }
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    });
  }, [newFilteredData, order, orderBy]);

  return (
    <Paper
      style={{
        width: "100%",
        padding: "16px",
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
