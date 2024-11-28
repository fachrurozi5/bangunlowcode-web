import PageSelector from "@/features/page-builder/components/page-selector";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <PageSelector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
