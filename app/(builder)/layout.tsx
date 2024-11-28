import Navbar from "@/features/page-builder/components/navbar";
import Sidebar from "@/features/page-builder/components/sidebar";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex-col">
      <Navbar />
      <div className="flex">
        {children}
        <Sidebar />
      </div>
    </div>
  );
}
