import React, { useState , useEffect} from "react";
import Card from "./Card/Card";
import "./BigProduct.css";
import Button from "./Button/Button";

const data = require("./data/links.json");

function BigProduct() {
  const [current, setCurrent] = useState(1);
  useEffect( () => {
    const i_id = setInterval(() => {
      setCurrent(prev => prev === data.length ? 1 : prev + 1)
    },3000);
    return () => {
      clearInterval(i_id);
    }
  },[]);
  
  return (
    <div className="App">
      <div className={`card-slider active-slide-${current}`}>
        <div
          className="card-slider-wrapper"
          style={{
            transform: `translateX(${800 - current * 800}px)`,
          }}
        >
          {data.map((cur) => (
            <Card key={cur.index} index={cur.index} link={cur.link}></Card>
          ))}
        </div>
      </div>
      {data.map((product, index) => {
        let isActive = current === index + 1;
        return (
          <Button
            key={index + 1}
            onClick={() => setCurrent(index + 1)}
            isActive={isActive}
            index={index + 1}
          ></Button>
        );
      })}
    </div>
  );
}

export default BigProduct;
