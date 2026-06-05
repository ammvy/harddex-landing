import { ScrollToBounce } from "@/components/scroll-to-bounce";
import Container from "@/components/ui/container";
import Logo from "./_components/logo";
import HeroPersonas from "./_components/hero-personas";
import HeroNavigations from "./_components/hero-navigations";
import HeroUseCases from "./_components/hero-use-cases";
import Footer from "@/components/footer";
import LandingHeader from "./_components/header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Container className="min-h-0 py-10 absolute right-10">
        <LandingHeader />
      </Container>
      <Container className="relative mx-auto">
        <Logo />
        <ScrollToBounce
          direction="bottom"
          containerClassName="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </Container>
      <HeroPersonas />
      <HeroNavigations />
      <HeroUseCases />
      <Footer />
    </div>
  );
}
