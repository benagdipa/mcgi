<?php
$servername = 'localhost';
$username = 'unvglsaaw1gzh';
$password = 'm3^1die21g2@';
$dbname = 'dbfyftdgrz6ndn';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$sql1 = "INSERT INTO events_options (name, value, created_at, updated_at) VALUES ('prayer_meeting_time', 'Every Wednesday - NSW/VIC/TAS: 6:30 AM AEST, QLD: 6:30 AM AEST, SA/NT: 6:00 AM ACST, WA: 4:30 AM AWST', NOW(), NOW())";
$sql2 = "INSERT INTO events_options (name, value, created_at, updated_at) VALUES ('worship_service_time', 'Every Saturday - NSW/VIC/TAS: 6:30 AM AEST, QLD: 6:30 AM AEST, SA/NT: 6:00 AM ACST, WA: 4:30 AM AWST', NOW(), NOW())";
$sql3 = "INSERT INTO events_options (name, value, created_at, updated_at) VALUES ('thanksgiving_time', 'Every Saturday - NSW/VIC/TAS: 7:00 PM AEST, QLD: 7:00 PM AEST, SA/NT: 6:30 PM ACST, WA: 5:00 PM AWST', NOW(), NOW())";

if ($conn->query($sql1) === TRUE) {
    echo "Prayer meeting time added successfully\n";
} else {
    echo "Error adding prayer meeting time: " . $conn->error . "\n";
}

if ($conn->query($sql2) === TRUE) {
    echo "Worship service time added successfully\n";
} else {
    echo "Error adding worship service time: " . $conn->error . "\n";
}

if ($conn->query($sql3) === TRUE) {
    echo "Thanksgiving time added successfully\n";
} else {
    echo "Error adding thanksgiving time: " . $conn->error . "\n";
}

$conn->close();
?> 