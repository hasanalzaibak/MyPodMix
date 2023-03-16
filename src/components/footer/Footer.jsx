var currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <section id="footer">
      <p>All Rights Reserved &copy; {currentYear}</p>
      <div>
        <p>Hasan Zaibak</p>

        <p>Sao Paulo, BR</p>
      </div>
    </section>
  );
};

export default Footer;
