/* JS Library AT-headings.js*/
// "use strict";

// Also change all the hardcoded data to developer function inputs
// Also fix new animations frames starting up before finishing the current hence speeds up everything
(function (global) {
  var atoms = [];
  var pipesId;
  var randomAtoms = [];
  var heading = [];
  var randomHeading = [];
  var h1Array = [];
  var h2Array = [];

  var h1RandomArray = [];
  var backGround = [];
  var backGroundRandom = [];
  var mouseTrail = [];

  var pipes = [];

  window.onload = function () {
    loadPoints();
  };

  function atHeadings(color, pointSize) {
    this.pointSize = pointSize || 4;
    this.color = color || "black";
    this.mouseX = undefined;
    this.mouseY = undefined;
    this.mouseDown = false;
  }

  function loadPoints() {
    $.get("./letters.txt", function (letters) {
      const rows = letters.split("\n");
      const factor = 5;
      // This is outter-most loop that runs number or alphabets times.

      for (let i = 0; i < rows.length; i++) {
        const positions = rows[i].split(".");
        var letter_list = [];
        var letter_list_random = [];
        for (let j = 0; j < positions.length; j++) {
          const pos = positions[j];
          const x = pos.split("/")[0] * factor;
          const y = pos.split("/")[1] * factor;
          const at = new Atom(x, y);
          const randomAt = new randomAtom(x, y);
          letter_list_random.push(randomAt);
          letter_list.push(at);
        }
        randomAtoms.push(letter_list_random);
        atoms.push(letter_list);
      }
    }).done(function () {
      console.log("DONE");
    });
  }

  atHeadings.prototype = {
    draw: function (ctx, x, y) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(x, y, this.pointSize, 0, Math.PI * 2, true);
      ctx.fill();
    },
    drawTriangle: function (ctx, x, y) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.moveTo(x, y);
      ctx.lineTo(x + 10, y);
      ctx.lineTo(x + 5, y + 10);
      ctx.fill();
    },

    drawSquareTiles: function (ctx, x, y) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.rect(x, y, 20, 20);
      ctx.stroke();
    },

    drawSquareTilesSeparateFilled: function (ctx, x, y) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.rect(x, y, 5, 5);
      ctx.stroke();
      ctx.fill();
    },
    createHeading: function createHeading(title) {
      const newHeading = title.toUpperCase();
      console.log(title);
      heading = [];
      for (let i = 0; i < newHeading.length; i++) {
        const index = newHeading.charCodeAt(i) - "A".charCodeAt(0);
        let temp = [];
        for (let i = 0; i < atoms[index].length; i++) {
          const x = atoms[index][i].x;
          const y = atoms[index][i].y;
          const atom = new Atom(x, y);
          temp.push(atom);
        }
        heading.push(temp);
      }
      this.createHeadingRandom(title);
      return heading;
    },
    createHeadingRandom: function createHeadingRandom(title) {
      const newHeading = title.toUpperCase();
      randomHeading = [];
      for (let i = 0; i < newHeading.length; i++) {
        const index = newHeading.charCodeAt(i) - "A".charCodeAt(0);

        randomHeading.push(randomAtoms[index]);
      }
      return randomHeading;
    },
    changeColor: function (c) {
      this.color = c;
    },
    changeSize: function (size) {
      this.pointSize = size;
    },

    displayHeading: function displayHeading(canvas, ctx, title) {
      this.createHeading(title);
      const pad = 90;
      let i = 0;
      console.log(title, heading);
      heading.map((letter) => {
        letter.map((atom) => {
          this.draw(ctx, atom.x + pad * i, atom.y);
        });
        i += 1;
      });
    },

    displayHeadingBasic: function displayHeadingBasic(
      canvas,
      ctx,
      title,
      col,
      size
    ) {
      const newHeading = title.toUpperCase();
      ctx.fillStyle = col;
      ctx.font = "bold" + size + "px" + "Arial";
      ctx.fillText(newHeading, canvas.width / 3, canvas.height / 2);
    },

    displayHeadingFade: function displayHeadingfade(title) {
      const newHeading = title.toUpperCase();
      const h1 = document.getElementById("heading-display");
      const lst = newHeading.split("");
      h1.textContent = "";

      for (let i = 0; i < lst.length; i++) {
        const sp = document.createElement("span");
        sp.id = "type1";
        const text = document.createTextNode(lst[i]);

        sp.appendChild(text);
        h1.appendChild(sp);
      }
      let ind = 0;
      let timer = setInterval(() => {
        const span = h1.querySelectorAll("span")[ind];
        span.classList.add("fade");

        ind += 1;
        if (ind == lst.length) {
          clearInterval(timer);
          timer = null;
          return;
        }
      }, 50);
    },
    displayHeadingDynamic: function displayHeadingDynamic(title, headingId) {
      const newHeading = title.toUpperCase();
      const h1 = document.getElementById(headingId);
      const lst = newHeading.split("");
      h1.textContent = "";

      for (let i = 0; i < lst.length; i++) {
        const sp = document.createElement("span");

        const text = document.createTextNode(lst[i]);

        sp.appendChild(text);
        h1.appendChild(sp);
      }
      let ind = 0;
      let timer = setInterval(() => {
        const span = h1.querySelectorAll("span")[ind];
        span.classList.add("dynamic");

        ind += 1;
        if (ind == lst.length) {
          clearInterval(timer);
          timer = null;
          return;
        }
      }, 50);
    },

    clearCtx: function clearCtx(canvas, ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    startAnimation: function startAnimation(canvas, ctx, times) {
      if (times < 0) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pad = 90;
      let i = 0;

      randomHeading.map((letter) => {
        letter.map((atom) => {
          this.draw(ctx, atom.x + pad * i, atom.y);

          atom.update_location();
          atom.locate(atom.target[0], atom.target[1]);
          if (atom.x + pad * i >= canvas.width || atom.x + pad * i <= 2) {
            atom.updateVelocity(atom.velocity[0] * -1, atom.velocity[1]);
          }
          if (atom.y >= canvas.height - 5 || atom.y <= 2) {
            atom.updateVelocity(atom.velocity[0], atom.velocity[1] * -1);
          }
        });
        i += 1;
      });
      setTimeout(() => {
        this.startAnimation(canvas, ctx, times - 1);
      }, 1);
    },
    scatterAndComeBack: function scatterAndComeBack(canvas, ctx, scatterTime) {
      this.scatterAnimation(canvas, ctx, scatterTime);
      setTimeout(() => {
        this.startAnimation(canvas, ctx, scatterTime * 3.5);
      }, 5100);
    },
    scatterAnimation: function scatterAnimation(canvas, ctx, times) {
      if (times < 0) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pad = 90;
      let i = 0;
      randomHeading.map((letter) => {
        letter.map((atom) => {
          this.draw(ctx, atom.x + pad * i, atom.y);
          atom.update_location();

          if (atom.x + pad * i >= canvas.width || atom.x + pad * i <= 2) {
            atom.updateVelocity(atom.velocity[0] * -1, atom.velocity[1]);
          }
          if (atom.y >= canvas.height || atom.y <= 2) {
            atom.updateVelocity(atom.velocity[0], atom.velocity[1] * -1);
          }
        });
        i += 1;
      });
      setTimeout(() => {
        this.scatterAnimation(canvas, ctx, times - 1);
      }, 1);
    },

    slantAnimation: function slantAnimation(canvas, ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pad = 90;
      let i = 0;

      heading.map((letter) => {
        letter.map((atom) => {
          // console.log(ctx, atom.x + pad * i, atom.y);
          this.draw(ctx, atom.x + pad * i, atom.y);
          atom.update_location();

          if (atom.x + pad * i >= canvas.width || atom.x + pad * i <= 2) {
            atom.updateVelocity(atom.velocity[0] * -1, atom.velocity[1]);
          }
          if (atom.y >= canvas.height || atom.y <= 2) {
            atom.updateVelocity(atom.velocity[0], atom.velocity[1] * -1);
          }
        });
        i += 1;
      });

      slantFrame = requestAnimationFrame(() => {
        this.slantAnimation(canvas, ctx);
      });
    },

    flee: function flee(canvas, ctx, times, opt) {
      if (times < 0) {
        console.log("DONE FLEE");
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pad = 90;
      let i = 0;

      heading.map((letter) => {
        letter.map((atom) => {
          this.drawTriangle(ctx, atom.x + pad * i - 50, atom.y);

          atom.update_location();
          if (opt == 0) {
            atom.flee(this.mouseX, this.mouseY, atom.x + pad * i - 50, atom.y);
          } else {
            atom.flee(this.mouseX, this.mouseY);
          }
          atom.locate(atom.target[0], atom.target[1]);

          if (atom.x + pad * i >= canvas.width || atom.x + pad * i <= 2) {
            atom.updateVelocity(atom.velocity[0] * -1, atom.velocity[1]);
          }
          if (atom.y >= canvas.height || atom.y <= 2) {
            atom.updateVelocity(atom.velocity[0], atom.velocity[1] * -1);
          }
        });
        i += 1;
      });

      setTimeout(() => {
        this.flee(canvas, ctx, times - 1, opt);
      }, 1);
    },
    applyFlee: function (canvas, ctx, times, opt) {
      canvas.addEventListener("mousemove", (e) => {
        this.mouseX = e.x;
        this.mouseY = e.y;
      });
      this.flee(canvas, ctx, times, opt);
    },
    firstHeadingDisplay: function firstHeadingDisplay(ctx, arr) {
      const pad = 90;
      console.log(arr);
      let i = 0;
      arr.map((letter) => {
        letter.map((atom) => {
          this.draw(ctx, atom.x + pad * i, atom.y);
        });
        i += 1;
      });
    },

    scatterFirstHeading: function (canvas, ctx, times, arr) {
      if (times < 0) {
        return arr;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pad = 90;
      let i = 0;
      arr.map((letter) => {
        letter.map((atom) => {
          this.draw(ctx, atom.x + pad * i, atom.y);
          atom.update_location();

          if (atom.x + pad * i >= canvas.width || atom.x + pad * i <= 2) {
            atom.updateVelocity(atom.velocity[0] * -1, atom.velocity[1]);
          }
          if (atom.y >= canvas.height || atom.y <= 2) {
            atom.updateVelocity(atom.velocity[0], atom.velocity[1] * -1);
          }
        });
        i += 1;
      });
      setTimeout(() => {
        this.scatterFirstHeading(canvas, ctx, times - 1, arr);
      }, 1);
    },

    startSecondAnimation: function (canvas, ctx, times, arr) {
      if (times < 0) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pad = 90;
      let i = 0;

      arr.map((letter) => {
        letter.map((atom) => {
          this.draw(ctx, atom.x + pad * i, atom.y);

          atom.update_location();
          atom.locate(atom.target[0], atom.target[1]);
          if (atom.x + pad * i >= canvas.width || atom.x + pad * i <= 2) {
            atom.updateVelocity(atom.velocity[0] * -1, atom.velocity[1]);
          }
          if (atom.y >= canvas.height || atom.y <= 2) {
            atom.updateVelocity(atom.velocity[0], atom.velocity[1] * -1);
          }
        });
        i += 1;
      });
      setTimeout(() => {
        this.startSecondAnimation(canvas, ctx, times - 1, arr);
      }, 1);
    },

    transformHeading: function transformHeading(canvas, ctx, h1, h2) {
      h1Array = this.createHeading(h1);
      h2Array = this.createHeading(h2);

      h1RandomArray = this.createHeadingRandom("abcdefghijkl");

      this.firstHeadingDisplay(ctx, h1Array);
      setTimeout(() => {
        this.scatterFirstHeading(canvas, ctx, 1000, h1RandomArray);

        setTimeout(() => {
          for (let i = 0; i < h1RandomArray.length; i++) {
            for (let j = 0; j < h1RandomArray[i].length; j++) {
              if (h2Array[i] != undefined && h2Array[i][j] != undefined) {
                h1RandomArray[i][j].target = h2Array[i][j].target;
              } else {
                h1RandomArray[i].splice(j);
              }
            }
          }

          this.startSecondAnimation(canvas, ctx, 1000, h1RandomArray);
        }, 3000);
      }, 2000);
    },
    // This feature can also be used in applications that require signatures.
    startDrawingApp: function startDrawingApp(canvas, ctx, size, color) {
      // console.log(size, color);
      canvas.addEventListener("mousedown", () => {
        this.mouseDown = true;
        ctx.beginPath();
      });
      canvas.addEventListener("mouseup", () => {
        this.mouseDown = false;
        ctx.beginPath();
      });
      canvas.addEventListener("mousemove", (e) => {
        if (!this.mouseDown) {
          return;
        }

        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineTo(e.clientX - 13, e.clientY);
        ctx.stroke();
      });
    },

    applyBackGround: function (canvas, ctx, colValue, boxLength, close) {
      // console.log(colValue, boxLength, close);
      const center = [canvas.width / 2, canvas.height / 2];
      for (let i = 0; i < 150; i++) {
        const radius = Math.random() * 500 + 1;
        const theta = Math.random() * 360;
        const x = center[0] + radius * Math.cos((theta * Math.PI) / 180);
        const y = center[1] + radius * Math.sin((theta * Math.PI) / 180);
        const speed = Math.random();
        const length = Math.random() * boxLength + 1;
        // will add fade in fade out later
        const color = `hsl(
        ${colValue + Math.random() * close},
        ${Math.random() * 11 + 60}%,
        ${Math.random() * 11 + 35}%,
        ${Math.random() + 0.7}
      )`;
        const atom = new backGroundAtom(
          x,
          y,
          radius,
          length,
          speed,
          theta,
          color
        );
        backGround.push(atom);
      }
      this.animate(canvas, ctx);
    },

    animate: function (canvas, ctx) {
      requestAnimationFrame(() => {
        this.animate(canvas, ctx);
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backGround.map((atom) => atom.updateLocation(canvas, ctx));
    },

    applyBackGroundLines: function (
      canvas,
      ctx,
      closeValue,
      color,
      mouseOrNot
    ) {
      const last = [canvas.width, canvas.height];
      let mouse = [];
      canvas.addEventListener("mousemove", (e) => {
        mouse[0] = e.x;
        mouse[1] = e.y;
      });

      for (let i = 0; i < 100; i++) {
        const radius = 2 + Math.random() * 5;
        const x = last[0] * Math.random();
        const y = last[1] * Math.random();

        const randomAtom = new backGroundAtomRandom(
          x,
          y,
          radius,
          color,
          closeValue
        );

        backGroundRandom.push(randomAtom);
      }
      if (mouseOrNot == false) {
        this.animateRandom(canvas, ctx);
      } else {
        this.animateRandomMouse(canvas, ctx, mouse);
      }
    },

    pipes: function (
      canvas,
      ctx,
      colValue,
      title,
      divId,
      size,
      col,
      width,
      keep
    ) {
      if (pipesId != undefined) {
        cancelAnimationFrame(pipesId);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.clearHeading(divId);

        if (keep == 0) {
          pipes = [];
        }
      }
      const last = [canvas.width, canvas.height];
      for (let i = 0; i < 25; i++) {
        const x = last[0] * Math.random();
        const y = last[1] * Math.random();
        const color = `hsl(
        ${colValue + Math.random() * 10},
        ${Math.random() * 11 + 60}%,
        ${Math.random() * 11 + 35}%,
        ${Math.random() + 0.2}
      )`;
        const p = new pipe(x, y, color, width);

        pipes.push(p);
      }
      size += "px";
      this.createDomHeading(divId, title, size, col);
      this.animatePipes(canvas, ctx);
    },

    createDomHeading: function (divId, title, size, col) {
      const titleP = title.toUpperCase();
      const textNode = document.createTextNode(titleP);
      const h1 = document.createElement("h1");
      h1.style.zIndex = 100;
      h1.style.position = "absolute";
      h1.style.top = "20%";
      h1.style.left = 0;
      h1.style.width = "100%";
      h1.style.textAlign = "center";
      h1.style.fontSize = size;
      h1.style.lineHeight = 1;
      h1.style.color = col;
      h1.appendChild(textNode);
      const div = document.getElementById(divId);
      div.style.position = "relative";
      div.style.top = 0;
      div.style.left = 0;

      div.appendChild(h1);
    },

    clearHeading: function (divId) {
      const element = document.getElementById(divId);
      for (let i = 0; i < element.childNodes.length; i++) {
        console.log(element.childNodes[i].tagName);
        if (element.childNodes[i].tagName == "H1") {
          element.removeChild(element.childNodes[i]);
          return;
        }
      }
    },
    animatePipes: function (canvas, ctx) {
      pipesId = requestAnimationFrame(() => {
        this.animatePipes(canvas, ctx);
      });
      pipes.map((pipe) => {
        pipe.updateLocation(ctx);
      });
    },
    mouseTrail: function (canvas, ctx, radius, color) {
      let mouse = [];
      const last = [canvas.width, canvas.height];
      canvas.addEventListener("mousemove", (e) => {
        mouse[0] = e.x;
        mouse[1] = e.y;
      });

      for (let i = 0; i < 100; i++) {
        const x = last[0] * Math.random();
        const y = last[1] * Math.random();
        const radiusNew = radius + Math.random() * 3;
        const atom = new backGroundAtomRandom(x, y, radiusNew, color, 10);
        mouseTrail.push(atom);
      }
      this.animateMouseTrail1(canvas, ctx, mouse, radius + Math.random() * 3);
    },

    mouseTrail2: function (divId) {
      let mouse = { x: -1, y: -1 };
      const div = document.getElementById(divId);
      let i = 0;
      div.style.position = "relative";
      setInterval(() => {
        for (let i = 0; i < div.childNodes.length; i++) {
          div.removeChild(div.childNodes[i]);
        }
      }, 100);
      div.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        const col = `hsl(
        ${i},
        ${Math.random() * 11 + 60}%,
        ${Math.random() * 11 + 35}%,
        ${Math.random() + 0.7}
      )`;
        this.createBoxDiv(divId, 20, col, mouse.x, mouse.y);
        i += 10;
      });
    },

    createBoxDiv: function (divId, length, col, x, y) {
      const div = document.getElementById(divId);
      div.style.position = "relative";
      const box = document.createElement("div");
      box.style.width = length + "px";
      box.style.height = length + "px";
      box.style.background = col;
      box.style.position = "absolute";

      box.style.left = x + "px";
      box.style.top = y + "px";
      div.appendChild(box);
    },
    animateMouseTrail1: function (canvas, ctx, mouse, r) {
      requestAnimationFrame(() => {
        this.animateMouseTrail1(canvas, ctx, mouse, r);
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      mouseTrail.map((atom) => {
        atom.updateMouseTrail1(canvas, ctx, mouse, r);
      });
    },
    animateRandom: function (canvas, ctx) {
      requestAnimationFrame(() => {
        this.animateRandom(canvas, ctx);
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backGroundRandom.map((atom) => {
        atom.updateLocation(canvas, ctx);
      });

      backGroundRandom[0].isClose(canvas, ctx, backGroundRandom);
    },

    animateRandomMouse: function (canvas, ctx, mouse) {
      requestAnimationFrame(() => {
        this.animateRandomMouse(canvas, ctx, mouse);
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backGroundRandom.map((atom) => {
        atom.updateLocationMouse(canvas, ctx, mouse);
      });
      backGroundRandom[0].isClose(canvas, ctx, backGroundRandom);
    },
    clearPainting: function clearPainting(canvas, ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    stopAnimation: function stopAnimation() {
      cancelAnimationFrame(slantFrame);
    },
  };
  function Atom(x, y) {
    this.x = x;

    this.y = y;
    this.pos = [x, y, 0];
    this.velocity = [1, 1, 0];
    this.target = [x, y, 0];
    this.acceleration = [0, 0, 0];
  }

  function randomAtom(x, y) {
    this.x = Math.random() * 100;

    this.y = Math.random() * 100;
    this.pos = [Math.random() * 100, Math.random() * 100, 0];
    this.velocity = [Math.random(), Math.random(), 0];
    this.target = [x, y, 0];
    this.acceleration = [0, 0, 0];
  }

  function backGroundAtom(x, y, radius, length, speed, theta, color) {
    this.x = x;
    this.y = y;
    // this.dx = dx;
    // this.dy = dy;
    this.speed = speed;
    this.radius = radius;
    this.deg = theta;
    this.length = length;
    this.color = color;
  }

  backGroundAtom.prototype = {
    draw: function (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;

      ctx.rect(this.x, this.y, this.length, this.length);
      ctx.stroke();
    },
    updateLocation: function (canvas, ctx) {
      if (this.x > canvas.width - 5 || this.x < 5) {
        this.dx = 0 - this.dx;
      }
      if (this.x > canvas.height - 5 || this.y < 5) {
        this.dy = 0 - this.dy;
      }

      // Make the particle move in a circular pattern

      const rotateBy = Math.PI / 180;
      // using polar co-ordinates to find the next x,y for this particle which is
      // 1 degree from its current location on the circle
      const x0 = canvas.width / 2;
      const y0 = canvas.height / 2;
      const u =
        x0 +
        (this.x - x0) * Math.cos(rotateBy) -
        (this.y - y0) * Math.sin(rotateBy);
      const v =
        y0 +
        (this.x - x0) * Math.sin(rotateBy) +
        (this.y - y0) * Math.cos(rotateBy);

      // update the current x, y of the particle to new location
      this.x = u + this.speed;
      this.y = v + this.speed;

      this.draw(ctx);
    },
  };

  function backGroundAtomRandom(x, y, radius, color, closeValue) {
    this.x = x;
    this.y = y;
    this.dx = Math.random();
    // Close value defines the crowdiness of the lines wanted by the developer
    this.closeValue = closeValue;
    this.fallValue = Math.random() * 5;
    this.dy = Math.random();
    this.radius = radius;
    this.color = color;
    this.mouseDistX = radius * 5;
    this.mouseDistY = radius * 5;
  }

  backGroundAtomRandom.prototype = {
    draw: function (ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.fill();
    },
    drawSquare: function (ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.rect(this.x, this.y, this.radius, this.radius);
      ctx.fill();
    },
    updateLocation: function (canvas, ctx) {
      // If near the boundary of the canvas reverse the direction
      this.checkBoundary(canvas);
      this.x += this.dx;
      this.y += this.dy;
      this.draw(ctx);
    },

    isClose: function (canvas, ctx, lst) {
      lst.map((pt1) => {
        lst.map((pt2) => {
          if (pt1 != pt2) {
            const distance =
              (pt1.x - pt2.x) * (pt1.x - pt2.x) +
              (pt1.y - pt2.y) * (pt1.y - pt2.y);
            // here the closeValue dictates if a line will be drawn between a pair of points or not
            if (
              distance <
              (canvas.width / this.closeValue) *
                (canvas.height / this.closeValue)
            ) {
              this.drawLine(ctx, pt1, pt2);
            }
          }
        });
      });
    },

    drawLine: function (ctx, pt1, pt2) {
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.moveTo(pt1.x, pt1.y);
      ctx.lineTo(pt2.x, pt2.y);
      ctx.stroke();
    },

    updateLocationMouse: function (canvas, ctx, mouse) {
      this.checkBoundary(canvas);
      const xDiff = mouse[0] - this.x;
      const yDiff = mouse[1] - this.y;

      const distance = xDiff * xDiff + yDiff * yDiff;
      const threshold =
        (((canvas.width / 100) * canvas.height) / 100) *
        (((canvas.width / 100) * canvas.height) / 100);
      if (distance < threshold && mouse[0] < this.x) {
        this.x += 5;
      } else if (distance < threshold && mouse[0] > this.x) {
        this.x -= 5;
      } else if (distance < threshold && mouse[1] > this.y) {
        this.y -= 5;
      } else if (distance < threshold && mouse[0] < this.y) {
        this.y += 5;
      } else {
        this.x += this.dx;
        this.y += this.dy;
      }
      this.draw(ctx);
    },

    updateMouseTrail1: function (canvas, ctx, mouse, r) {
      if (this.radius < 0) {
        // recreate the atom near the current mouse location

        this.x = mouse[0] + Math.random() * 5;
        this.y = mouse[1] + Math.random() * 10;

        this.radius = 2 + Math.random() * r;
        this.fallValue = Math.random() * 3;
      }
      this.y += this.fallValue;
      this.fallValue += 0.3;

      this.draw(ctx);

      this.radius -= 0.07;

      if (this.y > canvas.height) {
        this.fallValue *= -1;
      }
    },

    checkBoundary: function (canvas) {
      if (this.x + 5 > canvas.width || this.x - 5 < 0) {
        this.dx = 0 - this.dx;
      }
      if (this.y + 5 > canvas.height || this.y - 5 < 0) {
        this.dy = 0 - this.dy;
      }
    },
  };

  function pipe(x, y, color, width) {
    this.x = x;
    this.y = y;
    this.direction = Math.random() * 360 * (Math.PI / 180);
    this.times = 0;
    this.width = width;
    this.speed = 1;
    this.color = color;
  }

  pipe.prototype = {
    updateLocation: function (ctx) {
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;
      if (this.times % 100 == 0) {
        // change the direction
        this.direction = Math.random() * 360 * (Math.PI / 180);
      }
      this.times += 1;
      this.draw(ctx);
    },

    draw: function (ctx) {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      ctx.stroke();
    },
  };

  randomAtom.prototype = {
    update_location: function () {
      this.pos[0] += this.velocity[0];
      this.pos[1] += this.velocity[1];
      this.x = this.pos[0];
      this.y = this.pos[1];
      this.velocity[0] += this.acceleration[0];
      this.velocity[1] += this.acceleration[1];
      this.acceleration = [0, 0, 0];
    },

    updateVelocity: function (vel_x, vel_y) {
      this.velocity[0] = vel_x;
      this.velocity[1] = vel_y;
    },

    updateAcceleration: function (force) {
      this.acceleration[0] += force[0];
      this.acceleration[1] += force[1];
    },

    locate: function (x, y) {
      const error = [x - this.pos[0], y - this.pos[1]];

      const magnitude = Math.pow(
        Math.pow(error[0], 2) + Math.pow(error[1], 2),
        0.5
      );

      let speed = 0.4;
      if (magnitude <= 50) {
        speed = (magnitude / 50) * 5;
      }

      let force = [
        (error[0] / magnitude) * speed,
        (error[1] / magnitude) * speed,
      ];

      force[0] -= this.velocity[0];
      force[1] -= this.velocity[1];

      this.updateAcceleration(force);
    },

    flee: function (x, y) {
      const error = [x - this.pos[0], y - this.pos[1]];

      const magnitude = Math.pow(
        Math.pow(error[0], 2) + Math.pow(error[1], 2),
        0.5
      );

      let speed = 1;
      if (magnitude <= 5) {
        speed = (magnitude / 50) * 5;

        let force = [
          (error[0] / magnitude) * speed,
          (error[1] / magnitude) * speed,
        ];

        force[0] -= this.velocity[0];
        force[1] -= this.velocity[1];
        force[0] *= -1;
        force[1] *= -1;
        this.updateAcceleration(force);
      }
    },
  };

  Atom.prototype = {
    update_location: function () {
      this.pos[0] += this.velocity[0];
      this.pos[1] += this.velocity[1];
      this.x = this.pos[0];
      this.y = this.pos[1];
      this.velocity[0] += this.acceleration[0];
      this.velocity[1] += this.acceleration[1];
      this.acceleration = [0, 0, 0];
    },

    updateVelocity: function (vel_x, vel_y) {
      this.velocity[0] = vel_x;
      this.velocity[1] = vel_y;
    },

    updateAcceleration: function (force) {
      this.acceleration[0] += force[0];
      this.acceleration[1] += force[1];
    },

    locate: function (x, y) {
      const error = [x - this.pos[0], y - this.pos[1]];

      const magnitude = Math.pow(
        Math.pow(error[0], 2) + Math.pow(error[1], 2),
        0.5
      );

      let speed = 0.4;
      if (magnitude <= 50) {
        speed = (magnitude / 50) * 5;
      }

      let force = [
        (error[0] / magnitude) * speed,
        (error[1] / magnitude) * speed,
      ];

      force[0] -= this.velocity[0];
      force[1] -= this.velocity[1];

      this.updateAcceleration(force);
    },
    flee: function (x, y, x1, y1) {
      let error;
      if (x1 != undefined && y1 != undefined) {
        error = [x - x1, y - y1];
      } else {
        error = [x - this.pos[0], y - this.pos[1]];
      }

      const magnitude = Math.pow(
        Math.pow(error[0], 2) + Math.pow(error[1], 2),
        0.5
      );

      let speed = 0.4;
      if (magnitude <= 50) {
        speed = (magnitude / 50) * 5;

        let force = [
          (error[0] / magnitude) * speed,
          (error[1] / magnitude) * speed,
        ];

        force[0] -= this.velocity[0];
        force[1] -= this.velocity[1];
        if (force[0] >= 1 || force[1] >= 1) {
          force = [1, 1];
        }

        force[0] *= -1;
        force[1] *= -1;

        this.updateAcceleration(force);
      } else {
        return;
      }
    },
  };

  global.atHeadings = global.atHeadings || atHeadings;
})(window);
