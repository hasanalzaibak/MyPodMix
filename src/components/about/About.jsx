import about from "../../assets/designs/about.webp";

const About = () => {
  return (
    <section id="about">
      <div className="about__text">
        <p>
          <span>Mypodmix</span> is a podcast recommendation app that uses
          artificial intelligence to help you discover new shows based on your
          preferences and listening habits. Whether you are into comedy,
          history, sports, or anything else, <span>Mypodmix</span> will find
          podcasts that match your interests and mood. You can also share your
          favorite podcasts with your friends. Try <span>Mypodmix</span> today
          and enjoy a personalized podcast experience powered by AI!
        </p>
      </div>
      <img src={about} />
    </section>
  );
};

export default About;
