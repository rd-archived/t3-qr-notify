import type { Metadata } from "next";
import Link from "next/link";
import VehicleAddForm from "./form";

export const metadata: Metadata = {
  title: "Add vehicle",
};

export default function VehicleAddPage() {
  return (
    <div className="dashboard-page">
      <h1>Add new vehicle</h1>
      <VehicleAddForm />
    </div>
  );
}
