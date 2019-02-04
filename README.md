# HW-3-Controller Feedback

### Getting Started
- Make sure [Node.js](https://nodejs.org/en/) is installed
- Clone this repo, or download the zip file.
- Navigate to the folder for this project in a terminal.
- At the top level of the project folder in your terminal run the command `npm install`

### Running the Game
- At the top level of the project folder in your terminal run the command `npm start`
- To open a debug window, select the toggle developer tools option on the window bar under view.

## Assignment: Add Feedback To Your Controller
Using the controller from HW 2, add feedback connected to the game. Make a controller that somehow provides feedback for the following game properties Cannon Fired, Movement, and Collisions. Upload your Arduino code and a short video of your controller in action to canvas when complete. Video's should clearly display each feedback element.

### Useful Links
- [Serial API details](https://www.arduino.cc/reference/en/language/functions/communication/serial/)
- [Arduino String API](https://www.arduino.cc/reference/en/language/variables/data-types/stringobject/)

# Serial API

## Feedback Packet

### Packet Shape
`cannon:movement:isColliding-`

### Packet Properties
- cannon: either 0 or 1, tells if cannon has just been fired
- movement: from 0 - 9, tells current velocity of player
- isColliding: ether 0 or 1, tells if player is colliding with something

## Input Packet

### Packet Shape
`bodyRot:cannonRot:speed:isFiring-`
ex packet `90:90:20:0-`

### Packet Properties
- bodyRot: number between 0 and 360, sets rotation of base of the player
- cannonRot: number between 0 and 360, sets rotation of the cannon
- speed: number between 0 and 100, sets the speed of the player
- isFiring: either 0 or 1, if 1 then the player will continuously fire bullets
