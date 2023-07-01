import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AuthorizedUser from "./layouts/AuthorizedUser";
import YourBoxes from "./pages/YourBoxes";
import UserDashboard from "./pages/UserDashboard";
import UserSettings from "./pages/UserSettings";
import Home from "./pages/Home";
import Features from "./pages/Features";
import PublicBoxes from "./pages/PublicBoxes";
import Navbar from "./components/Navbar";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Navbar />
        <Routes>
          <Route element={<AuthorizedUser />}>
            <Route path="/yourboxes" element={<YourBoxes />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/settings" element={<UserSettings />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/public" element={<PublicBoxes />} />
          {/* <Route path="/contact" element={<Home />} /> */}
        </Routes>
      </ClerkProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  );
}

export default App;
