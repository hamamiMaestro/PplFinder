import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers(null);
  }, []);

  async function fetchUsers(filters) {
    console.log("fetchUsers called with filters:", filters);
    if (filters !== null) {
      filters = filters.join(",");
      console.log(filters);
    }
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api`, {
      params: {
        results: 25,
        page: 1,
        nat: filters,
      },
    });
    setIsLoading(false);
    // console.log(response.data);
    let newUsers = [...users, response.data.results];
    setUsers(newUsers);
    // setUsers(users.response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
