long prevTime = 0;

long vibrationCounter = 0;
long VIBRATION_LENGTH = 200;

void setup() {
  Serial.begin(9600);

  prevTime = millis();
}

String message = "";
void loop() {
  long currentTime = millis();
  long deltaTime = currentTime - prevTime;
  prevTime = currentTime;

  // Vibration Animation Code
  if (vibrationCounter > 0) {
    /// change something
    vibrationCounter -= deltaTime;
  } else {
    // turn vibration off
  }
  
  // Only run this if whe have a message
  if (Serial.available() > 0) {
    // Get message from computer
    message = Serial.readStringUntil('-');

    // Get cannon feedback info
    if (message.substring(0, 1).toInt() == 1) {
      // Execute Cannon Feedback
      vibrationCounter = VIBRATION_LENGTH;
    }

    // Clear the buffer so we are up to date with messages
    Serial.flush();
  }

  // Always delay a little
  delay(10);
}
