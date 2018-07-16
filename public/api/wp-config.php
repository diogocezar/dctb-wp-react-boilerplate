<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do MySQL
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/pt-br:Editando_wp-config.php
 *
 * @package WordPress
 */

// ** Configurações do MySQL - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define('DB_NAME', 'filmes');

/** Usuário do banco de dados MySQL */
define('DB_USER', 'root');

/** Senha do banco de dados MySQL */
define('DB_PASSWORD', '');

/** Nome do host do MySQL */
define('DB_HOST', 'localhost');

/** Charset do banco de dados a ser usado na criação das tabelas. */
define('DB_CHARSET', 'utf8mb4');

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define('DB_COLLATE', '');

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '0w]H_SXJ$o)n2!a}K`F4h#A^Om><hAeaa_G^ Azy@9%TOze7/.Wovn7H*T*&;7#0');
define('SECURE_AUTH_KEY',  '9)7|0Mt{Es}UZXy%FlT^c-r`TD~F2!8RxD**.Zj,!US`B6K~g%KU.)fm>Y~SIURY');
define('LOGGED_IN_KEY',    '80+NF7ARvV>EyFFW/RP?Za-F[obUpdN3K$nbck=TUKCC5BC~$:^<P+buH9K}6cc:');
define('NONCE_KEY',        'g7-q4T4o L.%?^#@>/}NL#d9vElHXs;J#R;4/:+hDwfPU*}}aAF~RL+^*f+./vP*');
define('AUTH_SALT',        'eR_P /U}:3EvHL2U-/d8!Ved8&!|VV:IP5In&^1u$UQsytkuMi73qf>._oCL=^$-');
define('SECURE_AUTH_SALT', 'Uwt-9Da+c<c3;coe9;G[+~fqwE]xhs~0sA6Cv.}OlSt=xr735hC,w5[8Si@af/T]');
define('LOGGED_IN_SALT',   'yy%I^#+(w=t>^2|k>C`K{%/GIE0A/Ixd^eR*]-ezg7r1^??pak.pODYh~7sIoN~M');
define('NONCE_SALT',       'f(W8`n wSt.cx-{m&{O:@rL+,XVhQj-d=;;VMV<WsZ{viDpXrcN}re.E/Rsn`.kQ');

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix  = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://codex.wordpress.org/pt-br:Depura%C3%A7%C3%A3o_no_WordPress
 */
define('WP_DEBUG', false);

/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Configura as variáveis e arquivos do WordPress. */
require_once(ABSPATH . 'wp-settings.php');