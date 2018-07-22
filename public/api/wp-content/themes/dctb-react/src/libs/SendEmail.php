<?php
	/**
	* 	SendEmail
	* 	Class to send email
	* 	Author: Diogo Cezar <diogo@diogocezar.com>
	*	Year: 2018
	*/

	namespace App\Libs;

	class SendEmail{
		/**
		* Attribute to store configs
		*/
		public $configs;

		/**
		* Construtor
		*/
		public function __construct($configs){
			$this->configs = $configs;
		}
		/**
		* If succefully send
		*/
		private function send_ok($return, $result=false){
			$return['success'] = "true";
			$return['message'] = $this->configs['success'];
			if($result)
				return $return;
			else
				echo json_encode($return);
		}
		/**
		* If not succefully send
		*/
		private function send_error($return, $result=false){
			$return['msg']     = array('message' => $this->configs['error']);
			$return['success'] = "false";
			if($result)
				return $return;
			else
				echo json_encode($return);
		}
		/**
		* Send Email by SendGrid
		*/
		private function send_sg($emails, $email, $name, $content, $subject, $result=false){
			$sg   = new \SendGrid($this->configs['configs']['sendgrid']['sg_key']);
			$mail = new \SendGrid\Email();
			foreach ($emails as $email => $name)
				$mail->addTo($email);
			$mail->setFrom($this->configs['from'])
			     ->setSubject($subject)
			     ->setHtml($content);
			try {
				$sg->send($mail);
				return $this->send_ok(array(), $result);
			}
			catch(\SendGrid\Exception $e) {
				$code = $e->getCode();
				foreach($e->getErrors() as $er)
					$errors[] = $er;
				$return['errors']      = $errors;
				$return ['error_code'] = $code;
				return $this->send_error($return, $result);
			}
		}
		/**
		* Send Email by MailGun
		*/
		private function send_mg($emails, $email, $name, $content, $subject, $result=false){
			$mg      = new \Mailgun\Mailgun($this->configs['configs']['mailgun']['mg_key']);
			$domain  = $this->configs['configs']['mailgun']['mg_domain'];
			$to      = "";
			$from    = "";
			foreach ($emails as $email => $name)
				$to .= $name . " <".$email.">, ";
			$to   = rtrim($to,',');
			$from = $this->configs['name'] . " <". $this->configs['from'] . ">";
			try{
				$result = $mg->sendMessage($domain, array(
				    'from'    => $from,
				    'to'      => $to,
				    'subject' => $subject,
				    'html'    => $content
				));
				return $this->send_ok(array(), $result);
			}
			catch(Exception $e){
				$return['errors'] = $e->getMessage();
				return $this->send_error($return, $result);
			}
		}
		/**
		* Send Email by Phpmailer
		*/
		private function send_pm($emails, $email, $name, $content, $subject, $result=false) {
			$pm = new \PHPMailer();
			if($this->configs['configs']['phpmailer']['pm_is_smtp'])
				$pm->IsSMTP();
			$pm->SMTPDebug  = $this->configs['configs']['phpmailer']['pm_debug'];
			$pm->Host       = $this->configs['configs']['phpmailer']['pm_host'];
			$pm->Port       = $this->configs['configs']['phpmailer']['pm_port'];
			$pm->SMTPAuth   = $this->configs['configs']['phpmailer']['pm_auth'];
			$pm->Username   = $this->configs['configs']['phpmailer']['pm_user'];
			$pm->Password   = $this->configs['configs']['phpmailer']['pm_pass'];
			$pm->CharSet    = 'UTF-8';
			$pm->SetFrom($this->configs['from'], $this->configs['name']);
			foreach ($emails as $email => $name)
				$pm->AddAddress($email, $name);
			$pm->Subject = $subject;
			$pm->MsgHTML($content);
			try{
				$pm->Send();
				return $this->send_ok(array(), $result);
			}
			catch(Exception $e){
				$return['errors'] = $e->getMessage();
				return $this->send_error($return, $result);
			}
		}
		/**
		* Prepare to Send
		*/
		public function go($emails, $email, $name, $content, $subject, $result=false){
			switch($this->configs['type']){
				case "sendgrid":
					return $this->send_sg($emails, $email, $name, $content, $subject, $result);
				break;
				case "mailgun" :
					return $this->send_mg($emails, $email, $name, $content, $subject, $result);
				break;
				case "phpmailer" :
					return $this->send_pm($emails, $email, $name, $content, $subject, $result);
			}
		}
	}
?>