import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"; 
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import MiddleSection from "./components/MiddleSection";


export function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <SignUp/>
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/allPosts",
          element:(
            <ProtectedRoute>
              <MiddleSection />
            </ProtectedRoute>
          ) 
        },
        {
          path: "/getProfile/:id",
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          )
        }
      ]
    },
    
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
    
  )
}
