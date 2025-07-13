import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`) // fixed: use backticks for template literal
      .then((res) => {
        alert("Blog deleted successfully!");
        fetchBlogs();
      })
      .catch((err) => {
        console.log("Delete error:", err);
        alert("Failed to delete.");
      });
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`); // fixed: use backticks for template literal
  };

  return (
    <div style={{ backgroundColor: "white", padding: "30px" }}>
      <Grid container spacing={3}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {blog.title || "No Title"}
                </Typography>
                <Typography variant="h6">
                  {blog.content || "No Content"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={() => handleDelete(blog._id)}
                >
                  DELETE
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  onClick={() => handleUpdate(blog._id)}
                >
                  UPDATE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;