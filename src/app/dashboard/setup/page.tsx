import type { Metadata } from "next";
import Form from "./form";

export const metadata: Metadata = {
  title: "Setup",
};

export default function SetupPage() {
  return (
    <div className="setup-page">
      <Form />
    </div>
  );
}
