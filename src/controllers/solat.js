// import redis from "../db/redis";
import { zonList } from "../utils/zoneLists.js";

async function esolat(period, zone) {
  try {
    const response = await fetch(
      "https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&" +
        new URLSearchParams({
          period: period,
          zone: zone,
        })
    );

    const data = await response.json();

    for (let index = 0; index < data.prayerTime.length; index++) {
      const prayer = data.prayerTime[index];
      const redisKey = `${zone}:${prayer.date}`;
      // redis.json.set(redisKey, ".", prayer);
    }
  } catch (error) {
    console.log("Error e-Solat", error);
  }
}

export const esolat_daily = async (req, res) => {
  console.log("------/api/solat/daily------");
  try {
    zonList.forEach((zone) => esolat("today", zone));
  } catch (err) {
    res.sendStatus(404);
    console.error("ERROR @ /esolat_daily ::", err.stack);
  } finally {
    console.timeEnd("daily");
  }
};

export const esolat_weekly = async (req, res) => {
  console.log("------/api/solat/daily------");
  try {
    zonList.forEach((zone) => esolat("week", zone, null));
  } catch (err) {
    res.sendStatus(404);
    console.error("ERROR @ /esolat_weekly ::", err.stack);
  } finally {
  }
};

export const esolat_monthly = async (req, res) => {
  console.log("------/api/solat/monthly------");
  try {
    zonList.forEach((zone) => esolat("month", zone, null));
  } catch (err) {
    res.sendStatus(404);
    console.error("ERROR @ /esolat_monthly ::", err.stack);
  } finally {
  }
};

export const esolat_yearly = async (req, res) => {
  console.log("------/api/solat/yearly------");
  try {
    zonList.forEach((zone) => esolat("year", zone, null));
  } catch (err) {
    res.sendStatus(404);
    console.error("ERROR @ /esolat_yearly ::", err.stack);
  } finally {
  }
};
