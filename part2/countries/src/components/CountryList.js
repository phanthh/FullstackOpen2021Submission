import CountryView from "./CountryView";

const CountryList = ({ data }) => {
  if (data.length > 10)
    return <p>"Too many matches, specify another filter"</p>;
  else if (data.length > 1)
    return data.map((country) => (
      <CountryView country={country} showImd={false} />
    ));
  else if (data.length === 1)
    return <CountryView country={data[0]} showImd={true} />;
  return <p>"No matches"</p>;
};

export default CountryList;
