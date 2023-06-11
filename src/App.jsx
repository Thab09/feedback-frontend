import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AuthorizedUser from "./layouts/AuthorizedUser";
import YourBoxes from "./pages/YourBoxes";
import UserDashboard from "./pages/UserDashboard";
import CreateBox from "./pages/CreateBox";
import UserSettings from "./pages/UserSettings";
import Home from "./pages/Home";
import Features from "./pages/Features";
import PublicBoxes from "./pages/PublicBoxes";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <BrowserRouter>
      <ClerkProvider publishableKey={clerkPubKey}>
        <Routes>
          <Route element={<AuthorizedUser />}>
            <Route path="/yourboxes" element={<YourBoxes />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/createbox" element={<CreateBox />} />
            <Route path="/settings" element={<UserSettings />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/publicboxes" element={<PublicBoxes />} />
          {/* <Route path="/contact" element={<Home />} /> */}
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  );
}

export default App;
