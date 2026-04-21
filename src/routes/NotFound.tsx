import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="text-center max-w-md">
        <p className="text-xs font-semibold tracking-widest uppercase text-brand">404</p>
        <h1 className="mt-3 text-4xl font-extrabold">Page not found</h1>
        <p className="mt-3 text-ink-muted">
          That page doesn't exist — but your energy data is still flowing.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/" className="btn-primary">Back to home</Link>
          <Link to="/portal/dashboard" className="btn-secondary">Open portal</Link>
        </div>
      </div>
    </div>
  );
}
