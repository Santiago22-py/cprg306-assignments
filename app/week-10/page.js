"use client";

//Import the useUserAuth hook
import { useUserAuth } from '../contexts/AuthContext';

//Default function for the Week 9 page
export default function Page() 
{
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    //Function to handle login
    const handleLogin = async () => 
    {   
        try 
        {
            await gitHubSignIn(); //Attempt to sign in
            console.log("Login successful");
        }
        //If there's an error, log it
        catch (error) 
        {
            console.error("Login failed:", error);
        }
    }

    //Function to handle logout
    const handleLogout = async () => 
    {
        try
        {
            await firebaseSignOut(); //Attempt to sign out
            console.log("Logout successful");
        } 
        //If there's an error, log it
        catch (error) 
        {
            console.error("Logout failed:", error);
        }
    }

 return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div className="rounded-xl bg-white p-8 shadow-md w-80">
        {!user ? (
          <>
            <h1 className="mb-6 text-2xl font-semibold text-gray-800">
              Welcome to Shopping List 🛒
            </h1>
            <p className="mb-6 text-sm text-gray-600">
              Please sign in with your GitHub account to continue.
            </p>
            <button
              onClick={handleLogin}
              className="w-full rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 transition"
            >
              Sign in with GitHub
            </button>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-2xl font-semibold text-gray-800">
              Welcome, {user.displayName || "User"}!
            </h1>
            <p className="mb-2 text-sm text-gray-600">
              {user.email ? `Email: ${user.email}` : ""}
            </p>
            <div className="flex flex-col gap-3 mt-6">

                <a href="/week-10/shopping-list"
                className="rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 transition"
                >
                  Go to Shopping List
                </a>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    
  );
}