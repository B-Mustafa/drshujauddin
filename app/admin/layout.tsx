import Navbar from '@/components/Navbar';
// Import other necessary components

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Navbar isAdminRoute={true} />
      {/* Other admin layout components */}
      {children}
    </div>
  );
}