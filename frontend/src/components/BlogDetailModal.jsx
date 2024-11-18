// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

const BlogDetailModal = ({ open, onClose, blog }) => {
  if (!blog) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Blog Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {blog.content}
        </Typography>
        {blog.media && (
          <Box sx={{ mt: 2 }}>
            {blog.media.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img
                src={blog.media}
                alt="Blog media"
                style={{ maxWidth: '100%', maxHeight: 400 }}
              />
            ) : (
              <video
                controls
                style={{ maxWidth: '100%', maxHeight: 400 }}
              >
                <source src={blog.media} />
                Your browser does not support the video tag.
              </video>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

BlogDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    media: PropTypes.string
  })
};

export default BlogDetailModal;
