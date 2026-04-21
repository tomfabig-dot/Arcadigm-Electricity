import { Routes, Route, Navigate } from "react-router-dom";
import MarketingLayout from "./components/MarketingLayout";
import PortalLayout from "./components/PortalLayout";
import Home from "./routes/Home";
import About from "./routes/About";
import WhyUs from "./routes/WhyUs";
import TrackRecord from "./routes/TrackRecord";
import Process from "./routes/Process";
import Contact from "./routes/Contact";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Dashboard from "./routes/portal/Dashboard";
import Sites from "./routes/portal/Sites";
import SiteDetail from "./routes/portal/SiteDetail";
import Improvements from "./routes/portal/Improvements";
import Projects from "./routes/portal/Projects";
import Users from "./routes/portal/Users";
import Integrations from "./routes/portal/Integrations";
import Settings from "./routes/portal/Settings";
import NotFound from "./routes/NotFound";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/track-record" element={<TrackRecord />} />
        <Route path="/process" element={<Process />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route
        path="/portal"
        element={
          <RequireAuth>
            <PortalLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/portal/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sites" element={<Sites />} />
        <Route path="sites/:id" element={<SiteDetail />} />
        <Route path="notifications" element={<Improvements />} />
        <Route path="projects" element={<Projects />} />
        <Route path="users" element={<Users />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
