import { SatsetResponse } from "satset-react";

export async function POST() {
  const res = SatsetResponse.json({ message: "Logout success" });
  res.cookies.delete("token", { path: "/" });
  
  // Since it's an API route called by a form, we might want to redirect
  // But standard API behavior returns JSON. 
  // However, the form in dashboard does a full page POST.
  // If I want to redirect back to login page after logout:
  
  return SatsetResponse.redirect("/auth/login");
}
