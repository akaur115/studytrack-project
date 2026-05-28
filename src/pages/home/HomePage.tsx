type HomePageProps = {
  teamPoints: number;
};

function HomePage({ teamPoints }: HomePageProps) {
  return (
    <section className="page-card">
      <h2>Welcome to StudyTrack</h2>

      <p className="page-description">
        StudyTrack helps students organize assignments, study resources, and
        team project progress in one place.
      </p>

      <div className="shared-box">
        <strong>Team activity points:</strong>
        <span>{teamPoints}</span>
      </div>

      <p className="page-description">
        Use the navigation links to open the Assignments, Study Resources, and
        Team Progress pages.
      </p>
    </section>
  );
}

export default HomePage;