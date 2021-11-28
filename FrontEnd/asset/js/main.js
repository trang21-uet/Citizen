// npx babel --watch src --out-dir asset/js --presets react-app/prod

"use strict";

function tick() {
  var element = React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Hello World!"
    ),
    React.createElement(
      "h2",
      null,
      "It is ",
      new Date().toLocaleTimeString(),
      "."
    )
  );
  ReactDOM.render(element, document.querySelector("#root"));
}

setInterval(tick, 1000);