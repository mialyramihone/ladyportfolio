<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "ramihonemialy@gmail.com";
    $subject = "Nouveau message du site";
    $message = "Nom : " . $_POST['name'] . "\n";
    $message .= "Email : " . $_POST['email'] . "\n";
    $message .= "Message : " . $_POST['message'];
    $headers = "From: no-reply@monsite.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Message envoyé avec succès.";
    } else {
        echo "Échec de l'envoi du message.";
    }
}
?>
