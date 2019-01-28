# HW-2-Create-Analog-Controller

### Getting Started
- Make sure [Node.js](https://nodejs.org/en/) is installed
- Clone this repo, or download the zip file.
- Navigate to the folder for this project in a terminal.
- At the top level of the project folder in your terminal run the command `npm install`

### Running the Game
- At the top level of the project folder in your terminal run the command `npm start`
- To open a debug window, select the toggle developer tools option on the window bar under view.

## Assignment: Make a Controller Using Analog Inputs
Using any analog inputs and the analog read function in Arduino, make a controller that is able to execute all of the game actions: Rotate Cannon, Steer Body, Accelerate, and Fire. Upload your Arduino code and a short video of your controller in action to canvas when complete. Video's should clearly display each input and it's connection to in game actions.

## Serial API

### Packet Shape
`bodyRot:cannonRot:speed:isFiring-`
ex packet `90:90:20:0-`

### Packet Properties
- bodyRot: number between 0 and 360, sets rotation of base of the player
- cannonRot: number between 0 and 360, sets rotation of the cannon
- speed: number between 0 and 100, sets the speed of the player
- isFiring: either 0 or 1, if 1 then the player will continuously fire bullets
