<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'] ?? '';

    // 1. Free Trial Form Data
    if ($action == 'trial') {
        $name = $conn->real_escape_string($_POST['name']);
        $phone = $conn->real_escape_string($_POST['phone']);
        $slot = $conn->real_escape_string($_POST['slot']);

        $sql = "INSERT INTO trial_requests (full_name, phone, slot) VALUES ('$name', '$phone', '$slot')";
        
        if ($conn->query(s: $sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Free trial booked successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
    }

    // 2. Join Now / Membership Form Data
    elseif ($action == 'join') {
        $name = $conn->real_escape_string($_POST['name']);
        $email = $conn->real_escape_string($_POST['email']);
        $phone = $conn->real_escape_string($_POST['phone']);
        $plan = $conn->real_escape_string($_POST['plan']);

        $sql = "INSERT INTO memberships (full_name, email, phone, plan) VALUES ('$name', '$email', '$phone', '$plan')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Membership application submitted successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
    }

    // 3. Contact / Inquiry Form Data
    elseif ($action == 'contact') {
        $dept = $conn->real_escape_string($_POST['department']);
        $name = $conn->real_escape_string($_POST['name']);
        $email = $conn->real_escape_string($_POST['email']);
        $phone = $conn->real_escape_string($_POST['phone']);
        $state = $conn->real_escape_string($_POST['state']);
        $city = $conn->real_escape_string($_POST['city']);

        $sql = "INSERT INTO inquiries (department, name, email, phone, state, city) VALUES ('$dept', '$name', '$email', '$phone', '$state', '$city')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Inquiry submitted successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
        }
    }
}
$conn->close();
?>