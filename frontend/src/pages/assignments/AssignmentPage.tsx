import {
 useState,
 type Dispatch,
 type FormEvent,
 type SetStateAction,
} from "react";

import {
 SignedIn,
 SignedOut,
 SignInButton,
} from "@clerk/clerk-react";

import { useAssignments } from "../../hooks/useAssignments";
import type { AssignmentPriority } from "../../types/Assignment";

type AssignmentPageProps = {
 teamPoints?: number;
 setTeamPoints?: Dispatch<SetStateAction<number>>;
};

function AssignmentPage({
 teamPoints,
 setTeamPoints,
}: AssignmentPageProps) {
 const {
   visibleAssignments,
   priorityFilter,
   setPriorityFilter,
   completedCount,
   remainingCount,
   isLoading,
   addAssignment,
   removeAssignment,
   toggleAssignment,
 } = useAssignments();

 const [title, setTitle] = useState("");
 const [course, setCourse] = useState("");
 const [priority, setPriority] =
   useState<AssignmentPriority>("Medium");
 const [dueDate, setDueDate] = useState("");

 async function handleSubmit(
   event: FormEvent<HTMLFormElement>
 ): Promise<void> {
   event.preventDefault();

   if (!title.trim() || !course.trim() || !dueDate) {
     return;
   }

   await addAssignment(title, course, priority, dueDate);

   setTitle("");
   setCourse("");
   setPriority("Medium");
   setDueDate("");
 }

return (
  <main className="assignment-page">
    <h1>Assignment Planner</h1>
    
    <SignedOut>
      <section className="guest-message">
        <h2>Sign in required</h2>
        
        <p>
           Guests can explore StudyTrack, but you must sign in to
           create and manage your personal assignments.
        </p>
        
        <SignInButton mode="modal">
          <button type="button">
             Log in to manage assignments
          </button>
        </SignInButton>
      </section>
    </SignedOut>

    <SignedIn>
       {isLoading ? (
        <p>Loading assignments...</p>
      ) : (
        <>
          <section className="assignment-summary">
            <p>
               Total assignments: {visibleAssignments.length}
            </p>
            
            <p>Remaining: {remainingCount}</p>
            <p>Completed: {completedCount}</p>
          </section>
          
          <section className="team-points">
            <p>Team activity points: {teamPoints ?? 0}</p>
            <button
               type="button"
               onClick={() =>
                 setTeamPoints?.((points) => points + 1)
               }
              >
               Add Point
            </button>
          </section>

          <form
             className="assignment-form"
             onSubmit={handleSubmit}
          >
            <h2>Create a New Assignment</h2>
            
            <label htmlFor="assignment-title">
               Assignment title
            </label>
            <input
               id="assignment-title"
               value={title}
               onChange={(event) =>
                 setTitle(event.currentTarget.value)
               }
               placeholder="Example: Sprint 5 planning"
               required
             />
            <label htmlFor="assignment-course">
               Course
            </label>
            <input
               id="assignment-course"
               value={course}
               onChange={(event) =>
                 setCourse(event.currentTarget.value)
               }
               placeholder="Example: Full Stack"
               required
             />
            
            <label htmlFor="assignment-priority">
               Priority
            </label>
            <select
               id="assignment-priority"
               value={priority}
               onChange={(event) =>
                 setPriority(
                   event.currentTarget
                     .value as AssignmentPriority
                 )
               }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label htmlFor="assignment-due-date">
               Due date
            </label>
            <input
               id="assignment-due-date"
               type="date"
               value={dueDate}
               onChange={(event) =>
                 setDueDate(event.currentTarget.value)
               }
               required
             />

            <button type="submit">
               Save Assignment
            </button>
          </form>

          <section className="assignment-filter">
            <label htmlFor="assignment-filter">
               Filter by priority
            </label>

            <select
               id="assignment-filter"
               value={priorityFilter}
               onChange={(event) =>
                 setPriorityFilter(
                   event.currentTarget.value as
                     | AssignmentPriority
                     | "All"
                 )
               }
              >
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
          </section>

          <section className="assignment-list">
            <h2>Assignment Table</h2>
            
             {visibleAssignments.length === 0 ? (
              <p>You do not have any assignments yet.</p>
            ) : (
              <table className="assignment-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Course</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Completed</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                   {visibleAssignments.map(
                     (assignment) => (
                      <tr key={assignment.id}>
                        <td>{assignment.title}</td>
                        <td>{assignment.course}</td>
                        <td>
                           {assignment.priority} priority
                        </td>
                        <td>{assignment.dueDate}</td>
                        <td>
                           {assignment.completed
                             ? "completed"
                             : "remaining"}
                        </td>
                        <td>
                          <button
                             type="button"
                             onClick={() =>
                               void toggleAssignment(
                                assignment.id
                               )
                             }
                            >
                             {assignment.completed
                               ? "Undo"
                               : "Complete"}
                          </button>
                          
                          <button
                             type="button"
                             onClick={() =>
                               void removeAssignment(
                                assignment.id
                               )
                             }
                            >
                             Remove
                          </button>
                        </td>
                      </tr>
                     )
                   )}
                  </tbody>
                </table>
             )}
            </section>
          </>
       )}
      </SignedIn>
    </main>
  );
}

export default AssignmentPage;
