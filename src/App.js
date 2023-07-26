import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=50');
      const data = await response.json();
      setUsers(data.results);
      setFilteredUsers(data.results);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    filterUsers();
  };

  const handleFilter = () => {
    filterUsers();
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchName) {
      filtered = filtered.filter((user) =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (ageRange) {
      const [minAge, maxAge] = ageRange.split('-').map(Number);
      filtered = filtered.filter((user) => user.dob.age >= minAge && user.dob.age <= maxAge);
    }

    if (nationality) {
      filtered = filtered.filter((user) => user.nat === nationality);
    }

    if (gender) {
      filtered = filtered.filter((user) => user.gender === gender);
    }

    setFilteredUsers(filtered);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Random User Filter
      </Typography>
      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        value={searchName}
        onChange={handleSearch}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        style={{ marginBottom: 10 }}
      />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Age Range</InputLabel>
            <Select value={ageRange} label="Age Range" onChange={(e) => setAgeRange(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="0-20">0-20</MenuItem>
              <MenuItem value="21-40">21-40</MenuItem>
              <MenuItem value="41-60">41-60</MenuItem>
              <MenuItem value="61-80">61-80</MenuItem>
              <MenuItem value="81-100">81-100</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Nationality</InputLabel>
            <Select
              value={nationality}
              label="Nationality"
              onChange={(e) => setNationality(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="AU">Australia</MenuItem>
              <MenuItem value="BR">Brazil</MenuItem>
              <MenuItem value="CA">Canada</MenuItem>
              {/* Add more nationalities here */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        <Grid container spacing={2}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.login.uuid}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={user.picture.large}
                  alt={user.name.first}
                />
                <CardContent>
                  <Typography variant="h6">
                    {`${user.name.first} ${user.name.last}`}
                  </Typography>
                  <Typography variant="body2">
                    Age: {user.dob.age}
                  </Typography>
                  <Typography variant="body2">
                    Nationality: {user.nat}
                  </Typography>
                  <Typography variant="body2">
                    Gender: {user.gender}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default App;
