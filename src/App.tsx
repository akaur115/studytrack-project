import "./App.css";
import AssignmentList from "./components/assignment-list/AssignmentList";
import StudyResources from "./components/study-resources/StudyResources";
import TeamProgress from "./components/team-progress/TeamProgress";

function App() {
  return (
    <main className="app">
      <header className="app-header">
        <h1>StudyTrack</h1>
        <p>
          A student planning app for assignments, study resources, and team
          progress.
        </p>
      </header>

      <AssignmentList />
      <StudyResources />
      <TeamProgress />

      <footer className="app-footer">
        <p>Team Code: Dilraj, Arshpreet, and Jaspreet</p>
      </footer>
    </main>
  );
}

export default App;