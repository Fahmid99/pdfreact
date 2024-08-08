import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import ListIcon from "@mui/icons-material/List";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Sidebar({ data, handleSideBar }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(true);

  const links = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Inbox", path: "/inbox", icon: <InboxIcon /> },
    { text: "Policies List", path: "/policieslist", icon: <ListIcon /> },
  ];

  const filteredData = data.filter((data) => !data.readStatus);
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const handleToggle = () => {
    setOpen(!open);
    handleSideBar();
  };

  return (
    <div
      style={{
        background: "#eeeeee",
        boxShadow: "50px",
        border: "1px solid #e0e0e0",
        height: "100vh",
        padding: "20px",
        width: open ? "350px" : "100px",
        transition: "width 0.3s",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        {open && (
          <h1 style={{ fontSize: "24px", margin: "5px" }}>Policies Portal</h1>
        )}
        <IconButton onClick={handleToggle}>
          {open ? <CloseIcon /> : <MenuIcon style={{marginLeft:"8px"}} />}
        </IconButton>
      </Box>
      <Divider />
      <Collapse in={open}>
        <List>
          {links.map((link, index) => (
            <ListItem
              button
              component={NavLink}
              to={link.path}
              key={index}
              onClick={() => handleListItemClick(index)}
              sx={{
                paddingRight: "100px",
                backgroundColor:
                  selectedIndex === index ? "white" : "transparent",
                borderRadius: selectedIndex === index ? "8px" : "0",
                "& .MuiListItemText-primary": {
                  fontWeight: selectedIndex === index ? "600" : "300",
                },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {link.icon}
                <ListItemText primary={link.text} />
                {link.text === "Inbox" && (
                  <Chip
                    label={filteredData.length}
                    size="small"
                    sx={{
                      marginLeft: "8px",
                      background: "#f4511e",
                      color: "white",
                    }}
                  />
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Collapse>
      {!open && (
        <List>
          {links.map((link, index) => (
            <ListItem
              button
              component={NavLink}
              to={link.path}
              key={index}
              onClick={() => handleListItemClick(index)}
              sx={{
                justifyContent: "flex-start",
                paddingRight: "0",
                backgroundColor:
                  selectedIndex === index ? "white" : "transparent",
                borderRadius: selectedIndex === index ? "8px" : "0",
                "& .MuiListItemText-primary": {
                  fontWeight: selectedIndex === index ? "600" : "300",
                },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {link.icon}
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default Sidebar;
