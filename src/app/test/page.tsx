import { ExampleGeometryViewer } from "@/components/3d/example-usage";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#1a2642] to-[#0f1b2e] text-white">
      {/* Hero Section */}
      <div className="container mx-auto flex min-h-[60vh] sm:min-h-[70vh] flex-col items-center justify-center gap-6 sm:gap-8 px-4 py-12 sm:py-16">
        <ExampleGeometryViewer />
      </div>
    </main>
  );
}
