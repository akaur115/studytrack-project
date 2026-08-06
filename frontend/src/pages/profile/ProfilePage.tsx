import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

type AppUser = {
  id: number;
  clerkUserId: string;
  email: string | null;
  displayName: string | null;
  createdAt: string;
  updatedAt: string;
};

function SignedInProfile() {
  const { getToken } = useAuth();

  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function syncUser() {
    setIsLoading(true);
    setMessage("");

    try {
      const token = await getToken();

      if (!token) {
        throw new Error("No Clerk session token was available.");
      }

      const response = await fetch(
        `${API_URL}/users/me`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to synchronize user."
        );
      }

      setAppUser(data);
      setMessage("User saved successfully in PostgreSQL.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to synchronize user."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>My Profile</h1>

      <div>
        <UserButton />

        <SignOutButton>
          <button type="button">Sign Out</button>
        </SignOutButton>
      </div>

      <p>You are signed in through Clerk.</p>

      <button
        type="button"
        onClick={syncUser}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save My User Data"}
      </button>

      {message && <p>{message}</p>}

      {appUser && (
        <section>
          <h2>Application User</h2>

          <p>
            <strong>Database ID:</strong> {appUser.id}
          </p>

          <p>
            <strong>Clerk User ID:</strong>{" "}
            {appUser.clerkUserId}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {appUser.email || "Not available"}
          </p>

          <p>
            <strong>Name:</strong>{" "}
            {appUser.displayName || "Not available"}
          </p>
        </section>
      )}
    </main>
  );
}

export default function ProfilePage() {
  return (
    <>
      <SignedOut>
        <main>
          <h1>My Profile</h1>

          <p>
            Please sign in to view and save your profile.
          </p>

          <SignInButton mode="modal">
            <button type="button">Sign In</button>
          </SignInButton>
        </main>
      </SignedOut>

      <SignedIn>
        <SignedInProfile />
      </SignedIn>
    </>
  );
}