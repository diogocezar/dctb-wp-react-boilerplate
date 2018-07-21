  <?php
    class DCTBReact{

    /**
     * Constructor
     */

    public function __construct(){
        /* Add Polylang to API */
        add_action('rest_api_init' , array($this, 'polylang_json_api_init'));
        /* Add Ajax Actions */
        add_action('wp_ajax_nopriv_send_contact', array($this, 'send_contact'));
        add_action('wp_ajax_send_contact',        array($this, 'send_contact'));
        add_filter('allowed_http_origin',         '__return_true');
    }

    /**
     * Public Functions
     */

    public function polylang_json_api_init(){
        global $polylang;
        $default  = pll_default_language();
        $langs    = pll_languages_list();
        $cur_lang = $_GET['lang'];
        if (!in_array($cur_lang, $langs)) {
            $cur_lang = $default;
        }
        $polylang->curlang         = $polylang->model->get_language($cur_lang);
        $GLOBALS['text_direction'] = $polylang->curlang->is_rtl ? 'rtl' : 'ltr';
    }

    public function send_contact(){
        $this->normalizePost();
        if(empty($_POST))
            die(json_encode(array('error' => 'Empty fields.')));
        else{
            $email = $_POST["email"];
            $data = array();
            $data['post_title']    = 'Contact of ' . $email;
            $data['post_content']  = '' ;
            $data['post_status']   = 'publish';
            $data['post_author']   = 1;
            $data['post_category'] = array(0);
            $data['post_type']     = "contact";
            $acf = array(array('selector' => 'email', 'value' => $email));
            if($result_post = $this->insert_post($data, $acf)){
                die(json_encode(array('success' => 'Data saved.')));
            }
            else{
                die(json_encode(array('error' => 'Error trying to save data.')));
            }
        }
    }

    /**
     * Private Functions
     */

    private function normalizePost(){
        $_POST = json_decode(file_get_contents("php://input"), true);
    }

    private function insert_db($table, $data){
        global $wpdb;
        if(isset($table) && isset($data))
            return $wpdb->insert($table, $data);
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
} new DCTBReact();
?>