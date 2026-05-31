import Container from "@/components/ui/container";
import Logo from "@/components/ui/logo";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Container className="text-center">
        <Logo />
      </Container>
    </div>
  );
}
