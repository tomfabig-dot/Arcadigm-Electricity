import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSession } from "../lib/auth";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const session = getSession();
  const loc = useLocation();
  if (!session) {
    return <Navigate to="/sign-in" replace state={{ from: loc.pathname }} />;
  }
  return <>{children}</>;
}
