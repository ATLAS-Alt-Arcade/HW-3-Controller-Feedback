void setup() {
  Serial.begin(9600);
}

void loop() {
  // Demo of commands
  Serial.print("90:90:20:0-");
  delay(1000);
  Serial.print("90:100:0:0-");
  delay(1000);
  Serial.print("300:100:70:1-");
  delay(1000);
}
