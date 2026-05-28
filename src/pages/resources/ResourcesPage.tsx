import { useState, type Dispatch, type SetStateAction } from "react";
import ResourceForm from "../../components/forms/ResourcesForm";

type ResourcesPageProps = {
  teamPoints: number;
  setTeamPoints: Dispatch<SetStateAction<number>>;
};

function ResourcesPage({ teamPoints, setTeamPoints }: ResourcesPageProps) {
  const [newResource, setNewResource] = useState("");
  const [resources, setResources] = useState([
    { id: 1, name: "React Router notes" },
    { id: 2, name: "TypeScript practice guide" },
  ]);

  function addResource() {
    if (newResource.trim() === "") {
      return;
    }

    const nextResource = {
      id: Date.now(),
      name: newResource,
    };

    setResources([...resources, nextResource]);
    setNewResource("");
    setTeamPoints((points) => points + 1);
  }

  function removeResource(id: number) {
    setResources(resources.filter((resource) => resource.id !== id));
    setTeamPoints((points) => points + 1);
  }

  return (
    <section className="page-card">
      <h2>Study Resources</h2>

      <p className="page-description">
        This page lets students save and remove useful study resources.
      </p>

      <div className="shared-box">
        <strong>Team activity points:</strong>
        <span>{teamPoints}</span>
        <button type="button" onClick={() => setTeamPoints((points) => points + 1)}>
          Add Point
        </button>
      </div>

      <ResourceForm
        newResource={newResource}
        setNewResource={setNewResource}
        addResource={addResource}
      />

      <p className="preview-text">
        Draft resource: {newResource || "Nothing typed yet"}
      </p>

      <ul className="item-list">
        {resources.map((resource) => (
          <li key={resource.id}>
            <span>{resource.name}</span>
            <button
              type="button"
              className="remove-button"
              onClick={() => removeResource(resource.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ResourcesPage;