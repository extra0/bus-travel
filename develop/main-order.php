<?php
$sendto       = "extra0@mail.ru";
$cityFrom 	  = $_POST['city-from'];
$cityTo 	  = $_POST['city-to'];
$date 	      = $_POST['date'];
$places 	  = $_POST['places'];
$name 	      = $_POST['name'];
$phone        = $_POST['phone'];
// Формирование заголовка письма
$subject  = "Бронирование мест с главной";
$headers  = "From: " . strip_tags($usermail) . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc; padding-bottom:15px;'>Бронь мест с главной:</h2>\r\n";
$msg .= "<p><strong>Откуда:</strong> ".$cityFrom."</p>\r\n";
$msg .= "<p><strong>Куда:</strong> ".$cityTo."</p>\r\n";
$msg .= "<p><strong>Дата:</strong> ".$date."</p>\r\n";
$msg .= "<p><strong>Кол-во мест:</strong> ".$places."</p>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo 'true';
} else {
	echo 'false';
}

?>