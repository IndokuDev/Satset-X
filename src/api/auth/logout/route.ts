import { SatsetResponse } from "satset-react";

export async function POST() {
  const res = SatsetResponse.json({ message: "Logout success" });
  res.cookies.delete("token", { path: "/" });  
  return SatsetResponse.redirect("/auth/login");
}
