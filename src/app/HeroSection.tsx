export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-nebula-gray px-4 py-16 text-center md:py-24">
      <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center">
        <h1 className="text-5xl text-crawl-gold md:text-7xl">
          Jedi Academy
        </h1>
        <p className="mt-4 text-lg text-dust-gray md:text-xl">
          Train with legendary Jedi Masters. Browse our courses and begin your
          path to becoming a Jedi Knight.
        </p>
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(245,197,24,0.03) 40px, rgba(245,197,24,0.03) 41px)",
        }}
      />
    </section>
  );
}
