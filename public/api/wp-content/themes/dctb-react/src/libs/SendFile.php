<?php
	/**
	* 	SendFile
	* 	Class to send file to server
	* 	Author: Diogo Cezar <diogo@diogocezar.com>
	*	Year: 2018
	*/

	namespace App\Libs;

	class SendFile{

		/**
		* Attribute to store original name file.
		*/
		private $name;

		/**
		* Attribute to store MIME type of file.
		*/
		private $type;

		/**
		* Attribute to store size (bytes)
		*/
		private $size;

		/**
		* Attribute to store temp name.
		*/
		private $tmp_name;

		/**
		* Attribute to store file error.
		*/
		private $error;

		/**
		* Attribute to store errors
		*/
		public static $errors = array();

		/**
		* Attribute to store original directory
		*/
		private $dir;

		/**
		* Attribute to store file extension
		*/
		private $ext;

		/**
		* Attribute to store if file was sended
		*/
		private $finished;

		/**
		* Attribute to set photo only
		*/
		private $photo_only;

		/**
		* Attribute to store configs
		*/
		public $configs;

		/**
		* Construtor
		*/
		public function __construct($configs){
			$this->configs = $configs;
			$this->photo_only = false;
		}

		/**
		* Method to Remove Accents
		*/
		public function remove_accents($string) {
			$unwanted_array = array('Š'=>'S', 'š'=>'s', 'Ž'=>'Z', 'ž'=>'z', 'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
                            'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U',
                            'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss', 'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c',
                            'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o',
                            'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y' );
			$string = strtr($string, $unwanted_array);
		    return $string;
		}

		/**
		* Method to Slugify
		*/
		public function slugify($text){
			$text = $this->remove_accents($text);
			$text = preg_replace('~[^\pL\d]+~u', '-', $text);
			$text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
			$text = preg_replace('~[^-\w]+~', '', $text);
			$text = trim($text, '-');
			$text = preg_replace('~-+~', '-', $text);
			$text = strtolower($text);
			if (empty($text)){ return 'n-a'; }
			return $text;
		}

		/**
		* Method to store errors
		*/
		public function setError($new_error){
			SendFile::$errors[] = $new_error;
		}

		/**
		* Method to prepare file
		*/
		public function go($file, $dir){
			set_time_limit(0);

		 	define('LIMIT_EXT'           , true);
		 	define('LIMIT_SIZ'           , true);
		 	define('MAX_SIZE'            , $this->configs['max-size']);
		 	define('CHANGE_QUALITY'      , true);
		 	define('QUALITY'             , $this->configs['quality']);

			$this->name      = $file['name'];
			$this->size      = $file['size'];
			$this->tmp_name  = $file['tmp_name'];
			$this->type      = $file['type'];
			$this->dir       = $dir;
			$this->error     = $file['error'];

			if(!is_dir($dir)){
				$this->setError($this->configs['invalid-dir']);
			}
			else if(!empty($this->error)){
				$this->setError($this->configs['error'] . $this->error);
			}
			else if(empty($this->name) || empty($this->size) || empty($this->tmp_name) || empty($this->type)){
				$this->setError($this->configs['incomplete']);
			}
			else{
				$response = array();
				$this->finished = false;
				$this->goFile();
				if(!empty(self::$error)){
					$response = array('success' => 'false', 'message' => $this->configs['error'], 'errors' => self::$error);
				}
				else{
					$response = array('success' => 'true', 'message' => $this->configs['success']);
				}
				return $response;
			}
		}
		/**
		* Method to send file
		*/
		public function goFile(){

			$validExts = $this->configs['allowed-ext'];

			$mimeExt   = array('gif' => 'image/gif',
				               'jpg' => 'image/pjpeg',
				               'png' => 'image/x-png',
				              );
			$this->ext  = strrchr($this->name, '.');
			$this->name = str_replace($this->ext, "", $this->name);
			$this->name = $this->slugify($this->name);
			$this->name = $this->dir.'/'.$this->name.$this->ext;

			if(LIMIT_EXT == true && !in_array($this->ext, $validExts)){
				$this->setError($this->configs['invalid-ext']);
			}

			if(LIMIT_SIZ == true && $this->size > MAX_SIZE){
				$this->setError($this->configs['invalid-size']);
			}

			$expSlash = explode('/', $this->name);
			$nameExt  = $expSlash[count($expSlash)-1];
			$extDot   = explode('.', $nameExt);
			$fileName =  $extDot[0];

			if(file_exists($this->name)){
				$count = 1;
				$this->name = $this->dir.'/'.$fileName.'['.$count.']'.$this->ext;
				while(file_exists($this->name)){
					$count++;
					$this->name = $this->dir.'/'.$fileName.'['.$count.']'.$this->ext;
				}
			}

			if(!empty(self::$error)){
				return;
			}

			if(move_uploaded_file($this->tmp_name, $this->name)){

				foreach($mimeExt as $mime => $ext){
					if($this->type == $mime && $this->ext != $ext){
						$this->ext = $mimeExt[$mime];
						rename($this->name, $this->dir.'/'.$fileName.$this->ext);
						$this->name = $this->dit.'/'.$fileName.$this->ext;
					}
				}
				if($this->ext == '.jpeg' || $this->ext == '.jpg' || $this->ext == '.gif' || $this->ext == '.png'){
					if(CHANGE_QUALITY == true){
						switch($this->ext){
							case '.jpeg':
							case '.jpg' :
								$img = imagecreatefromjpeg($this->name);
								imagejpeg($img, $this->name, QUALITY);
								break;

							case '.gif':
								$img = imagecreatefromgif($this->name);
								imagegif($img, $this->name, QUALITY);
								break;

							case '.png':
								$img = imagecreatefrompng($this->name);
								$qualityPng = (QUALITY / 10);
								imagepng($img, $this->name, $qualityPng);
								break;
						}
					}
				}
			}
			$this->finished = true;
		}
		/**
		* Method to get name
		*/
		public function getName(){
			if($this->finished == true){
				return $this->name;
			}
			else{
				return false;
			}
		}
		/**
		* Method to get Errors
		*/
		public function getErrors(){
			$return = array('errors' => self::$errors, 'success' => 'false');
			return $return;
		}
		/**
		* Magic methods to get and set
		*/
		public function __call ($method, $param){
			if (substr($method, 0, 3) == 'set') {
				$var = substr(strtolower(preg_replace('/([a-z])([A-Z])/', "$1_$2", $method)), 4);
				$this->$var = $param[0];
			}
			elseif (substr($method, 0, 3) == 'get'){
				$var = substr(strtolower(preg_replace('/([a-z])([A-Z])/', "$1_$2", $method)), 4);
				return $this->$var;
			}
		}
	}
?>