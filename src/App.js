import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

/**/

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        //console.log(res.data.current_price);
      })
      .catch((e) => console.log(e));
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //filter monedas/ display lo tipeado

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a coin</h1>
        <form>
          <input
            type="text"
            placeholder="insert coin"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {/*Aca vamos a mapear por las monedas*/}
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.market_cap}
            price={coin.current_price}
          />
        );
      })}
    </div>
  );
}

export default App;
