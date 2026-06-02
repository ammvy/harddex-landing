import { ScrollToBounce } from "@/components/scroll-to-bounce";
import Container from "@/components/ui/container";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background">
      <Container className="relative">
        <Logo />
        <ScrollToBounce
          direction="bottom"
          containerClassName="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </Container>
      <Container> </Container>
    </div>
  );
}
