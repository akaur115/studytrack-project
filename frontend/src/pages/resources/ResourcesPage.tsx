import { useAuth } from "@clerk/clerk-react";
import { useState, type Dispatch, type SetStateAction } from "react";

import ResourceForm from "../../components/forms/ResourceForm";
import { useResourceCategories } from "../../hooks/useResourceCategories";
import { useResources } from "../../hooks/useResources";
import type { ResourceCategory } from "../../types/StudyResource";

type ResourcesPageProps = {
  teamPoints?: number;
  setTeamPoints?: Dispatch<SetStateAction<number>>;
};

function ResourcesPage({
  teamPoints,
  setTeamPoints,
}: ResourcesPageProps) {
  const { isSignedIn } = useAuth();

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

  const {
    filterCategoryOptions,
    getCategoryLabel,
  } = useResourceCategories();

  async function handleAddResource() {
    if (!isSignedIn) {
      return;
    }

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
    if (!isSignedIn) {
      return;
    }

    await removeResource(id);
    setTeamPoints?.((points) => points + 1);
  }

  async function handleToggleSaved(id: number) {
    if (!isSignedIn) {
      return;
    }

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

      {!isSignedIn && (
        <p>
          You can view and filter resources as a guest. Sign in to add,
          complete, or remove resources.
        </p>
      )}

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

          {isSignedIn && (
            <button
              type="button"
              onClick={() =>
                setTeamPoints?.((points) => points + 1)
              }
            >
              Add Point
            </button>
          )}
        </div>
      )}

      {isSignedIn && (
        <>
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
        </>
      )}

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
          {filterCategoryOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="resource-grid">
        {visibleResources.map((resource) => (
          <div
            key={resource.id}
            className="resource-card"
          >
            <div className="resource-card-header">
              <h3>{resource.name}</h3>

              <span
                className={
                  resource.saved
                    ? "status completed"
                    : "status pending"
                }
              >
                {resource.saved ? "Completed" : "Pending"}
              </span>
            </div>

            <p>
              <strong>Category:</strong>{" "}
              {getCategoryLabel(resource.category)}
            </p>

            <p>
              <strong>Source:</strong> {resource.source}
            </p>

            {isSignedIn && (
              <div className="resource-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleToggleSaved(resource.id)
                  }
                >
                  {resource.saved
                    ? "Mark Pending"
                    : "Complete"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveResource(resource.id)
                  }
                  className="delete-btn"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ResourcesPage;