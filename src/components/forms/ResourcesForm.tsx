type ResourceFormProps = {
  newResource: string;
  setNewResource: (value: string) => void;
  addResource: () => void;
};

function ResourceForm({
  newResource,
  setNewResource,
  addResource,
}: ResourceFormProps) {
  return (
    <div className="form-row">
      <input
        type="text"
        value={newResource}
        onChange={(event) => setNewResource(event.target.value)}
        placeholder="Enter study resource"
        aria-label="Study resource"
      />

      <button type="button" onClick={addResource}>
        Add Resource
      </button>
    </div>
  );
}

export default ResourceForm;