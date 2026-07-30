import { NavLink, Outlet } from "react-router";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react-router";

import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <div>
          <h1>StudyTrack</h1>

          <p>
            A student planning app for assignments, resources,
            and progress.
          </p>
        </div>

        <nav
          className="site-nav"
          aria-label="Main navigation"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/assignments">Assignments</NavLink>
          <NavLink to="/resources">Resources</NavLink>

          <NavLink to="/progress">Progress</NavLink>

          <Show when="signed-in">
          <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button type="button" className="auth-button">
                Log In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button type="button" className="auth-button">
                Register
              </button>
            </SignUpButton>
          </Show>
        </nav>
      </header>

      <main className="page-area">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>
          Team Code: Dilraj, Arshpreet, and Jaspreet
        </p>
      </footer>
    </div>
  );
}

export default Layout;