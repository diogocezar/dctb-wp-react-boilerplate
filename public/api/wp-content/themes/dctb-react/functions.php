  <?php
  	/**
	* 	Functions to configure template
	* 	Author: Diogo Cezar <diogo@diogocezar.com>
	*	Year: 2018
    */
    class DCTBReactConfigs{
        public static $configs;
        public static $config_json = "/src/config/config.json";
        private function __construct(){}
        public static function start(){
            DCTBReactConfigs::$configs = json_decode(file_get_contents(__DIR__ . DCTBReactConfigs::$config_json), true)['config'];
        }
    } DCTBReactConfigs::start();

    class DCTBReact{
        public function __construct(){
            add_action('rest_api_init' , array($this, 'polylang_json_api_init'));
            add_action('wp_ajax_nopriv_send_contact', array($this, 'send_contact'));
            add_action('wp_ajax_send_contact',        array($this, 'send_contact'));
            add_filter('allowed_http_origin',         '__return_true');
        }
        public function polylang_json_api_init(){
            global $polylang;
            $default  = pll_default_language();
            $langs    = pll_languages_list();
            $cur_lang = $_GET['lang'];
            if (!in_array($cur_lang, $langs))
                $cur_lang = $default;
            $polylang->curlang         = $polylang->model->get_language($cur_lang);
            $GLOBALS['text_direction'] = $polylang->curlang->is_rtl ? 'rtl' : 'ltr';
        }
        public function send_contact(){
            // Errors
            error_reporting(E_ALL);
            ini_set('display_errors', 'on');
            // Includes
            require_once(__DIR__.'/src/vendor/autoload.php');
            require_once(__DIR__.'/src/libs/SendEmail.php');
            require_once(__DIR__.'/src/libs/SendFile.php');
            // Response
            $response = array();
            //$this->normalizePost();
            if(empty($_POST))
                die(json_encode(array('error' => 'Empty fields.')));
            else{
                // Save DB
                $email = $_POST["email"];
                $data  = $this->getAcfDefault('Contact of ' . $email, 'contact');
                $acf   = array(array('selector' => 'email', 'value' => $email));
                $response['db'] = $this->insert_post($data, $acf);
                // Send Email
                $replaces = array(array('key' => 'email', 'value' => $email));
                $response['email'] = $this->send_email($replaces, 'contact', "xgordo@gmail.com", "diogo", "Contato");
                // Save Upload
                if(!empty($_FILES['file'])){
                    $sf = new App\Libs\SendFile(DCTBReactConfigs::$configs['send-file']);
                    $response['file'] = $sf->go($_FILES['file'], __DIR__."/uploads");
                }
                die(json_encode($response));
            }
        }
        private function send_email($replaces, $template, $email, $name, $subject, $emails = false){
            $se      = new App\Libs\SendEmail(DCTBReactConfigs::$configs['send-mail']);
            $content = $this->get_template($replaces, $template);
            if($emails == false)
                $emails  = DCTBReactConfigs::$configs['send-mail']['to']['contact'];
            $result  = $se->go($emails, $email, $name, $content, $subject, true);
            return $result;
        }
        private function get_template($replaces, $type){
            if(empty($type))
                return;
            switch($type){
                case 'contact' : $file = __DIR__ . '/' . DCTBReactConfigs::$configs['send-mail']['templates']['contact']; break;
            }
            $content = file_get_contents($file);
            for($i=0;$i<count($replaces);$i++)
                $content = str_replace("{".$replaces[$i]['key']."}", $replaces[$i]['value'], $content);
            return $content;
        }
        private function getAcfDefault($title, $post_type, $content = ''){
            return array(
                'post_title'    => $title,
                'post_content'  => $content,
                'post_status'   => 'publish',
                'post_author'   => 1,
                'post_category' => array(0),
                'post_type'     => $post_type
            );
        }
        private function normalizePost(){
            $_POST = json_decode(file_get_contents("php://input"), true);
        }
        private function insert_post($data, $acf=false){
            try{
                if(!isset($data))
                    return false;
                $post_id = wp_insert_post($data);
                if($acf != false){
                    foreach ($acf as $key => $value)
                        update_field($value['selector'], $value['value'], $post_id);
                }
                return array('success' => 'true', 'message' => DCTBReactConfigs::$configs['send-db']['success']);
            }
            catch(Exception $e){
                return array('success' => 'true', 'message' => DCTBReactConfigs::$configs['send-db']['error']);
            }
        }
    }
    new DCTBReact();
?>