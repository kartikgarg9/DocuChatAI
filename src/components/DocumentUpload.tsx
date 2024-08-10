// src/components/DocumentUpload.tsx
import React, { useState } from "react";
import axios from "axios";
import { getFirebaseToken } from "../utils/getFirebaseToken"; // Import the token function

const DocumentUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = await getFirebaseToken(); // Get the token
      if (!token) {
        alert("Failed to retrieve authentication token.");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`, // Include the token in headers
        },
      });

      setUploadStatus(`Upload successful! Document ID: ${response.data.documentId}`);
    } catch (error) {
      console.error("Error uploading document:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default DocumentUpload;
