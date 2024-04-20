import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getResponse } from "./store/homeSlice";
import Home from "./pages/home/Home";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";

function App() {
  const [search, setSearch] = useState("Pokemon");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { response } = useSelector((state) => state.home);

  const callApi = () => {
    fetchData("s=" + search + "&page=" + page).then((res) => {
      console.log(res.Search);
      dispatch(getResponse(res));
    });
  };

  useEffect(() => {
    callApi();
  }, [page]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
