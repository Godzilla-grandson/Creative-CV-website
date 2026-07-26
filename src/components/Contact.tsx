import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Thank You</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:h.sethia29@gmail.com" data-cursor="disable">
                h.sethia29@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+918160833190" data-cursor="disable">
                +91 8160833190
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>More here</h4>
            <a
              href="https://www.linkedin.com/in/hrishit-sethia-568160232/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BJh0dY2gzR1GTB83qzjvvKw%3D%3D"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.behance.net/hrishit7"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Portfolio <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Thank you for reading my story. <br />- <span>HRISHIT SETHIA</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
