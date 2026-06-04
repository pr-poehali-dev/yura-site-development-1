import Header from "@/components/Header";
import HeroNok from "@/components/HeroNok";

const Index = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--navy-950)", fontFamily: "'Manrope', sans-serif" }}>
      <Header />
      <main>
        <HeroNok />
      </main>
    </div>
  );
};

export default Index;
