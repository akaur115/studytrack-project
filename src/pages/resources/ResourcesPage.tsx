import { useState, type Dispatch, type SetStateAction } from "react";

import ResourceForm from "../../components/forms/ResourceForm";
import { useResources } from "../../hooks/useResources";
import {
  RESOURCE_CATEGORIES,
  type ResourceCategory,
} from "../../types/StudyResource";

type ResourcesPageProps = {
  teamPoints?: number;
  setTeamPoints?: Dispatch<SetStateAction<number>>;
};

const filterCategoryOptions = ["All", ...RESOURCE_CATEGORIES] as const;

function ResourcesPage({ teamPoints, setTeamPoints }: ResourcesPageProps) {
  const [draftName, setDraftName] = useState("");
  const [draftCategory, setDraftCategory] =
    useState<ResourceCategory>("Notes");
  const [draftSource, setDraftSource] = useState("");

  const {
    resources,
    visibleResources,
    categoryFilter,
    setCategoryFilter,
    savedCount,
    videoCount,
    addResource,
    removeResource,
    toggleSavedResource,
  } = useResources();

  function handleAddResource() {
    const resourceWasAdded = addResource(
      draftName,
      draftCategory,
      draftSource
    );

    if (!resourceWasAdded) {
      return;
    }

    setDraftName("");
    setDraftCategory("Notes");
    setDraftSource("");
    setTeamPoints?.((points) => points + 1);
  }

  function handleRemoveResource(id: number) {
    removeResource(id);
    setTeamPoints?.((points) => points + 1);
  }

  function handleToggleSaved(id: number) {
    toggleSavedResource(id);
    setTeamPoints?.((points) => points + 1);
  }

  return (
    <section className="page-card resource-page">
      <h2>Study Resource Library</h2>

      <p className="page-description">
        This page helps students organize study resources by category and saved
        status.
      </p>

      <div className="resource-dashboard">
        <article>
          <strong>{resources.length}</strong>
          <span>Total resources</span>
        </article>

        <article>
          <strong>{savedCount}</strong>
          <span>Saved resources</span>
        </article>

        <article>
          <strong>{videoCount}</strong>
          <span>Video resources</span>
        </article>
      </div>

      {teamPoints !== undefined && (
        <div className="shared-box">
          <strong>Team activity points:</strong>
          <span>{teamPoints}</span>

          <button
            type="button"
            onClick={() => setTeamPoints?.((points) => points + 1)}
          >
            Add Point
          </button>
        </div>
      )}

      <ResourceForm
        draftName={draftName}
        setDraftName={setDraftName}
        draftCategory={draftCategory}
        setDraftCategory={setDraftCategory}
        draftSource={draftSource}
        setDraftSource={setDraftSource}
        addResource={handleAddResource}
      />

      <div className="resource-preview">
        <h3>Resource Preview</h3>
        <p>{draftName || "No resource name typed yet"}</p>

        <small>
          {draftCategory} • {draftSource || "No source added"}
        </small>
      </div>

      <div className="resource-filter">
        <label htmlFor="resource-category-filter">
          Filter by category
        </label>

        <select
          id="resource-category-filter"
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(
              event.currentTarget.value as ResourceCategory | "All"
            )
          }
        >
          {filterCategoryOptions.map((category) => (
            <option key={category} value={category}>
              {category === "All" ? "All Resources" : category}
            </option>
          ))}
        </select>
      </div>

      <ul className="resource-card-list">
        {visibleResources.map((resource) => (
          <li
            key={resource.id}
            className={
              resource.saved
                ? "resource-card resource-card-saved"
                : "resource-card"
            }
          >
            <div className="resource-card-main">
              <h3>{resource.name}</h3>

              <p>
                {resource.category} • {resource.source}
              </p>

              <small>
                {resource.saved ? "Saved resource" : "Not saved yet"}
              </small>
            </div>

            <div className="resource-actions">
              <button
                type="button"
                onClick={() => handleToggleSaved(resource.id)}
              >
                {resource.saved ? "Unsave" : "Save"}
              </button>

              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveResource(resource.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ResourcesPage;