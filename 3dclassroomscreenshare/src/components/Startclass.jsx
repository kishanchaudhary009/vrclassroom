import React, { useState } from "react";
import { motion } from "framer-motion";
import ClassroomSingleComponent from "./Classroomfinalcomponent";
import axios from "axios";

const Start3DClass = () => {
  const [classCode, setClassCode] = useState(null);
  const [enterWorld, setEnterWorld] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateClassCode = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5001/create-classcode");
      setClassCode(res.data.classcode);
    } catch (error) {
      console.error("Error generating class code:", error);
      alert("Failed to generate class code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnterWorld = () => {
    setEnterWorld(true);
  };

  if (enterWorld) {
    return <ClassroomSingleComponent classCode = {classCode}/>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        backgroundColor: "#f3f4f6",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: "30px",
          borderRadius: "16px",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {!classCode ? (
          <button
            onClick={generateClassCode}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create 3D Classroom"}
          </button>
        ) : (
          <>
            <div style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>
              Class Code: <span style={{ color: "#3b82f6" }}>{classCode}</span>
            </div>
            <button
              onClick={handleEnterWorld}
              style={{
                padding: "10px 20px",
                backgroundColor: "#10b981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Enter 3D World
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Start3DClass;
