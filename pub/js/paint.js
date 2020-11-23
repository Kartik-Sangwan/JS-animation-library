const atHeading = new atHeadings();

document.getElementById("draw-btn").onclick = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  color = document.getElementById("color").value;
  size = document.getElementById("text-size").value;
  atHeading.startDrawingApp(canvas, ctx, size, color);
};

document.getElementById("clear-btn").onclick = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  window.location.reload();
  atHeading.clearPainting(canvas, ctx);
};
