import { ScrollToBounce } from "@/components/scroll-to-bounce";
import Container from "@/components/ui/container";
import Logo from "@/components/logo";
import HeroPersonas from "@/components/hero-personas";
import HeroNavigations from "@/components/hero-navigations";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Container className="relative mx-auto">
        <Logo />
        <ScrollToBounce
          direction="bottom"
          containerClassName="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </Container>
      <HeroPersonas />
      <HeroNavigations />
    </div>
  );
}
