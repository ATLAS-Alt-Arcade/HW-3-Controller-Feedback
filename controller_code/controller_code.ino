void setup() {
  Serial.begin(9600);
}

String message = "";
void loop() {
  // Only run this if whe have a message
  if (Serial.available() > 0) {
    // Get message from
    message = Serial.readStringUntil('-');
    // This is where you should parse and do something with the message
    Serial.print("READ ITEM: ");
    Serial.println(message);

    // Clear the buffer so we are up to date with messages
    Serial.flush();
  }

  // Demo of commands
  Serial.println("90:90:20:0-");
  delay(1000);
}
