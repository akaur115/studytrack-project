import type { ProgressStatus } from "../types/ProgressTask";
type ProgressStatusOption = {
  value: ProgressStatus;
  label: string;
};

type ProgressFilterOption = {
  value: ProgressStatus | "All";
  label: string;
};

export function useProgressStatuses() {

  const progressStatusOptions: ProgressStatusOption[] = [
    { value: "Planned", label: "Planned" },
    { value: "In Progress", label: "In Progress" },
    { value: "Blocked", label: "Blocked" },
    { value: "Done", label: "Done" },
  ];

  const progressFilterOptions: ProgressFilterOption[] = [
    { value: "All", label: "All Tasks" },
    ...progressStatusOptions,
  ];

  function getStatusLabel(status: ProgressStatus | "All"): string {

    const selectedOption = progressFilterOptions.find(
      (option) => option.value === status
    );

    return selectedOption ? selectedOption.label : status;
  }

  /*

    Returned values:

    - progressStatusOptions: status options used by the progress form

    - progressFilterOptions: status options used by the filter dropdown

    - getStatusLabel: returns a readable label for each status

  */

  return {
    progressStatusOptions,
    progressFilterOptions,
    getStatusLabel,
  };

}
 