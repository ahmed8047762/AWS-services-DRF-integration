import {
  useState,
  useEffect
} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import { createPost, updatePost } from '../services/api';
import PropTypes from 'prop-types';

const BlogModal = ({ open, onClose, onSuccess, blog }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        media: null
      });
      if (blog.media) {
        setPreview(blog.media);
      }
    } else {
      setFormData({
        title: '',
        content: '',
        media: null
      });
      setPreview(null);
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        media: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      if (formData.media) {
        submitData.append('media', formData.media);
      }

      if (blog) {
        await updatePost(blog.id, submitData);
      } else {
        await createPost(submitData);
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{blog ? 'Update Blog' : 'Create Blog'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            multiline
            rows={4}
            fullWidth
            value={formData.content}
            onChange={handleChange}
            required
          />
          <Box sx={{ mt: 2 }}>
            <input
              accept="image/*,video/*"
              style={{ display: 'none' }}
              id="media-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="media-file">
              <Button variant="outlined" component="span">
                Upload Media
              </Button>
            </label>
          </Box>
          {preview && (
            <Box sx={{ mt: 2 }}>
              {preview.includes('image') ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ maxWidth: '100%', maxHeight: 200 }} 
                />
              ) : (
                <video 
                  controls 
                  src={preview} 
                  style={{ maxWidth: '100%', maxHeight: 200 }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {blog ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

BlogModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    media: PropTypes.string
  })
};

export default BlogModal;
