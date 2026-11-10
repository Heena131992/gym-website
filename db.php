<?php
$host = "localhost";
$username = "root"; // Aapka database username
$password = "";     // Aapka database password
$dbname = "phoenix_gym_db";

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>