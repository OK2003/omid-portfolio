const INTERESTS = [
  "Drilling Engineering",
  "Well Hydraulics",
  "Reservoir Engineering",
  "Production Engineering",
  "Artificial Intelligence",
  "Engineering Software Development",
];

export function AboutSection() {
  return (
    <section className="about-guardian-section">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="about-guardian-grid">
          <div className="guardian-stage" aria-label="Golden guardian of Iran">
            <div className="guardian-aura guardian-aura-one" aria-hidden="true" />
            <div className="guardian-aura guardian-aura-two" aria-hidden="true" />
            <div className="guardian-frame">
              <video
                className="guardian-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/images/guardian-of-iran.png"
                aria-label="Animated golden winged guardian standing before the map of Iran"
              >
                <source src="/videos/guardian-of-iran.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="guardian-caption">Guardian of Iran</p>
          </div>

          <div className="about-copy">
            <p className="about-eyebrow">Responsibility can be the beginning</p>
            <h1 className="about-title">of liberation.</h1>
            <div className="about-description">
              <p>
                I am a son of an ancient land, with a deep belief in the strength and potential of the Iranian people—people who have stood firm in the most challenging circumstances, carved paths through limitations, and tied their name to knowledge, perseverance, and integrity.
              </p>
              <p>
                My ambition is to help build a future where expertise, commitment, and meaningful work are truly valued; a future in which Iranian youth do not have to abandon hope to pursue their dreams, but can build that hope within their own homeland.
              </p>
              <p>
                I believe in an Iran whose strength lies not only in its resources and history, but in innovative minds, capable hands, creative engineers, courageous entrepreneurs, and people who refuse to surrender to hardship. A great Iran is not built through slogans; it is built through knowledge, discipline, accountability, and a will that does not bow before obstacles.
              </p>
              <p>
                My purpose is to make a contribution—even if small—to the development of this land: by building, learning, creating solutions, and transforming knowledge into capability. Through my expertise and persistent effort, I want to help shape a country worthy of its proud history and its honorable people.
              </p>
              <p>
                I work for a future in which the name of Iran represents not only a glorious past, but also progress, dignity, innovation, and scientific excellence.
              </p>
              <p>The road may be difficult, but I was not made for easy roads.</p>
              <p>
                I believe in Iran and irani
                <br />
                and I will stand for its future with everything I have.
              </p>
              <p className="about-signature">OMID REZA KEYSHAMS</p>
            </div>

            <div className="about-divider" aria-hidden="true" />
            <h2 className="about-interests-title">Areas of interest</h2>
            <ul className="about-interests">
              {INTERESTS.map((interest) => (
                <li key={interest} className="about-interest">
                  <span aria-hidden="true" />
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
