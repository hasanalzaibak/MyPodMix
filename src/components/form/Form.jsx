import { useState } from "react";
import axios from "axios";
import {
  EmailShareButton,
  RedditShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { motion as m, AnimatePresence } from "framer-motion";
import { podVariants } from "../../motion/motion";

const podcastGenre = [
  "Lifestyle",
  "Philosophy",
  "Science",
  "Religion",
  "Education",
  "Comedy",
  "Society & Culture",
  "News",
  "Health",
  "Drama",
  "Thriller",
  "Tech",
  "Literature",
  "Business",
  "LGBTQ+",
  "Pop Culture",
  "Music",
  "Culture",
  "Entertainment",
  "Horror",
  "Gaming",
  "Entrepreneurship",
  "True-crime",
  "Politics",
  "Economics",
  "Storytelling",
  "Personal",
  "Sports",
  "Fiction",
  "Mental-health",
  "Anthology",
  "Documentary",
  "Talk show",
  "Advice",
  "Food",
  "Finance",
  "Self-help",
  "Mystery",
  "Docuseries",
  "Psychology",
  "Arts",
  "TV",
  "Journalism",
  "Occult",
  "Poetry",
  "News Briefing",
];

const Form = () => {
  const [formData, setFormData] = useState({
    genre: "Lifestyle",
    duration: "medium - less than an hour",
    language: "English",
    firstPodcast: "",
    secondPodcast: "",
    thirdPodcast: "",
  });

  const [apiResponse, setApiResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandle = async (e) => {
    const prompt = `[instructions] The list item should include the title in the original language, description is always in English, host names, and the duration of the podcast. Make sure to check the length of the episodes. Do not offer low rated podcasts. Only show podcasts available on Apple Podcasts or Spotify. Follow the format of the example. Give me the answer in the same order [title][host][desctiption][duration]. Don't skip any steps!

    """
    
    [Example] 1. The Psych Show: Hosted by Dr. Kendra Seigel, a licensed psychologist and author. She interviews experts and professionals to discuss the topics of psychology, mental health, and wellbeing. With over 200 episodes, this podcast offers great insights into psychology and mental health. The duration of the episodes is around an hour.

    """

    Give me a list of three podcasts similar to the podcasts I like, considering also the following factors. The genre of the podcasts should be: ${formData.genre}. The duration of the podcasts should be: ${formData.duration}. ${formData.language} is the language of preference for the podcasts. Follow the instructions mentioned before. I like the following podcasts:  ${formData.firstPodcast}, ${formData.secondPodcast}, ${formData.thirdPodcast}.`;

    e.preventDefault();
    setLoading(true);

    await axios
      .post(
        `${import.meta.env.VITE_OPENAI_API_URL}`,
        {
          model: "text-davinci-003",
          prompt: `${prompt}`,
          temperature: 0.9,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      )
      .then((response) => {
        setApiResponse(response.data.choices[0].text);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const parts = apiResponse.split(/\d+\./);

  const filteredParts = parts.filter((part) => part.trim());

  return (
    <section id="form">
      <form>
        <label htmlFor="genre">Select the genre of the podcast</label>
        <select
          name="genre"
          id="genre"
          value={formData.genre}
          onChange={handleInputChange}
        >
          {podcastGenre.map((genre, index) => {
            return (
              <option key={index} value={genre}>
                {genre}
              </option>
            );
          })}
        </select>

        <label htmlFor="duration">Select the duration of the podcast</label>
        <select
          name="duration"
          id="duration"
          value={formData.duration}
          onChange={handleInputChange}
        >
          <option value="less than an hour">Less than an hour</option>
          <option value="above 60 minutes">More than an hour</option>
        </select>

        <label htmlFor="language">
          Select the preferred language of the podcast
        </label>
        <select
          name="language"
          id="language"
          value={formData.language}
          onChange={handleInputChange}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Portuguese">Portuguese</option>
          <option value="German">German</option>
        </select>

        <label htmlFor="firstPodcast">Your favorite podcast</label>
        <input
          type="text"
          name="firstPodcast"
          id="firstPodcast"
          pattern="[A-Za-z0-9\s]+"
          placeholder="Podcast name - Required"
          value={formData.firstPodcast}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="secondPodcast">Your second favorite podcast</label>
        <input
          type="text"
          name="secondPodcast"
          id="secondPodcast"
          pattern="[A-Za-z0-9\s]+"
          placeholder="Podcast name"
          value={formData.secondPodcast}
          onChange={handleInputChange}
        />
        <label htmlFor="thirdPodcast">Your third favorite podcast</label>
        <input
          type="text"
          name="thirdPodcast"
          id="thirdPodcast"
          pattern="[A-Za-z0-9\s]+"
          placeholder="Podcast name"
          value={formData.thirdPodcast}
          onChange={handleInputChange}
        />

        <button onClick={submitHandle}>Submit</button>
      </form>

      <div className="form__response">
        <AnimatePresence mode="wait">
          {loading ? (
            <m.p
              variants={podVariants}
              key="loader"
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="form__response-loader"
            >
              <i className="fa-solid fa-spinner" />
            </m.p>
          ) : null}

          {!loading &&
            apiResponse &&
            filteredParts.map((part, index) => (
              <m.p
                variants={podVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="form__response-podcasts"
                key={index}
              >
                {part}
              </m.p>
            ))}

          {!loading && apiResponse && (
            <m.div
              variants={podVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key="icons"
              className="form__response-icons"
            >
              <EmailShareButton url={apiResponse}>
                <i className="fa-solid fa-envelope" />
              </EmailShareButton>
              <RedditShareButton url={apiResponse}>
                <i className="fa-brands fa-reddit-alien" />
              </RedditShareButton>
              <WhatsappShareButton url={apiResponse}>
                <i className="fa-brands fa-whatsapp" />
              </WhatsappShareButton>
              <TelegramShareButton url={apiResponse}>
                <i className="fa-brands fa-telegram" />
              </TelegramShareButton>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Form;
