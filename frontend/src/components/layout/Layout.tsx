import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <div className="site-brand">
          <h1>StudyTrack</h1>
          <p>
            A student planning app for assignments, resources, and progress.
          </p>
        </div>

        <div className="navigation-row">
          <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>

            <NavLink to="/assignments">Assignments</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/progress">Progress</NavLink>

            <SignedIn>
              <NavLink to="/profile">Profile</NavLink>
            </SignedIn>
          </nav>

          <div className="authentication-actions">
            <SignedOut>
              <SignInButton mode="modal">
                <button type="button" className="login-button">
                  Log In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button type="button" className="register-button">
                  Register
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="page-area">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Team Code: Dilraj, Arshpreet, and Jaspreet</p>
      </footer>
    </div>
  );
}

export default Layout;
