import { useState, type Dispatch, type SetStateAction } from "react";

import ResourceForm from "../../components/forms/ResourceForm";
import { useResourceCategories } from "../../hooks/useResourceCategories";
import { useResources } from "../../hooks/useResources";
import type { ResourceCategory } from "../../types/StudyResource";

type ResourcesPageProps = {
  teamPoints?: number;
  setTeamPoints?: Dispatch<SetStateAction<number>>;
};

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

  const { filterCategoryOptions, getCategoryLabel } = useResourceCategories();

  async function handleAddResource() {
    const resourceWasAdded = await addResource(
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

  async function handleRemoveResource(id: number) {
    await removeResource(id);
    setTeamPoints?.((points) => points + 1);
  }

  async function handleToggleSaved(id: number) {
    await toggleSavedResource(id);
    setTeamPoints?.((points) => points + 1);
  }

  return (
    <section className="page-card resource-page">
      <h2>Study Resource Library</h2>

      <p className="page-description">
        This page helps students save, filter, and manage study resources from
        the database.
      </p>

      <div className="resource-dashboard">
        <article>
          <strong>{resources.length}</strong>
          <span>Total resources</span>
        </article>

        <article>
          <strong>{savedCount}</strong>
          <span>Completed resources</span>
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
          {getCategoryLabel(draftCategory)} •{" "}
          {draftSource || "No source added"}
        </small>
      </div>

      <div className="resource-filter">
        <label htmlFor="resource-category-filter">Filter by category</label>

        <select
          id="resource-category-filter"
          value={categoryFilter}
          onChange={(event) =>
            setCategoryFilter(
              event.currentTarget.value as ResourceCategory | "All"
            )
          }
        >
          {filterCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
                {getCategoryLabel(resource.category)} • {resource.source}
              </p>

              <small>
                {resource.saved ? "Completed" : "Pending"}
              </small>
            </div>

            <div className="resource-actions">
              <button
                type="button"
                onClick={() => handleToggleSaved(resource.id)}
              >
                {resource.saved ? "Mark Pending" : "Mark Complete"}
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