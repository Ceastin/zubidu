export const getRandomImage = (req, res) => {
  const randomNum = Math.floor(Math.random() * 10) + 1;
  res.json({ image: `${randomNum}` });
};
