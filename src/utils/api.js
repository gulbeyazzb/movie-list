import axios from "axios";

const API_URL = "https://www.omdbapi.com/?apikey=19ce058a&";

export const fetchData = async (params) => {
  try {
    const { data } = await axios.get(API_URL + params);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
