<?php
// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
$servername = 'localhost';
$username = 'unvglsaaw1gzh';
$password = 'm3^1die21g2@';
$dbname = 'dbfyftdgrz6ndn';

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Fetch service times
$sql = "SELECT name, value FROM events_options WHERE name IN ('prayer_meeting_time', 'worship_service_time', 'thanksgiving_time')";
$result = $conn->query($sql);

$service_times = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $service_times[$row['name']] = $row['value'];
    }
    echo json_encode(['success' => true, 'data' => $service_times]);
} else {
    echo json_encode(['success' => false, 'message' => 'No service times found']);
}

$conn->close();
?> 