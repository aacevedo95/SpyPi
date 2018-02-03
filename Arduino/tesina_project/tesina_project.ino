 #include <dht.h>
 dht DHT;
 #define DHT11_PIN 7

const int trigPin = 2;
const int echoPin = 4;

void setup() {
  Serial.begin(9600);
}

void loop() {
  
  //Ultrasonic Sensor
  // establish variables for duration of the ping, 
  // and the distance result in inches and centimeters:
  long duration, inches, cm;

  // The sensor is triggered by a HIGH pulse of 10 or more microseconds.
  // Give a short LOW pulse beforehand to ensure a clean HIGH pulse:
  pinMode(trigPin, OUTPUT);
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read the signal from the sensor: a HIGH pulse whose
  // duration is the time (in microseconds) from the sending
  // of the ping to the reception of its echo off of an object.
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);

  // convert the time into a distance
  inches = microsecondsToInches(duration);
  //DHT 11 Module
  int chk = DHT.read11(DHT11_PIN);
  double temp = tempConversion(DHT.temperature);
  //  Serial.print("Temperature = ");
  //  Serial.println(temp);
  double humid = DHT.humidity;
  //  Serial.print("Humidity = ");
  //  Serial.println(humid );
  
  String resp = inches < 20 ? "true" : "false";
  Serial.println( resp + "," + String(temp) + "," + String(humid));

delay(1000);
}

long microsecondsToInches(long microseconds)
{
  return microseconds / 74 / 2;
}

double tempConversion (double temp){
  return ((temp*(1.8)) + 32);
}
