import DashboardLayout from "../../layouts/DashboardLayout";

export default function AdminDashboard() {
  const role = "Admin"; // Replace with dynamic role detection logic

  return (
    <DashboardLayout role={role}>
      <h1 className="text-2xl font-bold text-deepSeaGreen">Admin Dashboard</h1>
      <p>Welcome! Manage users, boats, and bookings globally from here.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-bold">Total Users</h2>
          <p>125 active users</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-bold">Total Boats</h2>
          <p>45 boats in the system</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-bold">Total Bookings</h2>
          <p>230 bookings this year</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
