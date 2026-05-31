import { ScrollToBounce } from "@/components/ui/scroll-to-bounce";
import Container from "@/components/ui/container";
import Logo from "@/components/ui/logo";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Container className="text-center">
        <Logo />
        <ScrollToBounce
          direction="bottom"
          containerClassName="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </Container>
    </div>
  );
}
