import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const DeleteProfileComponent = () => {
    const TOKEN = localStorage.getItem('token'); // Or wherever you store it after login

  const [profileId, setProfileId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Base API URL and Token from your environment or configuration
  const API_URL = "https://training.tamkeen-dev.com/tamkeenstore/public/api";
    
  const handleDelete = async (e) => {
    e.preventDefault();

    if (!profileId.trim()) {
      setMessage({
        text: "Please enter a valid profile number or ID.",
        type: "danger",
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Adjust the endpoint based on your API structure.
      // Example: DELETE {{url}}/address/{id} or a custom customer delete endpoint
      const response = await axios.delete(`${API_URL}/address/${profileId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`, // Replace TOKEN with your actual token string or state variable
        },
      });

      setMessage({
        text:
          response.data.message ||
          "Profile/Record successfully deleted from the server!",
        type: "success",
      });
      setProfileId(""); // Clear input on success
    } catch (error) {
      console.error("Delete error:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Failed to delete the profile. Please check the number and try again.";
      setMessage({ text: errorMsg, type: "danger" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <Card className="shadow-sm p-4">
        <Card.Body>
          <h3 className="mb-4 text-center">Delete Profile / Record</h3>

          {message.text && (
            <Alert
              variant={message.type}
              onClose={() => setMessage({ text: "", type: "" })}
              dismissible
            >
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleDelete}>
            <Form.Group className="mb-3" controlId="formProfileId">
              <Form.Label>Profile / Record Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number (e.g., 4)"
                value={profileId}
                onChange={(e) => setProfileId(e.target.value)}
                disabled={loading}
              />
              <Form.Text className="text-muted">
                Enter the ID or phone number identifier matching the server
                resource.
              </Form.Text>
            </Form.Group>

            <Button
              variant="danger"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete from Server"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeleteProfileComponent;
