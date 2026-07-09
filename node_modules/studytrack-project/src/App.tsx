import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/home/HomePage";
import AssignmentsPage from "./pages/assignments/AssignmentPage";
import ResourcesPage from "./pages/resources/ResourcesPage";
import ProgressPage from "./pages/progress/ProgressPage";

function App() {
  const [teamPoints, setTeamPoints] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage teamPoints={teamPoints} />} />
        <Route
          path="assignments"
          element={
            <AssignmentsPage
              teamPoints={teamPoints}
              setTeamPoints={setTeamPoints}
            />
          }
        />
        <Route
          path="resources"
          element={
            <ResourcesPage
              teamPoints={teamPoints}
              setTeamPoints={setTeamPoints}
            />
          }
        />
        <Route
          path="progress"
          element={
            <ProgressPage
              teamPoints={teamPoints}
              setTeamPoints={setTeamPoints}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;