module.exports = {
  VALID_ORIGINS: process.env.VALID_ORIGINS.split(",").map((i) => i.trim()),
};
