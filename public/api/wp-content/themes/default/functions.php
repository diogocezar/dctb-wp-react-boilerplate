  <?php
    function polylang_json_api_init(){
        global $polylang;
        $default = pll_default_language();
        $langs = pll_languages_list();
        $cur_lang = $_GET['lang'];
        if (!in_array($cur_lang, $langs)) {
            $cur_lang = $default;
        }
        $polylang->curlang = $polylang->model->get_language($cur_lang);
        $GLOBALS['text_direction'] = $polylang->curlang->is_rtl ? 'rtl' : 'ltr';
    }
    function polylang_json_api_languages(){
        return pll_languages_list();
    }
    add_action( 'rest_api_init' , 'polylang_json_api_init' );
?>