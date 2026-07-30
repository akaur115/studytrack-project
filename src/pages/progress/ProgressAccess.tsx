import {
  Show,
  SignInButton,
} from "@clerk/react-router";

import ProgressPage from "./ProgressPage";

function ProgressAccess() {
  return (
    <>
      <Show when="signed-in">
        <ProgressPage />
      </Show>

      <Show when="signed-out">
        <section>
          <h2>Sign in required</h2>

          <p>
            Please log in to view and manage your progress tasks.
          </p>

          <SignInButton mode="modal">
            <button type="button">
              Log In
            </button>
          </SignInButton>
        </section>
      </Show>
    </>
  );
}

export default ProgressAccess;