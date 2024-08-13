import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Chip,
} from "@mui/material";
import PolicyIcon from "@mui/icons-material/Description";
import DateIcon from "@mui/icons-material/CalendarToday";
import ReadStatusIcon from "@mui/icons-material/Visibility";
import CategoryIcon from "@mui/icons-material/Category";
import TagIcon from "@mui/icons-material/Label";
import PolicyTypeIcon from "@mui/icons-material/Policy";

const iconStyles = { marginRight: "5px", color: "#757575" };

function PolicyTable({
  orderBy,
  handleRequestSort,
  sortedData,
  handleRowClick,
  order
}) {
  return (
    <div>
      {" "}
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
              <TableCell>{row.categories}</TableCell>
              <TableCell>{row.tags.join(", ")}</TableCell>
              <TableCell>{row.policyType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PolicyTable;
