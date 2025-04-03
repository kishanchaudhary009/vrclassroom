// App.jsx
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import FPVControls from "./components/FPVControls";
import { useState } from "react"; // Import useState
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScreenShare from "./components/Sharescreendemo";
import FrameReceiver from "./components/Getscreen";
import { Final_Classroom } from "./components/Final_Classroom";
import { ClassroomWithLiveFrames } from "./components/ClassroomWithLiveFrames";
import Classroomsinglecomponent from "./components/Classroomfinalcomponent";
import Start3DClass from "./components/Startclass";
import JoinClassroom from "./components/JoinClassStudent";

function App() {
  const cameraPosition = [275.3004821595629, 139.81920790740085, -90.2255663511571];
  const fov = 50;
  const [isTeacher, setIsTeacher] = useState(false); // Add state for toggle

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Router>
        <Routes>
          {/* <Route
            path="/connectclass"
            element={
              <div style={{ width: "100vw", height: "100vh" }}>
                 <Classroomsinglecomponent />
              </div>
            }
          /> */}
          <Route path="/startclass" element={<Start3DClass />} />
          <Route path="/share" element={<ScreenShare />} />
          <Route path="/joinclass" element={<JoinClassroom />} />
          <Route path="/democlassroom" element={<Classroomsinglecomponent />} />
        </Routes>
      </Router>

    </div>

    // <div>
    //   <Router>
    //     <Routes>
    //       <Route path="/share" element={<ScreenShare />} />
    //       <Route path="/getshare" element={<FrameReceiver />} />
    //       <Route path="/connectclass" element={<Final_Classroom />} />
    //     </Routes>
    //   </Router>
    // </div>
  );
}

export default App;