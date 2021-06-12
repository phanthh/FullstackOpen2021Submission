import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryList from "./components/CountryList.js";

const App = () => {
  const url = "https://restcountries.eu/rest/v2/all";
  const [countriesData, setCountriesData] = useState([]);
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    axios.get(url).then((res) => {
      setCountriesData(res.data);
    });
  }, []);

  const countriesToShow = countriesData.filter((country) =>
    country.name.toLowerCase().includes(filterString)
  );

  return (
    <div>
      <input
        value={filterString}
        onChange={(e) => setFilterString(e.target.value.toLowerCase())}
      />
      <CountryList data={countriesToShow} />
    </div>
  );
};

export default App;
