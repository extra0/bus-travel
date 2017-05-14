<?php
$sendto   = "extra12319@gmail.com";
$name 	  = $_POST['name'];
$route    = $_POST['route'];
$email    = $_POST['email'];
$message  = $_POST['message'];
// Формирование заголовка письма
$subject  = "Отзыв от ".$name."";
$headers  = "From: " . strip_tags('feedback@vseputi.com.ua') . "\r\n";
$headers .= "Reply-To: ". strip_tags('feedback@vseputi.com.ua') . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc; padding-bottom:15px;'>Оставлен отзыв:</h2>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Маршрут:</strong> ".$route."</p>\r\n";
$msg .= "<p><strong>Email:</strong> ".$email."</p>\r\n";
$msg .= "<p><strong>Содержание отзыва:</strong> ".$message."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo 'true';
} else {
	echo 'false';
}

?>