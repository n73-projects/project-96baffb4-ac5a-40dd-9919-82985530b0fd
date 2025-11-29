import { Header } from "./components/sections/header";
import { Hero } from "./components/sections/hero";
import { Services } from "./components/sections/services";
import { Team } from "./components/sections/team";
import { Contact } from "./components/sections/contact";
import { Footer } from "./components/sections/footer";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
