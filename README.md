Introduction AT-Headings.js <br /> <br />
LINK TO LANDING PAGE WEBSITE: https://tranquil-badlands-02136.herokuapp.com/home.html <br />
LINK TO DOCUMENTATION: https://tranquil-badlands-02136.herokuapp.com/documentation.html <br /> <br />
Headings and titles have remained quite boring and plain for most of the websites. There hasn’t
been any significant innovation in the design and interactive behaviour of titles/headings.
Introducing AT-Headings.js, a javascript library that will help you create super interesting dynamic
looking headings and titles whose behaviour can be controlled or changed via user
interactions.The headings will be made of smaller particles like atoms(for e.g circles) which will
have similar properties but will collectively act to display the heading. Interactive animation effects
such as gravity affect, explosion, changing shape, size colour are some of the many features
available. It also provides many unique highly customisable background which are animated and appear beautiful on the landing page of websites. <br />

Getting Started with AT-Headings.js <br />

The AT-headings.js is the javascript file where all the code related to the library is present. Thus to include this library in your project simply download this file and link it to your html file where you want to use its features. There is no CSS files that need to linked. The only other library that AT-Headings.js uses is J-Query which is the second file that you have to link up. The code is given below: <br />

Code: <script src=“PathOfYourFile/AT-headings.js”></script> <br />
Code: <script src=“https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> <br />

Basic Usage:
Create a HTML canvas. Code: <canvas id="canvas6" width="1250" height="600" style="background: black;"> <br />
Create a new javascript file and add the following 5 lines which creates a new object of type At-heading and finds the canvas element and create a “context” required for drawing and animating the canvas element. <br />
Then simply call atHeading.displayHeading(canvas, ctx, title) which requires a canvas, ctx, and a heading parameter to be displayed on this canvas. <br />
Now accessing say the slant animation is very simple just call the atHeading.slantAnimation(canvas, ctx) and voila the animation is ready and running on the canvas specified. All of this in just 5 minutes. <br />

Code for basic functionality: <br />

const atHeading = new atHeadings(); <br />
const canvas = document.getElementById("canvas"); <br />
const ctx = canvas.getContext("2d"); <br />
atHeading.displayHeading(canvas, ctx, "abcde"); <br />
atHeading.slantAnimation(canvas, ctx); <br />
