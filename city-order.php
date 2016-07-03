<?php
$sendto       = "extra0@mail.ru";
$citys 	      = $_POST['citys'];
$cityArive 	  = $_POST['city-arive'];
$placeFrom 	  = $_POST['place-from'];
$placeTo 	  = $_POST['place-to'];
$date 	      = $_POST['date'];
$places 	  = $_POST['places'];
$name 	      = $_POST['name'];
$phone        = $_POST['phone'];
$price        = $_POST['price'];
// Формирование заголовка письма
$subject  = "Бронирование на рейс ".$citys."";
$headers  = "From: " . strip_tags($usermail) . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px solid #ccc; padding-bottom:15px;'>Бронь мест ".$citys."</h2>\r\n";
// $msg .= "<p><strong>Города:</strong> ".$citys."</p>\r\n";
$msg .= "<p><strong>Дата:</strong> ".$date."</p>\r\n";
$msg .= "<p><strong>Забрать из:</strong> ".$cityArive."</p>\r\n";
$msg .= "<p><strong>Отправление:</strong> ".$placeFrom."</p>\r\n";
// $msg .= "<p><strong>Прибытие:</strong> ".$placeTo."</p>\r\n";
$msg .= "<p><strong>Кол-во мест:</strong> ".$places."</p>\r\n";
$msg .= "<p><strong>Цена:</strong> ".$price."</p>\r\n";
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