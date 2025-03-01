import {throttle} from "lodash";

 const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Fonts
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];

    const isPerson = prediction.class === "person";

    // bounding box
    ctx.strokeStyle = "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // fill the color
    ctx.fillStyle = `rgba(0, 0, 0, 0)`; // Set the fill color to red
    ctx.fillRect(x, y, width, height);

    // Draw the label background.
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
  });
};


export default renderPredictions;