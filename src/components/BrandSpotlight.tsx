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
            <img src="/images/placeholder.webp" alt="Diesel" />
            <img src="/images/placeholder.webp" alt="Diesel" />
          </div>
          <div className="brand-text">
            <h3>DIESEL</h3>
            <p className="brand-meta">L'Oréal Luxe — Fragrance</p>
            <h4>Why it resonates</h4>
            <p>[Placeholder — why Diesel, in your own words]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSpotlight;
