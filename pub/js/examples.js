const atHeading = new atHeadings();

document.getElementById("btn1").onclick = function () {
  // const title_inp = document.getElementById("heading-enter").value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  atHeading.slantAnimation(canvas, ctx);
};

document.getElementById("btn3").onclick = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  atHeading.scatterAndComeBack(canvas, ctx, 1000);
};
document.getElementById("btn4").onclick = function () {
  atHeading.changeColor("red");
};
document.getElementById("btn5").onclick = function () {
  atHeading.changeSize(6);
};
document.getElementById("btn6").onclick = function () {
  atHeading.stopAnimation();
};
document.getElementById("btn7").onclick = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  atHeading.applyFlee(canvas, ctx, 100000, 0);
};
document.getElementById("btn9").onclick = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  atHeading.applyFlee(canvas, ctx, 100000, 1);
};
document.getElementById("submit").onclick = function () {
  const title_inp = document.getElementById("heading-enter").value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  atHeading.displayHeading(canvas, ctx, title_inp);
};
document.getElementById("submit-basic").onclick = function () {
  const title_inp = document.getElementById("heading-enter").value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  atHeading.displayHeadingBasic(canvas, ctx, title_in, "blue", 72);
};
document.getElementById("btn8").onclick = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  atHeading.clearCtx(canvas, ctx);
};

document.getElementById("submit-basic-dynamic").onclick = function () {
  const title_inp = document.getElementById("basic-animation-enter").value;
  atHeading.displayHeadingDynamic(title_inp, "heading-display");
};
document.getElementById("submit-transform").onclick = function () {
  const heading1 = document.getElementById("heading1").value;
  const heading2 = document.getElementById("heading2").value;
  const canvas = document.getElementById("canvas2");
  const ctx = canvas.getContext("2d");
  atHeading.transformHeading(canvas, ctx, heading1, heading2);
};

document.getElementById("startBackground").onclick = function () {
  const canvas = document.getElementById("canvas3");
  const ctx = canvas.getContext("2d");
  const boxColor = document.getElementById("boxColor").value;
  const boxLength = document.getElementById("boxLength").value;
  const boxColorCloseness = document.getElementById("boxColorCloseness").value;

  atHeading.applyBackGround(
    canvas,
    ctx,
    boxColor,
    boxLength,
    boxColorCloseness
  );
};

document.getElementById("backGroundRandom").onclick = function () {
  const canvas = document.getElementById("canvas4");
  const ctx = canvas.getContext("2d");
  atHeading.applyBackGroundLines(canvas, ctx, 10, "black", false);
};

document.getElementById("backGroundRandomMouse").onclick = function () {
  const canvas = document.getElementById("canvas4");
  const ctx = canvas.getContext("2d");
  atHeading.applyBackGroundLines(canvas, ctx, 10, "green", true);
};
document.getElementById("mouseTrail1").onclick = function () {
  const canvas = document.getElementById("canvas5");
  const ctx = canvas.getContext("2d");
  atHeading.mouseTrail(canvas, ctx, 10, "green");
};
document.getElementById("mouseTrail2").onclick = function () {
  atHeading.mouseTrail2("rainbow");
};

document.getElementById("pipes").onclick = function () {
  const canvas = document.getElementById("canvas6");
  const ctx = canvas.getContext("2d");

  const title = document.getElementById("pipesTitle").value;
  const colHeading = document.getElementById("colorHeading").value;
  const sizeHeading = document.getElementById("sizeHeading").value;
  const colorPipes = document.getElementById("colorPipes").value;
  const widthPipes = document.getElementById("widthPipes").value;

  atHeading.pipes(
    canvas,
    ctx,
    colorPipes,
    title,
    "canvas-parent-div",
    sizeHeading,
    colHeading,
    widthPipes,
    0
  );
};
