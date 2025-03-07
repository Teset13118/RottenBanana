const express = require("express");
const { getSeasonNow, getSeasonWinter, getSeasonSummer, getSeasonFall, getSeasonSpring, getUpcoming, getAnimeSearch, getAnimeDetail } = require("../controllers/animeController");

const router = express.Router();

router.get("/season/now", getSeasonNow);
router.get("/season/2024/winter", getSeasonWinter);
router.get("/season/2024/summer", getSeasonSummer);
router.get("/season/2024/fall", getSeasonFall);
router.get("/season/2024/spring", getSeasonSpring);
router.get("/season/upcoming", getUpcoming);
router.get("/season/2024/:searchquery", getAnimeSearch);
router.get("/season/:id", getAnimeDetail);

module.exports = router;