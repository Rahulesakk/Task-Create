import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Home() {
  const [task, setTask] = useState([]);
  const [addTask, setAddTask] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5001/api/v1/fetchAllTask`);
      setTask(res.data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleAddTask = async () => {
    const body = { desc: addTask };
    try {
      await axios.post(`http://localhost:5001/api/v1/addTask`, body);
      setAddTask('');
      setTimeout(fetchTask, 300);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/api/v1/updateTask/?id=${id}`, {
        status: newStatus,
      });
      setTimeout(fetchTask, 300); // Refresh task list
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return '#ffc107'; // Yellow
      case 'Pending':
        return '#17a2b8'; // Blue
      case 'Done':
        return '#28a745'; // Green
      default:
        return '#6c757d'; // Grey
    }
  };

  return (
    <Box sx={{ backgroundColor: '#c9c6c5', minHeight: '100vh', py: 4, color: 'white' }}>
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom color="black" align="center">
            Task Tracker App
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Add A Task"
              variant="outlined"
              value={addTask}
              onChange={(e) => setAddTask(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddTask}>
              Add Task
            </Button>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress color="primary" />
            </Box>
          ) : task.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center">
              No Tasks found.
            </Typography>
          ) : (
            <List>
              {task.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    borderBottom: '1px solid #ccc',
                    backgroundColor: getStatusColor(item.status),
                    borderRadius: 1,
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                  }}
                >
                  <ListItemText
                    primary={item.Desc}
                    primaryTypographyProps={{ color: 'white' }}
                  />
                  <Select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderRadius: 1,
                      minWidth: 100,
                    }}
                  >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </Select>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
