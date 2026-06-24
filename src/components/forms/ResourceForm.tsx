import type { ChangeEvent, FormEvent } from "react";
import type { ResourceCategory } from "../../types/StudyResource";

type ResourceFormProps = {
  draftName: string;
  setDraftName: (value: string) => void;
  draftCategory: ResourceCategory;
  setDraftCategory: (value: ResourceCategory) => void;
  draftSource: string;
  setDraftSource: (value: string) => void;
  addResource: () => void;
};

const categoryOptions: ResourceCategory[] = [
  "Notes",
  "Video",
  "Practice",
  "Documentation",
];

function ResourceForm({
  draftName,
  setDraftName,
  draftCategory,
  setDraftCategory,
  draftSource,
  setDraftSource,
  addResource,
}: ResourceFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addResource();
  }

  return (
    <form className="resource-form-panel" onSubmit={handleSubmit}>
      <h3>Add Study Resource</h3>

      <div className="resource-form-grid">
        <label>
          Resource name
          <input
            type="text"
            value={draftName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDraftName(event.currentTarget.value)
            }
            placeholder="Example: TypeScript notes"
          />
        </label>

        <label>
          Category
          <select
            value={draftCategory}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setDraftCategory(event.currentTarget.value as ResourceCategory)
            }
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Source
          <input
            type="text"
            value={draftSource}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDraftSource(event.currentTarget.value)
            }
            placeholder="Example: Class notes, YouTube, React Docs"
          />
        </label>
      </div>

      <button type="submit" className="primary-action">
        Add Resource
      </button>
    </form>
  );
}

export default ResourceForm;