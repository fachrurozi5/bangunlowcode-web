import Navbar from "@/features/page-builder/components/navbar";
import WidgetList from "@/features/page-builder/components/widget-list";

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
        <WidgetList />
      </div>
    </div>
  );
}
