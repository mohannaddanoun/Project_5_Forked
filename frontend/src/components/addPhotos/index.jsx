import  { useState } from 'react';
import './style.css'; // Ensure correct path to your CSS file

const AddPhoto = ({ onUrlChange }) => {
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const uploadImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'xkrqdyag');
    data.append('cloud_name', 'dpsgompln');

    fetch('https://api.cloudinary.com/v1_1/dpsgompln/image/upload', {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        onUrlChange(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="add-photo-container">
      <div className="form-group">
        <input
          type="file"
          className="form-control-file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          className="btn btn-primary upload-button"
          onClick={uploadImage}
        >
          Upload
        </button>
      </div>
      <div className="image-preview">
        <h2>Uploaded Image:</h2>
        {url && <img src={url} alt="Uploaded" />}
      </div>
    </div>
  );
};

export default AddPhoto;
