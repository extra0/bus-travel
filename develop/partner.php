<?php
$sendto   = "extra0@mail.ru";
$name 	  = $_POST['name'];
$phone    = $_POST['phone'];
$email    = $_POST['email'];
$category    = $_POST['category'];
$message    = $_POST['message'];
// Формирование заголовка письма
$subject  = "Сотрудничество";
$headers  = "From: " . strip_tags('partnership@vseputi.com.ua') . "\r\n";
$headers .= "Reply-To: ". strip_tags('partnership@vseputi.com.ua') . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc; padding-bottom:15px;'>Заполнена форма сотрудничества:</h2>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>Email:</strong> ".$email."</p>\r\n";
$msg .= "<p><strong>Категория:</strong> ".$category."</p>\r\n";
$msg .= "<p><strong>Сообщение:</strong> ".$message."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo 'true';
} else {
	echo 'false';
}

?>