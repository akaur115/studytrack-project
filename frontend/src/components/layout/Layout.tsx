import { createElement } from "react";
import { NavLink, Outlet } from "react-router";
import "./Layout.css";

function Layout() {
  return createElement(
    "div",
    { className: "layout" },
    createElement(
      "header",
      { className: "site-header" },
      createElement(
        "div",
        null,
        createElement("h1", null, "StudyTrack"),
        createElement(
          "p",
          null,
          "A student planning app for assignments, resources, and progress."
        )
      ),
      createElement(
        "nav",
        { className: "site-nav", "aria-label": "Main navigation" },
        createElement(NavLink, { to: "/" }, "Home"),
        createElement(NavLink, { to: "/assignments" }, "Assignments"),
        createElement(NavLink, { to: "/resources" }, "Resources"),
        createElement(NavLink, { to: "/progress" }, "Progress")
      )
    ),
    createElement(
      "main",
      { className: "page-area" },
      createElement(Outlet)
    ),
    createElement(
      "footer",
      { className: "site-footer" },
      createElement("p", null, "Team Code: Dilraj, Arshpreet, and Jaspreet")
    )
  );
}

export default Layout;