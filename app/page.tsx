import { title, subtitle } from "@/components/primitives";
import { Cover } from "@/components/cover";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Ciao! mi chiamo </h1>
        <h1 className={title({ color: "violet" })}>Max</h1>
        <br />
        <h1 className={title()}>Questo è il mio Portfolio.</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Sono un Full-Stack Web Developer e sono appassionato di tecnologia.
        </h2>
        <Cover />
      </div>
    </section>
  );
}
