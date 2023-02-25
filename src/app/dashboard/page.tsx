import type { Metadata } from "next";
import Link from "next/link";
import { getVehiclesByUserId } from "~/server/vehicle";
import { getServerUserId } from "~/utils/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const userId = await getServerUserId();
  if (!userId) return null; // TODO: redirect to login (or maybe just show a login button?)
  const vehicles = await getVehiclesByUserId(userId);

  return (
    <div className="dashboard-page">
      <h1 className="mb-10">Dashboard</h1>

      <ul className="mb-10 flex flex-col gap-5">
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            <div>
              <h3>
                {vehicle.title} ({vehicle.vehicleNo})
              </h3>
              <Link
                href={`/dashboard/vehicles/${vehicle.id}`}
                className="btn-sm btn"
              >
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <Link href="/dashboard/vehicles/add" className="btn">
        Add Vehicle
      </Link>
    </div>
  );
}
