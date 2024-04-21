<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Функция отправки сообщения в Telegram
function sendMessageToTelegram($chatID, $message, $token) {
	// Используем Markdown вместо HTML
	$url = "https://api.telegram.org/bot" . $token . "/sendMessage?chat_id=" . $chatID . "&parse_mode=Markdown&text=" . urlencode($message);
	$ch = curl_init();
	$optArray = array(
		CURLOPT_URL => $url,
		CURLOPT_RETURNTRANSFER => true
	);
	curl_setopt_array($ch, $optArray);
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}

// Функция для отправки данных на вебхук
function sendToWebhook($data, $webhookUrl) {
	$ch = curl_init($webhookUrl);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);
	return $response;
}

// Сбор данных из формы
$title = "Заявка с сайта";
$body = '';
$c = true;

foreach ($_POST as $key => $value) {
	if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
		$body .= "
    " . (($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">') . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
	}
}
$body = "<table style='width: 100%;'>$body</table>";
$dataForWebhook = ['title' => $title, 'body' => $body];

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->isSMTP();
$mail->CharSet = "UTF-8";
$mail->SMTPAuth = true;
$mail->Host       = 'smtp.gmail.com';
$mail->Username   = 'sitemailerapp@gmail.com';
$mail->Password   = 'mvjhkduwzuujixje';
$mail->SMTPSecure = 'ssl';
$mail->Port       = 465;
$mail->setFrom('sitemailerapp@gmail.com', 'Cyprus Life'); // Адрес почты и имя отправителя
$mail->addAddress('yourmail@gmail.com'); // Кому отправляется письмо

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;

// Отправка и обработка результатов
try {
	$mail->send();
	$telegramToken = '7037180016:AAEo-IOOh8wZyuAJ_piNvXlwaRcNri-X11Y'; // Токен
	$chatID = '-1002127205837'; // ID чата
	$telegramMessage = "Новая заявка с Cyprus Life:\n";
	foreach ($_POST as $key => $value) {
		if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
			$formattedKey = str_replace('_', ' ', ucfirst($key)); // Делаем первую букву заглавной и заменяем подчеркивания
			$telegramMessage .= "*$formattedKey*: `$value`\n"; // Добавляем каждое поле в сообщение
		}
	}

	$telegramMessage .= "\n*Спасибо за вашу заявку!*";
	
	sendMessageToTelegram($chatID, $telegramMessage, $telegramToken);
	$webhookUrl = 'https://s4.apix-drive.com/web-hooks/163485/orqy9vwn'; // URL вебхука
	sendToWebhook($dataForWebhook, $webhookUrl);
	echo "Сообщение отправлено на почту, в Telegram и на вебхук.";
} catch (Exception $e) {
	echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
?>
