"use client";
import { useEffect } from "react";
import { useRouter } from "satset-react";

export function useGuard(isAuthed: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed) {
      router.push("/auth/login");
    }
  }, [isAuthed, router]);
}

