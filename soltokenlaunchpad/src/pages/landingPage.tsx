import Header from "../components/landingpageComponents/header.tsx";
import Hero from "../components/landingpageComponents/hero.tsx";

export default function LandingPage() {
  return (
    <main className=" min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-300 overflow-hidden">
      <Header />
      <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-8 md:px-12 lg:px-20">
        <Hero />
      </div>
    </main>
  )
}
