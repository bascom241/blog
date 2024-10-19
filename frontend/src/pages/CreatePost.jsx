import React, { useState, useContext, useRef } from 'react';
import { BlogContext } from '../components/context/BlogContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const navigate = useNavigate();
  const { url, token } = useContext(BlogContext);
  const [formData, setFormData] = useState({ tittle: '', author: '', text: '' });
  const [image, setImage] = useState(null);
  const quillRef = useRef(null); // Ref for ReactQuill

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
  ];

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the raw HTML from the editor
    const quill = quillRef.current.getEditor(); // Get the Quill instance
    const rawText = quill.root.innerHTML; // Get the raw HTML
    const cleanText = rawText.replace(/<[^>]*>/g, ''); // Remove all HTML tags

    const formDataToSend = new FormData();
    formDataToSend.append('tittle', formData.tittle);
    formDataToSend.append('text', cleanText); // Use cleaned text
    formDataToSend.append('author', formData.author);

    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      const response = await axios.post(`${url}/api/list/posts/addPost`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Post created successfully', response);
      navigate('/');
      toast.success('Post added successfully');
    } catch (err) {
      console.error('Error creating post', err);
      toast.error('Please provide valid credentials');
    }
  };

  return (
    <div className="contento">
      <form className="add-content" onSubmit={handleSubmit}>
        <input
          type="file"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Blog title"
          name="tittle"
          value={formData.tittle}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Author Name"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
        />
        <ReactQuill
          className="text-edit"
          ref={quillRef} // Set the ref
          modules={modules}
          formats={formats}
          value={formData.text} // Keep this controlled
          onChange={(content) => setFormData(prev => ({ ...prev, text: content }))} // Keep text in state
        />

       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
