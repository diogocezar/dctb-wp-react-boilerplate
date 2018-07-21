  <?php
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
            //$this->normalizePost();
            if(empty($_POST))
                die(json_encode(array('error' => 'Empty fields.')));
            else{
                $email = $_POST["email"];
                $data  = $this->getAcfDefault('Contact of ' . $email, 'contact');
                $acf   = array(array('selector' => 'email', 'value' => $email));
                if($this->insert_post($data, $acf))
                    die(json_encode(array('success' => 'Data saved.')));
                else
                    die(json_encode(array('error' => 'Error trying to save data.')));
            }
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
            if(!isset($data))
                return false;
            $post_id = wp_insert_post($data);
            if($acf != false){
                foreach ($acf as $key => $value)
                    update_field($value['selector'], $value['value'], $post_id);
            }
            return true;
        }
    }
    new DCTBReact();
?>