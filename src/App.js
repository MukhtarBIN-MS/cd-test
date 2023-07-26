import React, { useState, useEffect } from "react";
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
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";

// Array of countries to select from

const countriesData = [
  { value: "", label: "All" },
  { value: "AU", label: "Australia" },
  { value: "BR", label: "Brazil" },
  { value: "CA", label: "Canada" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "GB", label: "United Kingdom" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "MX", label: "Mexico" },
  { value: "RU", label: "Russia" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "ZA", label: "South Africa" },
  { value: "ES", label: "Spain" },
];

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetching user data from the https://randomuser.me/api/

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=50");
      const data = await response.json();
      setUsers(data.results);
      setFilteredUsers(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  };

  // This functiion handle the search input and return the searched users

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    filterUsers();
  };

  const handleFilter = () => {
    filterUsers();
  };

  // This function takes the filter input and return the filtered data
  const filterUsers = () => {
    let filtered = users;

    if (searchName) {
      filtered = filtered.filter((user) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
      );
    }

    if (ageRange) {
      const [minAge, maxAge] = ageRange.split("-").map(Number);
      filtered = filtered.filter(
        (user) => user.dob.age >= minAge && user.dob.age <= maxAge
      );
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
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        CodeLab Test
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={4}>
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
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Age Range</InputLabel>
            <Select
              value={ageRange}
              label="Age Range"
              onChange={(e) => setAgeRange(e.target.value)}
            >
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
              {countriesData.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Filter
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      <div style={{ marginTop: 20 }}>
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : filteredUsers.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No user found.
          </Typography>
        ) : (
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
                    <Typography variant="body2">Age: {user.dob.age}</Typography>
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
        )}
      </div>
    </Container>
  );
};

export default App;
