const loaderWords = ["MAHENDRA", "PRAJAPATI"];

const OakamePreloader = () => (
  <div className="portfolio-loader" role="status" aria-live="polite" aria-label="Mahendra Prajapati portfolio loading">
    <div className="portfolio-loader-panel portfolio-loader-panel--left" aria-hidden="true" />
    <div className="portfolio-loader-panel portfolio-loader-panel--right" aria-hidden="true" />
    <div className="portfolio-loader-grain" aria-hidden="true" />
    <div className="portfolio-loader-content">
      <p className="portfolio-loader-kicker">Oakâme inspired loader</p>
      <h1 className="portfolio-loader-name" aria-label="Mahendra Prajapati">
        {loaderWords.map((word, wordIndex) => (
          <span key={word} className="portfolio-loader-word" style={{ "--word-index": wordIndex }} aria-hidden="true">
            {[...word].map((letter, index) => (
              <span key={`${word}-${index}`} style={{ "--char-index": index }}>{letter}</span>
            ))}
          </span>
        ))}
      </h1>
      <div className="portfolio-loader-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  </div>
);

export default OakamePreloader;
