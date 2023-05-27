const path = require("path");
const config = require("../config/origin.config");
const contractController = require("./contract.controller");


exports.image = (req, res) => {
  const origin = req.headers.origin;
  console.log(origin);
  if (!config.VALID_ORIGINS.includes(origin)) {
    return res.json({ message: "Welcome to assets application." });
  }

  const { id } = req.params;
  const numberId = parseInt(id.replace(".jpg", ""));
  const currentSupply = contractController.getData(origin);

  if (numberId > 0 && numberId < currentSupply) {
    res.sendFile(`${numberId}.jpg`, {
      root: path.join(__dirname, `../assets/${origin}/images`),
    });
  } else {
    res.json({ message: "Welcome to assets application." });
  }
};

exports.metadata = (req, res) => {
  const origin = req.headers.origin;
  console.log(origin);
  if (!config.VALID_ORIGINS.includes(origin)) {
    return res.json({ message: "Welcome to assets application." });
  }
  const { id } = req.params;
  const numberId = parseInt(id);
  const currentSupply = contractController.getData(origin);
  if (numberId > 0 && numberId < currentSupply) {
    res.sendFile(id, {
      root: path.join(__dirname, `../assets/${origin}/metadata`),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    res.sendFile("placeholder.json", {
      root: path.join(__dirname, `../assets/${origin}`),
    });
  }
};

exports.placeholder = (req, res) => {
  const origin = req.headers.origin;
  console.log(origin);
  if (!config.VALID_ORIGINS.includes(origin)) {
    return res.json({ message: "Welcome to assets application." });
  }
  const { id } = req.params;
  res.sendFile(id, {
    root: path.join(__dirname, `../assets/${origin}/placeholder`),
  });
};
