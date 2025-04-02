import React, { useState } from "react";
import ClassroomSingleComponent from "./Classroomfinalcomponent";
import axios from "axios";

const JoinClassroom = () => {
  const [classCode, setClassCode] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (classCode.trim() === "") {
      alert("Please enter a valid class code!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5001/verify-classcode/${classCode}`
      );

      if (response.data.valid) {
        setJoined(true);
      } else {
        setError("Invalid Class Code. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying class code:", err);
      setError("Server Error! Please try again later.");
    }
  };

  if (joined) {
    return <ClassroomSingleComponent classCode={classCode} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white gap-4">
      <h1 className="text-3xl font-bold">Join 3D Classroom</h1>
      <input
        type="text"
        placeholder="Enter Class Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
        className="px-4 py-2 rounded-lg text-black w-64"
      />
      <button
        onClick={handleJoin}
        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-white"
      >
        Join Classroom
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default JoinClassroom;
