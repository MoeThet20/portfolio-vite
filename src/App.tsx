import ThreeBackground from "./components/ThreeBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <ThreeBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-slate-800 py-6 sm:py-8 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-slate-400 text-sm sm:text-base">
            © 2024 Developer Portfolio. Built with React, Three.js & Tailwind
            CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
