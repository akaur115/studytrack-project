type HomePageProps = {
  teamPoints: number;
};

function HomePage({ teamPoints }: HomePageProps) {
  return (
    <section className="page-card">
      <h2>Welcome to StudyTrack</h2>

      <p className="page-description">
        StudyTrack helps students organize assignments, share resources,
        and track team project progress in one place.
      </p>

      <div className="shared-box">
        <strong>Team activity points:</strong>
        <span>{teamPoints}</span>
      </div>
    </section>
  );
}

export default HomePage;