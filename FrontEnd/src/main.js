// npx babel --watch src --out-dir asset/js --presets react-app/prod

"use strict";

function tick() {
  const element = (
    <div>
      <h1>Hello World!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.querySelector("#root"));
}

setInterval(tick, 1000);
