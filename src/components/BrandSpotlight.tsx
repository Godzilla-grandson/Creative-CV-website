import "./styles/BrandSpotlight.css";

const BrandSpotlight = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          The Brand I Relate To <span>Most</span>
        </h2>
        <div className="brand-content">
          <div className="brand-images">
            <img src="/images/diesel-1.jpg" alt="Diesel" />
            <img src="/images/diesel-2.png" alt="Diesel" />
          </div>
          <div className="brand-text">
            <h3>DIESEL</h3>
            <p className="brand-meta">L'Oréal Luxe - Fragrance</p>
            <h4>Why it resonates</h4>
            <p>Diesel has never chased approval, and that's exactly why I relate to it. The brand has built its identity around unapologetic self-expression, the same instinct that turned a pair of jeans into a statement rather than a basic. That instinct carries straight into its fragrances too, most visibly in a provocative bottle design that refuses to blend in, and in the fragrances themselves, often perceived as bold, unconventional, even a little polarising, never designed to please everyone.
As a designer, that resonates with how I think. I've always believed the most interesting work isn't the one that's easiest to accept, but the one that makes people pause and react. Diesel bottles that instinct into every product it makes, and that's the brand identity I find myself most drawn to.
</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSpotlight;
