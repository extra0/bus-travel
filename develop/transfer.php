<?php
$sendto   = "extra12319@gmail.com";
$date 	      = $_POST['date'];
$time 	      = $_POST['time'];
$cityDep 	  = $_POST['city-departure'];
$cityArr 	  = $_POST['city-arrive'];
$name    	  = $_POST['name'];
$phone        = $_POST['phone'];
$quantity     = $_POST['quantity'];
$message     = $_POST['message'];

// Формирование заголовка письма
$subject  = "Заказ трансфера";
$headers  = "From: " . strip_tags("transfer@vseputi.com.ua") . "\r\n";
$headers .= "Reply-To: ". strip_tags("transfer@vseputi.com.ua") . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px solid #ccc; padding-bottom:15px;'>Заказ трансфера</h2>\r\n";
$msg .= "<p><strong>Дата:</strong> ".$date." в ".$time."</p>\r\n";
$msg .= "<p><strong>Город и место отправления:</strong> ".$cityDep."</p>\r\n";
$msg .= "<p><strong>Город и место прибытия:</strong> ".$cityArr."</p>\r\n";
$msg .= "<p><strong>Кол-во мест:</strong> ".$quantity."</p>\r\n";
$msg .= "<p><strong>Имя:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>Комментарий:</strong> ".$message."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo 'true';
} else {
	echo 'false';
}

?>