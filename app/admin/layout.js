import "../globals.css";
import AdminHeader from "../../components/admin/AdminHeader";

export const metadata = {
  title: "Admin – Ani Hambardzumian Studios"
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-white">
      <AdminHeader />
      <main className="flex-1 pt-20">
        <div className="container-page py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
