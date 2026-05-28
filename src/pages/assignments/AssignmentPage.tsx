import type { Dispatch, SetStateAction } from "react";

type AssignmentsPageProps = {
  teamPoints: number;
  setTeamPoints: Dispatch<SetStateAction<number>>;
};

function AssignmentsPage({ teamPoints, setTeamPoints }: AssignmentsPageProps) {
  return (
    <section className="page-card">
      <h2>Assignments</h2>
      <p className="page-description">
        This page will help students manage assignment tasks.
      </p>

      <div className="shared-box">
        <strong>Team activity points:</strong>
        <span>{teamPoints}</span>
        <button type="button" onClick={() => setTeamPoints((points) => points + 1)}>
          Add Point
        </button>
      </div>
    </section>
  );
}

export default AssignmentsPage;