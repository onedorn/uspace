import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240; // Set the width of the sidebar

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          // Adjust below to accommodate navbar height
          mt: 8.5, // Assuming AppBar with height of 64px
          height: `calc(100vh - 70px)`, // Subtract the height of the AppBar
        },
      }}
    >
      <List>
        <Typography variant="h6" noWrap sx={{ p: 2 }}>
          Dashboard
        </Typography>
        <Divider />

        {/* Settings Group */}
        <ListItem button onClick={() => navigate('/student/profile')}>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => navigate('/student/settings')}>
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />

        {/* Lists Group */}
        <Typography variant="h6" noWrap sx={{ p: 2 }}>
          Lists
        </Typography>
        <ListItem button onClick={() => navigate('/student/list1')}>
          <ListItemText primary="List 1" />
        </ListItem>
        <ListItem button onClick={() => navigate('/student/list2')}>
          <ListItemText primary="List 2" />
        </ListItem>
        <Divider />

        {/* Statistics Group */}
        <Typography variant="h6" noWrap sx={{ p: 2 }}>
          Statistics
        </Typography>
        <ListItem button onClick={() => navigate('/student/stats')}>
          <ListItemText primary="View Stats" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
