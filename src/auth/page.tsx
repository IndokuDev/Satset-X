"use client"
import { useRouter, useTranslation } from "satset-react";

export async function getMetadata({ t }) {
  return {
    title: t("auth.title"),
    description: t("auth.description"),
  };
}

export default function Auth() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div>
      <h1>{t("auth.title")}</h1>
      <button onClick={() => router.push("/auth/register")}>{t("auth.register.button")}</button>
      <button onClick={() => router.push("/auth/login")}>{t("auth.login.button")}</button>
    </div>
  );
}
