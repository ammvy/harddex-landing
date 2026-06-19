"use client";

import dynamic from "next/dynamic";
import Container from "./ui/container";

function Footer() {
  return (
    <Container className="p-0 px-4 m-0 w-full mx-auto min-h-0">
      <footer
        className={`border-t border-foreground pt-6 pb-6 grid grid-cols-12 gap-4 items-center w-full`}
      >
        <div className="col-span-12 md:col-span-4">
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px]"
          >
            © 2026 Harddex<span className="text-primary">®</span>
          </span>
        </div>
        <div className="col-span-12 md:col-span-4 flex md:justify-center gap-5 text-[12px] lowercase">
          <a href="#" className="hover:text-primary">
            instagram
          </a>
          <a href="#" className="hover:text-primary">
            github
          </a>
          <a href="#" className="hover:text-primary">
            discord
          </a>
        </div>
        <div className="col-span-12 md:col-span-4" />
      </footer>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
