import type { Dispatch, SetStateAction } from "react";

type ProgressPageProps = {
  teamPoints: number;
  setTeamPoints: Dispatch<SetStateAction<number>>;
};

function ProgressPage({ teamPoints, setTeamPoints }: ProgressPageProps) {
  return (
    <section className="page-card">
      <h2>Team Progress</h2>
      <p className="page-description">
        This page will help the team track project progress.
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

export default ProgressPage;