void setup() {
  Serial.begin(9600);
}

String message = "";
void loop() {
  // Only run this if whe have a message
  if (Serial.available() > 0) {
    // Get message from computer
    message = Serial.readStringUntil('-');

    // Get cannon feedback info
    if (message.substring(0, 1).toInt() == 1) {
      // Execute Cannon Feedback
    }

    // Clear the buffer so we are up to date with messages
    Serial.flush();
  }

  // Always delay a little
  delay(10);
}
