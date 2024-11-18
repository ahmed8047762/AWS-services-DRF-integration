/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Box,
  Typography 
} from '@mui/material';
import { getPosts, deletePost } from '../services/api';
import BlogModal from './BlogModal';
import BlogDetailModal from './BlogDetailModal';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await getPosts();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setDetailModalOpen(true);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Blog List
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setCreateModalOpen(true)}
        sx={{ mb: 2 }}
      >
        Create New Blog
      </Button>

      <List>
        {blogs.map((blog) => (
          <ListItem
            key={blog.id}
            sx={{ 
              border: '1px solid #ddd', 
              borderRadius: 1, 
              mb: 1,
              backgroundColor: '#fff' 
            }}
          >
            <ListItemText primary={blog.title} />
            <Box>
              <Button 
                size="small" 
                onClick={() => handleView(blog)}
                sx={{ mr: 1 }}
              >
                View
              </Button>
              <Button 
                size="small" 
                color="primary" 
                onClick={() => handleEdit(blog)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button 
                size="small" 
                color="error" 
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      <BlogModal
        open={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={fetchBlogs}
      />

      <BlogModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={fetchBlogs}
        blog={selectedBlog}
      />

      <BlogDetailModal
        open={isDetailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        blog={selectedBlog}
      />
    </Box>
  );
};

BlogList.propTypes = {
  // No props needed as this is our top-level component
};

export default BlogList;
