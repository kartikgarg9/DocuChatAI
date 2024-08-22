import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 50vw;
  margin: 2rem auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  background-color: #ffffff;
`;

const Message = styled.div<{ isUser?: boolean }>`
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  background-color: ${({ isUser }) => (isUser ? "#dcf8c6" : "#f1f1f1")};
  color: #333;
  padding: 0.75rem 1rem;
  border-radius: 15px;
  margin-bottom: 0.75rem;
  max-width: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.form`
  display: flex;
  padding: 1rem;
  background-color: #fafafa;
  border-top: 1px solid #ddd;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: none;
  outline: none;
  background-color: #f9f9f9;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  margin-left: 0.75rem;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  
  const documentId = new URLSearchParams(search).get("documentId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentId || !question.trim()) return;

    const userMessage = question.trim();
    setMessages([{ text: userMessage, isUser: true }, ...messages]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await axios.post("https://api-rwjjhxim5q-uc.a.run.app/api/ask", {
        documentId,
        question: userMessage,
      });
      const botMessage = response.data.answer || "I couldn't find an answer.";
      setMessages([{ text: botMessage, isUser: false }, { text: userMessage, isUser: true }, ...messages]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages([{ text: "Failed to get an answer.", isUser: false }, { text: userMessage, isUser: true }, ...messages]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer>
      <ChatWindow>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </ChatWindow>
      <InputContainer onSubmit={handleSubmit}>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          rows={1}
        />
        <SendButton type="submit" disabled={loading || !question.trim()}>
          {loading ? "Loading..." : "Send"}
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatPage;
