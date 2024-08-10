import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { DocumentData } from "../types/DocumentData";

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const { user } = useAuth(); // Access user data from useAuth

  useEffect(() => {
    const fetchDocuments = async () => {
      if (user?.userId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/documents/${user.userId}`);
          
          // Ensure the data is properly typed
          const documents: DocumentData[] = response.data.documents.map((doc: {
            id: string;
            extractedText: string;
            createdAt: string;
            hash: string;
          }) => ({
            id: doc.id,
            extractedText: doc.extractedText,
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
              <p><strong>Extracted Text:</strong> {doc.extractedText}</p>
              
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
