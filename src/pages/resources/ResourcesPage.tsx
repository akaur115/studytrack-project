import type { Dispatch, SetStateAction } from "react";

type ResourcesPageProps = {
  teamPoints: number;
  setTeamPoints: Dispatch<SetStateAction<number>>;
};

function ResourcesPage({ teamPoints, setTeamPoints }: ResourcesPageProps) {
  return (
    <section className="page-card">
      <h2>Study Resources</h2>
      <p className="page-description">
        This page will help students save helpful study resources.
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

export default ResourcesPage;