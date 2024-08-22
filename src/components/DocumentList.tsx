// src/components/DocumentList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { DocumentData } from "../types/DocumentData";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFile} from 'react-icons/fa';

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return <FaFilePdf />;
    case 'doc':
    case 'docx':
      return <FaFileWord />;
    case 'xls':
    case 'xlsx':
      return <FaFileExcel />;
    case 'jpg':
    case 'jpeg':
    case 'png':
      return <FaFileImage />;
    default:
      return <FaFile />;
  }
};

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const { user } = useAuth(); // Access user data from useAuth

  useEffect(() => {
    const fetchDocuments = async () => {
      if (user?.userId) {
        try {
          const response = await axios.get(`https://api-rwjjhxim5q-uc.a.run.app/api/documents/${user.userId}`);
          
          const documents: DocumentData[] = response.data.documents.map((doc: {
            id: string;
            filename: string;
            createdAt: string;
            hash: string;
          }) => ({
            id: doc.id,
            filename: doc.filename,
            createdAt: doc.createdAt,
            hash: doc.hash || "", // Provide a default value if hash is missing
          }));

          setDocuments(documents);
        } catch (error) {
          console.error("Failed to fetch documents:", error);
          setDocuments([]); // Ensure documents is always an array
        }
      }
    };

    fetchDocuments();
  }, [user]);

  return (
    <div>
      <h2>Your Documents</h2>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <a 
                href={`/chat?documentId=${doc.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
              >
                {getFileIcon(doc.filename)}
                <span style={{ marginLeft: 8 }}>{doc.filename}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents found.</p>
      )}
    </div>
  );
};

export default DocumentList;
