import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function Logout() {
  useEffect(() => {
    signOut({ callbackUrl: "/login" });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      You are being logged out...
    </div>
  );
}
