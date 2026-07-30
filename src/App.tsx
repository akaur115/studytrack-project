import { Route, Routes } from "react-router";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/home/HomePage";
import AssignmentsPage from "./pages/assignments/AssignmentPage";
import ResourcesPage from "./pages/resources/ResourcesPage";
import ProgressAccess from "./pages/progress/ProgressAccess";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={<HomePage teamPoints={0} />}
        />

        <Route
          path="/assignments"
          element={<AssignmentsPage />}
        />

        <Route
          path="/resources"
          element={<ResourcesPage />}
        />

        <Route
          path="/progress"
          element={<ProgressAccess />}
        />
      </Route>
    </Routes>
  );
}

export default App;