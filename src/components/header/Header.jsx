import logo from "../../assets/icons/MYPODMIX.svg";
import bg from "../../assets/designs/bg.mp4";
import { motion as m } from "framer-motion";
import {
  navVariables,
  buttonVariants,
  titleVariants,
} from "../../motion/motion";

const Header = () => {
  return (
    <section id="header">
      <m.nav
        variants={navVariables}
        initial="hidden"
        animate="visible"
        className="header__nav"
      >
        <img src={logo} />
        <ul>
          <a href="#about">
            <li>About</li>
          </a>
          <a href="#form">
            <li>MyMix</li>
          </a>
          <a href="#footer">
            <li>Contact</li>
          </a>
        </ul>
      </m.nav>
      <div className="header__content">
        <m.h1 variants={titleVariants} initial="hidden" animate="visible">
          Mypodmix
        </m.h1>
        <m.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="header__content-text"
        >
          <h2>Find and Share Podcasts You Will Love</h2>
          <a href="#form">
            <button>Check it Now!</button>
          </a>
        </m.div>
        <video loop autoPlay muted playsInline>
          <source src={bg} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Header;
