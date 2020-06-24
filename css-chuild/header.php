<?php
/**
 * Template Name: header
 * @package WordPress
 * @subpackage superpack
 */
?>
<!DOCTYPE html>
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<head>
<!--<script> 
$("document").on("click touchstart", ".parent", function(){
  var t=$(this);
  self.getInfo(t.data("id"), t.data("options"));
  return false;
});
</script>-->
<!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
<meta name="description" content="Профессиональное производство полиэтиленовых пакетов в Киеве с доставкой по всей Украине.">
<meta name='yandex-verification' content='77e50f5b3aef4c57' />
<meta name="viewport" content="width=device-width">
<meta itemprop="name" content="<?php bloginfo('name'); ?>">
<link href="/favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
<link href='https://fonts.googleapis.com/css?family=Philosopher:400,400italic,700italic,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css" />
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$(".slider img").wrap("<span><span></span></span>");
});
</script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.flexslider.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.fancybox.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.mousewheel-3.0.6.pack.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.main.js"></script>
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "url": "http://usprint.com.ua",
  "logo": "http://usprint.com.ua/wp-content/themes/superpack/images/logo.png"
}
</script>
<?php wp_head(); ?>
</head>
<body>
<div id="wrapper">
    <header id="header">
		<div class="header-top">
			<div class="holder">
				<strong class="logo"><a href="<?php bloginfo('url'); ?>" alt="<?php bloginfo('name'); ?>" title="<?php bloginfo('name'); ?>" ><span><?php bloginfo('name'); ?></span></a></strong>
				<a href="#" class="mob-nav menu-switcher">меню</a>
				<ul class="contact-box">
					<li class="text">Заказать можно 24/7/365 on-line</li>
					<li class="phone two-row">
						<a href="tel:+380731903060"><span class="binct-phone-number-2">+38(073)190-30-60</span></a>
					</li>

                
					<li class="messengers">
					<a href="viber://chat?number=%2B380731903060"><img src="https://usprint.com.ua/wp-content/themes/superpack/images/viber.png" alt="Viber" /></a>
   					<a href="https://wa.me/380731903060?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%F0%9F%91%8B"><img src="https://usprint.com.ua/wp-content/themes/superpack/images/whatsapp.png" alt="Whatsapp" /></a>
   					<a href="tg://resolve?domain=justyntrade"><img src="https://usprint.com.ua/wp-content/themes/superpack/images/telegram.png" alt="Telegram" /></a>
   					</li>

   					<li class="header3colom"> 
   						<img src="https://usprint.com.ua/wp-content/themes/superpack/images/skype.png" alt="Skype" /><a href="skype:skibinskij1?chat">skibinskij1</a>

						<img src="https://usprint.com.ua/wp-content/themes/superpack/images/mail.png" alt="Mail" /><a href="mailto:printok@mail.ua">printok@mail.ua</a>
					</li>
					
				</ul>
			

			
			</div>
		</div>
				<div class="menu-top-frame">
			<nav class="menu-top-holder">
				<div class="menu-top">
					<?php
						$nav_args = array(
							'theme_location'  => '',
							'menu'            => '',
							'container'       => '',
							'container_class' => '',
							'container_id'    => '',
							'menu_class'      => 'nav',
							'menu_id'         => 'nav',
							'echo'            => true,
							'fallback_cb'     => '',
							'before'          => '',
							'after'           => '',
							'link_before'     => '',
							'link_after'      => '',
							'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
							'depth'           => 0,
							'walker'          => ''
						);
						wp_nav_menu($nav_args);
					?>
				</div>
				<a class="menu-switcher close-mobile-menu" href="#">Х</a>
				<div class="header-menu__cover"></div>
			</nav>
		</div>
    </header>