import React from 'react';
import {Helmet} from "react-helmet";
// import "./style.css"
// // import "./css/bootstrap.min.css"
// // import "./css/theme-plugins.css"

// // import "./css/responsive.css"
// // import "./css/skin/skin1.css"

class Index extends React.Component {
render= () =>{

    return (
        
        <span class="no-js" lang="en">
                <Helmet>
       
     
          
               {/* {/*{/*<!-- Meta tag -->*/} */}
               <meta charset="utf-8"/>
               <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
               <meta name="viewport" content="width=device-width, initial-scale=1"/>
               <meta name="keywords" content="SITE KEYWORDS HERE" />
               <meta name="description" content=""/>
               <meta name='copyright' content='codeglim'/>	
               
               {/* {/*{/*<!-- Title Tag -->*/} 
               <title>TotoSci</title>
               
               {/*{/*<!-- Favicon -->*/}
               <link rel="icon" type="image/png" href="images/favicon.png"/>	
               
               {/*{/*<!-- Web Font -->*/}
               <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900" rel="stylesheet"/>
               
               {/*{/*<!-- Bootstrap CSS -->*/}
               <link rel="stylesheet" href="http://35.246.149.29:1111/css/bootstrap.min.css"/>
               
               {/*{/*<!-- Tromas CSS -->*/}
               <link rel="stylesheet" href="http://35.246.149.29:1111/css/theme-plugins.css"/>
                <link rel="stylesheet" href="http://35.246.149.29:1111/style.css"/> 
               <link rel="stylesheet" href="http://35.246.149.29:1111/css/responsive.css"/>	
               
               {/*{/*<!-- Tromas Color -->*/}
               <link rel="stylesheet" href="http://35.246.149.29:1111/css/skin/skin1.css"/>
               {/*<!--<link rel="stylesheet" href="css/skin/skin2.css">-->*/}
               {/*<!--<link rel="stylesheet" href="css/skin/skin3.css">-->*/}
               {/*<!--<link rel="stylesheet" href="css/skin/skin4.css">-->*/}
               {/*<!--<link rel="stylesheet" href="css/skin/skin5.css">-->*/}
               {/*<!--<link rel="stylesheet" href="css/skin/skin6.css">-->*/}
               {/*<!--<link rel="stylesheet" href="css/skin/skin7.css">-->*/}
               {/*<!--<link rel="stylesheet" href="css/skin/skin8.css">-->*/}
               
               {/*{/*<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->*/}
               {/*{/*<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->*/}
               {/* {/*<!--[if lt IE 9]>
                 <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
                 <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
               <![endif]-->*/}
           
           </Helmet>
        <body className="box-bg">
        <div className="boxed-layout">
        {/* <!-- Start Header --> */}
			<header id="header" class="header style2 onepage">
				{/* <!-- Topbar --> */}
				<div class="topbar">
					<div class="container">
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12">
								<div class="topbar-inner">
									<div class="row">
										<div class="col-md-8 col-sm-8 col-xs-12">
											{/* <!-- Contact --> */}
											<ul class="contact">
												<li><i class="fa fa-phone"></i>+254 707 571 682 | +254 723 081 406</li>
												<li><i class="fa fa-envelope"></i> <a href="totosci.academy@gmail.com">totosci.academy@gmail.com   </a></li>
											</ul>
											{/* <!--/ End Contact --> */}
										</div>
										<div class="col-md-4 col-sm-4 col-xs-12">
											{/* <!-- Social --> */}
											<ul class="social">
												<li><a href="#"><i class="fa fa-twitter"></i></a></li>
												<li class="active"><a href="#"><i class="fa fa-facebook"></i></a></li>
												<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
												<li><a href="#"><i class="fa fa-dribbble"></i></a></li>
												<li><a href="#"><i class="fa fa-behance"></i></a></li>
											</ul>

											{/* <!--/ End Social --> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!--/ End Topbar --> */}
				<div class="header-inner">
					<div class="container">
						<div class="row">
							<div class="col-md-2 col-sm-12 col-xs-12">
								{/* <!-- Logo --> */}
								<div class="logo" style={{padding:'10px'}}>
									<a href="index.html"><img src="https://totosci.smartbeaver.co.ke/assets/img/logos/black-logo.png" alt="logo"/></a>
								</div>
								{/* <!--/ End Logo --> */}
								<div class="mobile-nav"></div>
							</div>
							<div class="col-md-10 col-sm-12 col-xs-12">
								<div class="nav-area">
									{/* <!-- Main Menu --> */}
									<nav class="mainmenu">
										<div class="collapse navbar-collapse">	
											<ul class="nav navbar-nav">
												<li class="active"><a href="#header">Home</a></li>
												<li><a href="#about-us">About Us</a></li>
												<li><a href="#services">services</a></li>
												<li><a href="#projects">Projects</a></li>
												<li><a href="#team">Team</a></li>
												<li><a href="#pricing-table">Pricing Table</a></li>
												<li><a href="#testimonials">Testimonial</a></li>
												<li><a href="#blog-main">Blogs</a></li>	
												<li><a href="#contact-us">Contact</a></li>								
											</ul>
										</div>
									</nav>
									{/* <!--/ End Main Menu --> */}
								</div>
								{/* <!-- Search Form--> */}
								<ul class="search">
									<li><a href="#header"><i class="fa fa-search"></i></a></li>
								</ul>	
								<div class="search-form">
									<form class="form" action="#">
										<input type="search" placeholder="search here"/>
										<button type="submit" value="send"><i class="fa fa-search"></i></button>
									</form>
								</div>
								{/* <!--/ End Search Form --> */}
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* <!--/ End Header --> */}

        {/* <!-- Start Hero Area --> */}
        <section className="hero-area style2 creative">
            <div className="slider-two">
                {/* <!-- Single Slider -->  */}
                <div className="single-slider">
                    <div className="background-layer">
                        <div className="single-layer one"></div>
                        <div className="single-layer two"></div>
                        <div className="single-layer three"></div>
                        <div className="single-layer four"></div>
                        <div className="single-layer five"></div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {/* <!-- Slider Text --> */}
                                <div className="slide-text">
                                    <h1>TotoSci <span>academy</span></h1>
                                    <p>A STEAM Subjects Academy</p>
                                    <div className="slide-btn">	
                                        <a href="#about-us" className="btn primary"><i className="fa fa-long-arrow-down"></i>Learn More</a>
                                    </div>
                                </div>
                                {/* <!--/ End SLider Text --> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--/ End Single Slider -->
                <!-- Single Slider -->  */}
                <div className="single-slider">
                    <div className="background-layer">
                        <div className="single-layer one"></div>
                        <div className="single-layer two"></div>
                        <div className="single-layer three"></div>
                        <div className="single-layer four"></div>
                        <div className="single-layer five"></div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {/* <!-- Slider Text --> */}
                                <div className="slide-text">
                                <h1>TotoSci <span>academy</span></h1>
                                    <p>Tinkering, Learning & Teaching</p>
                                    <div className="slide-btn">	
                                        <a href="#" className="btn primary"><i className="fa fa-long-arrow-left"></i>Our Blog</a>
                                    </div>
                                </div>
                                {/* <!--/ End SLider Text --> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--/ End Single Slider -->
                <!-- Single Slider -->  */}
                <div className="single-slider">
                    <div className="background-layer">
                        <div className="single-layer one"></div>
                        <div className="single-layer two"></div>
                        <div className="single-layer three"></div>
                        <div className="single-layer four"></div>
                        <div className="single-layer five"></div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {/* <!-- Slider Text --> */}
                                <div className="slide-text">
                                <h1>TotoSci <span>academy</span></h1>
                                    <p>Transforming Children Lives Scientifically</p>
                                    <div className="slide-btn">	
                                        <a href="#contact-us" className="btn primary"><i className="fa fa-long-arrow-left"></i>Contact Us</a>
                                    </div>
                                </div>
                                {/* <!--/ End SLider Text --> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--/ End Single Slider --> */}
            </div>
        </section>
        {/* <!-- End Hero Area -->*/}
        
     {/*    <!-- Start Features --> */}
       
        {/* <!--/ End Features -->*/}
              
    {/*<!-- Why Choose Us --> */}
        <section id="about-us" className="why-choose section">
            <div className="container-fluid fix">
                <div className="row fix">
                    <div className="col-md-4 col-sm-12 col-xs-12 fix">
                        <div className="working-process">
                            <h2>WHO WE ARE</h2>
                            <p>As technology dominates our lives, learning basic programing is not only a wise plan, it's a necessary ability for grown-ups and children alike. TotoSci Academy is user-friendly and teaches children basic code through fun, simple exercises that feel like games.</p>
                            {/* <a href="about-us.html" className="btn"> Read More</a> */}
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12 fix">
                        <div className="choose-main">
                            {/* <!-- Single Choose --> */}
                            <div className="single-choose">
                                {/* <i className="fa fa-check"></i> */}
                                {/* <h4>Deep Customization Process</h4> */}
                                <p>TotoSci is a STEAM subjects Academy</p>
                            </div>
                            {/* <!-- End Single Choose -->	
                            <!-- Single Choose --> */}
                            <div className="single-choose">
                            <i className="fa fa-check"></i>
                                {/* <h4>Day/Night Live Support</h4> */}
                                <p>We teach Science, Technology, Engineering, Arts and Design,Robotics,Internet of Things,Mobile Applications,Basic Electronics,Animations,Web systems and Mathematics to children above 7 years.</p>
                            </div>
                            {/* <!-- End Single Choose -->
                            <!-- Single Choose --> */}
                            <div className="single-choose">
                                <i className="fa fa-optin-monster"></i>
                                {/* <h4>Powerfull Theme Options</h4> */}
                                <p>Children tinker with TotoSci Kit to excite interest in Science and Engineering. Our classes are interractive and hands on.</p>
                            </div>
                            {/* <!-- End Single Choose -->	 */}
                        </div>
                    </div>			
                    <div className="col-md-4 col-sm-12 col-xs-12 fix">
                        {/* <div className="why-video"> </div> */}
                            {/* <!-- Video Animation --> */}
                            {/* <div className="promo-video">
                                <div className="waves-block">
                                    <div className="waves wave-1"></div>
                                    <div className="waves wave-2"></div>
                                    <div className="waves wave-3"></div>
                                </div>
                            </div> */}
                            {/* <!--/ End Video Animation -->
                            <!-- Promo Video --> */}
                            <video style={{marginTop:'95px'}}  controls="" width="100%" controls>



                            <source src="https://totosci.smartbeaver.co.ke/assets/img/portfolio/TotoSci.mp4" type="video/mp4"/>
                            Sorry, your browser doesn't support HTML5 video.
                            </video>
                            {/* <div className="video"><a href="https://www.youtube.com/watch?v=E-2ocmhF6TA" className="btn video-play video-popup mfp-fade"><i className="fa fa-play"></i></a></div> */} 
                            {/* <!--/ End Promo Video --> */}
                       
                    </div>					
                </div>
            </div>
        </section>	
        {/* <!--/ End Why Choose Us -->*/}
        
        
       {/* <!-- About Us --> */}
        <section id="why-choose" className="about-us section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="tabs-main center-nav">	
                            <div className="nav-main">
                                {/* <!-- Tab Menu --> */}
                                <ul className="nav-tabs" role="tablist">
                                    <li role="presentation" className="active"><a href="#about" role="tab" data-toggle="tab"><i className="fa fa-user"></i><span>About US</span></a></li>
                                    <li role="presentation"><a href="#story" role="tab" data-toggle="tab"><i className="fa fa-pencil"></i><span>Our Story</span></a></li>
                                    <li role="presentation"><a href="#photo" role="tab"  data-toggle="tab"><i className="fa fa-photo"></i><span>Photo Gallery</span></a></li>
                                    <li role="presentation"><a href="#challanges" role="tab" data-toggle="tab"><i className="fa fa-rocket"></i><span>Challanges</span></a></li>
                                </ul>
                            </div>
                            {/* <!--/ End Tab Menu --> */}
                            <div className="tab-content">
                                {/* <!-- About Us Tab --> */}
                                <div role="tabpanel" className="tab-pane fade in active" id="about">
                                    <div className="about-inner">
                                        <div className="row">
                                            <div className="col-md-5 col-sm-12 col-xs-12">
                                                {/* <!-- About Image --> */}
                                                <div className="single-image">
                                                    <img src="http://via.placeholder.com/600x400" alt="" />
                                                    {/* <!-- Tab Video --> */}
                                                    <a href="https://www.youtube.com/watch?v=wZWiRoktNWA" className="video-popup mfp-iframe"><i className="fa fa-play"></i></a>
                                                    {/* <!--/ End tab video --> */}
                                                </div>
                                            </div>
                                            {/* <!-- End About Image --> */}
                                            <div className="col-md-7 col-sm-12 col-xs-12">
                                                <div className="content">
                                                    <h2 className="tab-title">About Company</h2>
                                                    <p className="text">We are creative agency adipiscing elit. Duis sit amet magna vitae ligula varius imperdiet. Donec ultrices aliquet eleifend. Pellentesque nec mauris at libero imperdiet fermentum.Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. </p>
                                                    <p className="text">Welcome to my website. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada. Fusce semper purus suscipit ultricies tincidunt. Nulla eget turpis ac leo euismod pharetra at nec diam. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End About Us Tab -->
                                <!-- Story Tab --> */}
                                <div role="tabpanel" className="tab-pane fade in" id="story">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="content">
                                                <h2 className="tab-title">Our Story</h2>
                                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet magna vitae ligula varius imperdiet. Donec ultrices aliquet eleifend. Pellentesque nec mauris at libero imperdiet fermentum.Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada. Fusce semper purus suscipit ultricies tincidunt. Nulla eget turpis ac leo euismod pharetra at nec diam.
                                                Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada. Fusce semper </p>
                                                <p className="text">Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada. Fusce semper  Nulla eget turpis ac leo euismod pharetra at nec diam.
                                                Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End Story Tab --> */}
                                {/* <!-- Gallery Tab --> */}
                                <div role="tabpanel" className="tab-pane fade in" id="photo">
                                    <div className="photo-gallery">
                                        <div className="row fix">		
                                            <div className="col-md-4 col-sm-6 col-xs-12 fix">
                                                <div className="single-gallery">
                                                    <img src="http://via.placeholder.com/600x400" alt=""/>
                                                    <a data-fancybox="gallery" href="http://via.placeholder.com/600x400"><i className="fa fa-search"></i></a>
                                                    <div className="caption">
                                                        <p>Gallery Caption</p>
                                                    </div>
                                                </div>
                                            </div>		
                                            <div className="col-md-4 col-sm-6 col-xs-12 fix">
                                                <div className="single-gallery">
                                                    <img src="http://via.placeholder.com/600x400" alt=""/>
                                                    <a data-fancybox="gallery" href="http://via.placeholder.com/600x400"><i className="fa fa-search"></i></a>
                                                    <div className="caption">
                                                        <p>Gallery Caption</p>
                                                    </div>
                                                </div>
                                            </div>		
                                            <div className="col-md-4 col-sm-6 col-xs-12 fix">
                                                <div className="single-gallery">
                                                    <img src="http://via.placeholder.com/600x400" alt=""/>
                                                    <a data-fancybox="gallery" href="http://via.placeholder.com/600x400"><i className="fa fa-search"></i></a>
                                                    <div className="caption">
                                                        <p>Gallery Caption</p>
                                                    </div>
                                                </div>
                                            </div>		
                                            <div className="col-md-4 col-sm-6 col-xs-12 fix">
                                                <div className="single-gallery">
                                                    <img src="http://via.placeholder.com/600x400" alt=""/>
                                                    <a data-fancybox="gallery" href="http://via.placeholder.com/600x400"><i className="fa fa-search"></i></a>
                                                    <div className="caption">
                                                        <p>Gallery Caption</p>
                                                    </div>
                                                </div>
                                            </div>			
                                            <div className="col-md-4 col-sm-6 col-xs-12 fix">
                                                <div className="single-gallery">
                                                    <img src="http://via.placeholder.com/600x400" alt=""/>
                                                    <a data-fancybox="gallery" href="http://via.placeholder.com/600x400"><i className="fa fa-search"></i></a>
                                                    <div className="caption">
                                                        <p>Gallery Caption</p>
                                                    </div>
                                                </div>
                                            </div>		
                                            <div className="col-md-4 col-sm-6 col-xs-12 fix">
                                                <div className="single-gallery">
                                                    <img src="http://via.placeholder.com/600x400" alt=""/>
                                                    <a data-fancybox="gallery" href="http://via.placeholder.com/600x400"><i className="fa fa-search"></i></a>
                                                    <div className="caption">
                                                        <p>Gallery Caption</p>
                                                    </div>
                                                </div>
                                            </div>			
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End Gallery Tab  -->
                                <!-- challanges Tab --> */}
                                <div role="tabpanel" className="tab-pane fade in" id="challanges">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="content">
                                                <h2 className="tab-title">Our Challanges</h2>
                                                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet magna vitae ligula varius imperdiet. Donec ultrices aliquet eleifend. Pellentesque nec mauris at libero imperdiet fermentum.Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada. Fusce semper purus suscipit ultricies tincidunt. Nulla eget turpis ac leo euismod pharetra at nec diam.
                                                Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada. Fusce semper </p>
                                                <p className="text">Nulla eget turpis ac leo euismod pharetra at nec diam.
                                                Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat.  Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada. Fusce semper</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End challanges Tab --> */}
                            </div>
                        </div>
                    </div>
                </div>	
            </div>	
        </section>
        {/* <!-- End About Us -->
        
        <!-- Start Faq --> */}
        <section id="faq" className="faq section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Frequently Asked Questions</h1>
                            <p>Contrary to popular belief. Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7 col-sm-12 col-xs-12">
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                            <div className="panel panel-default active">
                                {/* <!-- Single Faq --> */}
                                <div className="faq-heading"  id="FaqTitle1">
                                  <h4 className="faq-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#faq1">Why Choose Our Website?</a>
                                  </h4>
                                </div>
                                <div id="faq1" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="FaqTitle1">
                                  <div className="faq-body">Suspendisse rutrum metus sit amet luctus ullamcorper. Ut id odio vel elit eleifend venenatis. Vestibulum placerat mi sit amet est commodo, sed vulputate nibh lacinia. Phasellus et tincidunt tortor, ullamcorper condimentum justo. Mauris mollis mi vitae eleifend mattis. Sed nec arcu at tortor efficitur viverra.</div>
                                </div>
                                {/* <!--/ End Single Faq --> */}
                            </div>
                            <div className="panel panel-default">
                                {/* <!-- Single Faq --> */}
                                <div className="faq-heading"  id="FaqTitle2">
                                  <h4 className="faq-title">
                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#faq2">How can i receive payments?</a>
                                  </h4>
                                </div>
                                <div id="faq2" className="panel-collapse collapse" role="tabpanel" aria-labelledby="FaqTitle2">
                                  <div className="faq-body">Suspendisse rutrum metus sit amet luctus ullamcorper. Ut id odio vel elit eleifend venenatis. Vestibulum placerat mi sit amet est commodo, sed vulputate nibh lacinia. Phasellus et tincidunt tortor, ullamcorper condimentum justo. Mauris mollis mi vitae eleifend mattis. Sed nec arcu at tortor efficitur viverra.</div>
                                </div>
                                {/* <!--/ End Single Faq --> */}
                            </div>
                            <div className="panel panel-default">
                                {/* <!-- Single Faq --> */}
                                <div className="faq-heading"  id="FaqTitle3">
                                  <h4 className="faq-title">
                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#faq3">What do we work?</a>
                                  </h4>
                                </div>
                                <div id="faq3" className="panel-collapse collapse" role="tabpanel" aria-labelledby="FaqTitle3">
                                  <div className="faq-body">Suspendisse rutrum metus sit amet luctus ullamcorper. Ut id odio vel elit eleifend venenatis. Vestibulum placerat mi sit amet est commodo, sed vulputate nibh lacinia. Phasellus et tincidunt tortor, ullamcorper condimentum justo. Mauris mollis mi vitae eleifend mattis. Sed nec arcu at tortor efficitur viverra.</div>
                                </div>
                                {/* <!--/ End Single Faq --> */}
                            </div>
                            <div className="panel panel-default">
                                {/* <!-- Single Faq --> */}
                                <div className="faq-heading"  id="FaqTitle4">
                                  <h4 className="faq-title">
                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#faq4">How choose our service?</a>
                                  </h4>
                                </div>
                                <div id="faq4" className="panel-collapse collapse" role="tabpanel" aria-labelledby="FaqTitle4">
                                 <div className="faq-body">Suspendisse rutrum metus sit amet luctus ullamcorper. Ut id odio vel elit eleifend venenatis. Vestibulum placerat mi sit amet est commodo, sed vulputate nibh lacinia. Phasellus et tincidunt tortor, ullamcorper condimentum justo. Mauris mollis mi vitae eleifend mattis. Sed nec arcu at tortor efficitur viverra.</div>
                                </div>
                                {/* <!--/ End Single Faq --> */}
                            </div>
                            <div className="panel panel-default">
                                {/* <!-- Single Faq --> */}
                                <div className="faq-heading"  id="FaqTitle5">
                                  <h4 className="faq-title">
                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#faq5">How can i download a theme?</a>
                                  </h4>
                                </div>
                                <div id="faq5" className="panel-collapse collapse" role="tabpanel" aria-labelledby="FaqTitle5">
                                 <div className="faq-body">Suspendisse rutrum metus sit amet luctus ullamcorper. Ut id odio vel elit eleifend venenatis. Vestibulum placerat mi sit amet est commodo, sed vulputate nibh lacinia. Phasellus et tincidunt tortor, ullamcorper condimentum justo. Mauris mollis mi vitae eleifend mattis. Sed nec arcu at tortor efficitur viverra.</div>
                                </div>
                                {/* <!--/ End Single Faq --> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="faq-image">
                            <img src="http://via.placeholder.com/400x400" alt="#" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!--/ End Faq -->
        
                    <!-- Start Services --> */}
        <section id="services" className="services section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Our services</h1>
                            <p>Contry to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services">
                            <div className="icon"><i className="fa fa-edit"></i></div>
                            <div className="icon two"><i className="fa fa-edit"></i></div>
                            <h2><a href="service-single.html">Business Consulting</a></h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy. Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services">
                            <div className="icon"><i className="fa fa-lightbulb-o"></i></div>
                            <div className="icon two"><i className="fa fa-lightbulb-o"></i></div>
                            <h2><a href="service-single.html">Creative Idea</a></h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy. Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services">
                            <div className="icon"><i className="fa fa-money"></i></div>
                            <div className="icon two"><i className="fa fa-money"></i></div>
                            <h2><a href="service-single.html">Investment Plan</a></h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy. Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services">
                            <div className="icon"><i className="fa fa-clock-o"></i></div>
                            <div className="icon two"><i className="fa fa-clock-o"></i></div>
                            <h2><a href="service-single.html">Time sensetive</a></h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy. Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services">
                            <div className="icon"><i className="fa fa-globe"></i></div>
                            <div className="icon two"><i className="fa fa-globe"></i></div>
                            <h2><a href="service-single.html">World Marketing</a></h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy. Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services">
                            <div className="icon"><i className="fa fa-magic"></i></div>
                            <div className="icon two"><i className="fa fa-magic"></i></div>
                            <h2><a href="service-single.html">Trusted Support</a></h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy. Lorem ipsum dolor sit amet</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service --> */}
                </div>
            </div>
        </section>
        {/* <!--/ End Services -->
  
      {/*  <!-- Start Projects --> */}
        <section id="projects" className="projects section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Our Works</h1>
                            <p>It has roots in a piece Distinctio tenetur, dolores aperiam, quasi perferendis nemo mollitia</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        {/* <!-- project Nav --> */}
                        <div className="project-nav">
                            <ul className="cbp-l-filters-work" id="project-menu">
                                <li data-filter="*" className="cbp-filter-item active">All<div className="cbp-filter-counter"></div></li>  
                                <li data-filter=".webdesign" className="cbp-filter-item">Design<div className="cbp-filter-counter"></div></li>
                                <li data-filter=".development" className="cbp-filter-item">Development<div className="cbp-filter-counter"></div></li>
                                <li data-filter=".branding" className="cbp-filter-item">Branding<div className="cbp-filter-counter"></div></li>
                                <li data-filter=".package" className="cbp-filter-item">Package<div className="cbp-filter-counter"></div></li>
                                <li data-filter=".video" className="cbp-filter-item">Video<div className="cbp-filter-counter"></div></li>
                            </ul>  		
                        </div>
                        {/* <!--/ End project Nav --> */}
                    </div>
                </div>					
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div id="project-item" className="cbp">
                            <div className="cbp-item  webdesign development video branding package">
                                {/* <!-- Single Project --> */}
                                <div className="project-single">
                                    <div className="project-inner">
                                        <div className="project-head">
                                            <img src="http://via.placeholder.com/700x500" alt="#"/>
                                        </div>
                                        <div className="project-bottom">
                                            <h4><a href="project-single.html">Powerfull Theme</a><span className="category">Development</span></h4>
                                        </div>
                                        <div className="button">
                                            <a href="https://www.youtube.com/watch?v=E-2ocmhF6TA" className="btn video-play cbp-lightbox"><i className="fa fa-play"></i></a>
                                            <a href="project-single.html" className="btn"><i className="fa fa-link"></i></a>
                                        </div>
                                    </div>
                                </div> 
                                {/* <!--/ End Single Project --> */}
                            </div>
                            <div className="cbp-item  webdesign branding package">
                                {/* <!-- Single Project --> */}
                                <div className="project-single">
                                    <div className="project-inner">
                                        <div className="project-head">
                                            <img src="http://via.placeholder.com/700x500" alt="#"/>
                                        </div>
                                        <div className="project-bottom">
                                            <h4><a href="project-single.html">Crazy Design</a><span className="category">Branding</span></h4>
                                        </div>
                                        <div className="button">
                                            <a data-fancybox="gallery" href="http://via.placeholder.com/700x500" className="btn"><i className="fa fa-photo"></i></a>
                                            <a href="project-single.html" className="btn"><i className="fa fa-link"></i></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End Single Project --> */}
                            </div>
                            <div className="cbp-item  webdesign development video">
                                {/* <!-- Single Project --> */}
                                <div className="project-single">
                                    <div className="project-inner">
                                        <div className="project-head">
                                            <img src="http://via.placeholder.com/700x500" alt="#"/>
                                        </div>
                                        <div className="project-bottom">
                                            <h4><a href="project-single.html">Bootstrap Framework</a><span className="category">Development</span></h4>
                                        </div>
                                        <div className="button">
                                            <a href="https://www.youtube.com/watch?v=E-2ocmhF6TA" className="btn video-play cbp-lightbox"><i className="fa fa-play"></i></a>
                                            <a href="project-single.html" className="btn"><i className="fa fa-link"></i></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End Single Project --> */}
                            </div>
                            <div className="cbp-item branding development">
                                {/* <!-- Single Project --> */}
                                <div className="project-single">
                                    <div className="project-inner">
                                        <div className="project-head">
                                            <img src="http://via.placeholder.com/700x500" alt="#"/>
                                        </div>
                                        <div className="project-bottom">
                                            <h4><a href="project-single.html">Fully Responsive</a><span className="category">Branding</span></h4>
                                        </div>
                                        <div className="button">
                                            <a data-fancybox="gallery" href="http://via.placeholder.com/700x500" className="btn"><i className="fa fa-photo"></i></a>
                                            <a href="project-single.html" className="btn"><i className="fa fa-link"></i></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End Single Project --> */}
                            </div>
                            <div className="cbp-item  webdesign development video">
                                {/* <!-- Single Project --> */}
                                <div className="project-single">
                                    <div className="project-inner">
                                        <div className="project-head">
                                            <img src="http://via.placeholder.com/700x500" alt="#"/>
                                        </div>
                                        <div className="project-bottom">
                                            <h4><a href="project-single.html">Easy To Use</a><span className="category">Development</span></h4>
                                        </div>
                                        <div className="button">
                                            <a href="https://www.youtube.com/watch?v=E-2ocmhF6TA" className="btn video-play cbp-lightbox"><i className="fa fa-play"></i></a>
                                            <a href="project-single.html" className="btn"><i className="fa fa-link"></i></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End Single Project --> */}
                            </div>
                            <div className="cbp-item  webdesign development branding">
                                {/* <!-- Single Project --> */}
                                <div className="project-single">
                                    <div className="project-inner">
                                        <div className="project-head">
                                            <img src="http://via.placeholder.com/700x500" alt="#"/>
                                        </div>
                                        <div className="project-bottom">
                                            <h4><a href="project-single.html">Modern Design</a><span className="category">Printing</span></h4>
                                        </div>
                                        <div className="button">
                                            <a data-fancybox="gallery" href="http://via.placeholder.com/700x500" className="btn"><i className="fa fa-photo"></i></a>
                                            <a href="project-single.html" className="btn"><i className="fa fa-link"></i></a>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/ End Single Project --> */}
                            </div>
                        </div>
                        {/* <!-- Load More --> */}
                        <div id="loadMore" className="cbp-l-loadMore-button">
                            <div className="load-button">
                                <a href="more-project/project.html" className="cbp-l-loadMore-link btn primary" rel="nofollow">
                                    <span className="cbp-l-loadMore-defaultText">LOAD MORE</span>
                                    <span className="cbp-l-loadMore-loadingText">LOADING...</span>
                                    <span className="cbp-l-loadMore-noMoreLoading">NO MORE WORKS</span>
                                </a>
                            </div>
                        </div>
                        {/* <!--/ End Load More --> */}
                    </div>
                </div>
            </div>
        </section>
        {/* <!--/ End Projects -->
        
        <!-- Start Counter --> */}
        <div id="counter" className="counter section" data-stellar-background-ratio="0.5">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        {/* <!-- Single Counter--> */}
                        <div className="counter-single">
                            <div className="icon">
                                <i className="fa fa-tasks"></i>
                            </div>
                            <div className="s-info">
                                <span className="number">4021</span>
                                <p>Satisfied Clients</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Counter--> */}
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        {/* <!-- Single Counter--> */}
                        <div className="counter-single">
                            <div className="icon">
                                <i className="fa fa-users"></i>
                            </div>
                            <div className="s-info">
                                <span className="number">98</span>
                                <p>Ongoing Projects</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Counter--> */}
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        {/* <!-- Single Counter--> */}
                        <div className="counter-single">
                            <div className="icon">
                                <i className="fa fa-coffee"></i>
                            </div>
                            <div className="s-info">
                                <span className="number">2999</span>
                                <p>Cups of cofee</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Counter--> */}
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        {/* <!-- Single Counter--> */}
                        <div className="counter-single">
                            <div className="icon">
                                <i className="fa fa-trophy"></i>
                            </div>
                            <div className="s-info">
                                <span className="number">58</span>
                                <p>Winning Awards</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Counter--> */}
                    </div>
                </div>
            </div>
        </div>	
        {/* <!--/ End Counter -->
        
        <!-- Start Team --> */}
        <section id="team" className="team section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Meet The Team</h1>
                            <p>Contry to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece Distinctio tenetur, dolores aperiam, quasi perferendis nemo mollitia</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        {/* <!-- Single Team --> */}
                        <div className="single-team one default">
                            {/* <!-- Team Head --> */}
                            <div className="t-head"> 
                                <img src="http://via.placeholder.com/360x400" alt="#"/>
                                <div className="t-hover">
                                    <ul className="t-social">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- Team Bottom --> */}
                            <div className="t-bottom">
                                <div className="t-icon">
                                    <a href="#team1"><i className="fa fa-plus"></i></a>
                                </div>
                                <h2 className="t-name">Angel Rimu</h2>
                                <p className="what">Creative</p>
                            </div>
                        </div>
                        {/* <!-- End Single Team --> */}
                    </div>		
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        {/* <!-- Single Team --> */}
                        <div className="single-team two default">
                            {/* <!-- Team Head --> */}
                            <div className="t-head">
                                <img src="http://via.placeholder.com/360x400" alt=""/>
                                <div className="t-hover">
                                    <ul className="t-social">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- Team Bottom --> */}
                            <div className="t-bottom">
                                <div className="t-icon">
                                    <a href="#team2"><i className="fa fa-plus"></i></a>
                                </div>
                                <h2 className="t-name">Shakil Hossain</h2>
                                <p className="what">Developer</p>
                            </div>
                        </div>
                        {/* <!-- End Single Team --> */}
                    </div>	
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        {/* <!-- Single Team --> */}
                        <div className="single-team three default">
                            {/* <!-- Team Head --> */}
                            <div className="t-head">
                                <img src="http://via.placeholder.com/360x400" alt="#"/ >
                                <div className="t-hover">
                                    <ul className="t-social">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- Team Bottom --> */}
                            <div className="t-bottom">
                                <div className="t-icon">
                                    <a href="#team3"><i className="fa fa-plus"></i></a>
                                </div>
                                <h2 className="t-name">Sufia Mizan</h2>
                                <p className="what">Branding</p>
                            </div>
                        </div>
                        {/* <!-- End Single Team --> */}
                    </div>		
                    <div className="col-md-3 col-sm-6 col-xs-12">
                        {/* <!-- Single Team --> */}
                        <div className="single-team four default">
                            {/* <!-- Team Head --> */}
                            <div className="t-head">
                                <img src="http://via.placeholder.com/360x400" alt="#"/>
                                <div className="t-hover">
                                    <ul className="t-social">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- Team Bottom --> */}
                            <div className="t-bottom">
                                <div className="t-icon">
                                    <a href="#team4"><i className="fa fa-plus"></i></a>
                                </div>
                                <h2 className="t-name">SM Jehad</h2>
                                <p className="what">CEO/Officer</p>
                            </div>
                        </div>
                        {/* <!-- End Single Team --> */}
                    </div>	
                </div>
                {/* <!-- Team Detailes One --> */}
                <div id="team1" className="team-details  one">
                    <a href="#team1" className="cross"><i className="fa fa-remove"></i></a>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="single-team default">
                                <div className="t-head">
                                    <img src="http://via.placeholder.com/360x400" alt=""/>
                                    <div className="t-hover">
                                        <ul className="t-social">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                            <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>	
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h2>Angel Rimu</h2>
                            <p>Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada.</p>
                            <p>Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh.</p>
                            <div className="row">		
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Creative Idea</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: '50%'}}><span>73%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Web Resource</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{width: '85%'}}><span>85%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Success Rate</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="98" aria-valuemin="0" aria-valuemax="100" style={{width: '98%'}}><span>60%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">UI/UX Design</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{width: '90%'}}><span>90%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                            </div>
                        </div>
                    </div>	
                </div>
                {/* <!--/ End Team Detailes One -->
                <!-- Team Detailes two --> */}
                <div id="team2" className="team-details  two">
                    <a href="#team2" className="cross"><i className="fa fa-remove"></i></a>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="single-team default">
                                <div className="t-head">
                                    <img src="http://via.placeholder.com/360x400" alt="#" />
                                    <div className="t-hover">
                                        <ul className="t-social">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                            <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>	
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h2>Shakil Hossain</h2>
                            <p>Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada.</p>
                            <p>Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh.</p>
                            <div className="row">		
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Web UI</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{width:' 90%'}}><span>73%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Website Development</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" style={{width:' 99%'}}><span>85%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Website Maintance</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{width: '95%'}}><span>60%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Graphics Design</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100" style={{width: '76%'}}><span>90%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                            </div>
                        </div>
                    </div>	
                </div>
                {/* <!--/ End Team Detailes two -->
                <!-- Team Detailes Three --> */}
                <div id="team3" className="team-details three">
                    <a href="#team3" className="cross"><i className="fa fa-remove"></i></a>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="single-team default">
                                <div className="t-head">
                                    <img src="http://via.placeholder.com/360x400" alt="#"/>
                                    <div className="t-hover">
                                        <ul className="t-social">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                            <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>	
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h2>Sufia Mizan</h2>
                            <p>Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada.</p>
                            <p>Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh.</p>
                            <div className="row">		
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Marketing</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: '80%'}}><span>73%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Strategy</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{width:' 95%'}}><span>85%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Customer Success</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style={{width: '65%'}}><span>60%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Total Process</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{width: '85%'}}><span>90%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                            </div>
                        </div>
                    </div>	
                </div>
                {/* <!--/ End Team Detailes Three -->
                <!-- Team Detailes Four --> */}
                <div id="team4" className="team-details four">
                    <a href="#team4" className="cross"><i className="fa fa-remove"></i></a>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="single-team default">
                                <div className="t-head">
                                    <img src="http://via.placeholder.com/360x400" alt=""/>
                                    <div className="t-hover">
                                        <ul className="t-social">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                            <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>	
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h2>SM Jehad</h2>
                            <p>Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh. Praesent ut luctus dolor. Suspendisse a rutrum arcu. Aliquam erat volutpat. Phasellus lobortis erat vitae fringilla malesuada.</p>
                            <p>Welcome to my website. sit amet, consectetur adipiscing elit. Ut a lectus eu leo faucibus aliquam. Suspendisse eleifend fringilla nibh.</p>
                            <div className="row">		
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Branding</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="83" aria-valuemin="0" aria-valuemax="100" style={{width:' 83%'}}><span>73%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Maintance</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{width: '90%'}}><span>85%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Customer Success</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{width: '70%'}}><span>60%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    {/* <!-- Single Skill --> */}
                                    <div className="single-skill">
                                        <div className="skill-info">
                                            <h4 className="title">Managing</h4>
                                        </div>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}><span>90%</span></div>
                                        </div>
                                    </div>
                                    {/* <!--/ End Single Skill --> */}
                                </div>
                            </div>
                        </div>
                    </div>	
                </div>
                {/* <!--/ End Team Detailes Four --> */}
            </div>
        </section>
        {/* <!--/ End Team -->

        <!-- Start Pricing Table --> */}
        <section id="pricing-table" className="pricing-table section center bg">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Our Package</h1>
                            <p> It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Single Table --> */}
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <div className="single-table">
                            <div className="bg-icon"><i className="fa fa-bicycle"></i></div>
                            {/* <!-- Table Head --> */}
                            <div className="table-head">
                                <div className="price">
                                    <p className="amount">$19</p>
                                </div>	
                                <h2 className="title">Basic Pack</h2>
                            </div>
                            {/* <!-- Table List --> */}
                            <ul className="table-list">
                                <li><i className="fa fa-angle-right"></i>2 Business Website</li>
                                <li><i className="fa fa-angle-right"></i>24/7 Technic Support</li>
                                <li><i className="fa fa-angle-right"></i>Live Dashboard</li>
                                <li className="cross"><i className="fa fa-remove"></i>Pre Made Software</li>
                                <li><i className="fa fa-angle-right"></i>Unlimited Email Account</li>
                                <li className="cross"><i className="fa fa-remove"></i>Free Domain Name</li>
                            </ul>
                            {/* <!-- Table Bottom --> */}
                            <div className="table-bottom">
                                <a className="btn primary" href="contact.html"><i className="fa fa-shopping-cart"></i>Order Now</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End Single Table-->
                    <!-- Single Table --> */}
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <div className="single-table active">
                            <div className="bg-icon"><i className="fa fa-truck"></i></div>
                            {/* <!-- Table Head --> */}
                            <div className="table-head">
                                <div className="price">
                                    <p className="amount">$49</p>
                                </div>	
                                <h2 className="title">Medium Pack</h2>
                            </div>
                            {/* <!-- Table List --> */}
                            <ul className="table-list">
                                <li><i className="fa fa-angle-right"></i>5 Business Website</li>
                                <li><i className="fa fa-angle-right"></i>24/7 Technic Support</li>
                                <li><i className="fa fa-angle-right"></i>Live Dashboard</li>
                                <li><i className="fa fa-angle-right"></i>Pre Made Software</li>
                                <li><i className="fa fa-angle-right"></i>Unlimited Email Account</li>
                                <li className="cross"><i className="fa fa-remove"></i>Free Domain Name</li>
                            </ul>
                            {/* <!-- Table Bottom --> */}
                            <div className="table-bottom">
                                <a className="btn primary" href="contact.html"><i className="fa fa-shopping-cart"></i>Order Now</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End Single Table-->
                    <!-- Single Table --> */}
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <div className="single-table">
                            <div className="bg-icon"><i className="fa fa-plane"></i></div>
                            {/* <!-- Table Head --> */}
                            <div className="table-head">
                                <div className="price">
                                    <p className="amount">$99</p>
                                </div>	
                                <h2 className="title">Advanced Pack</h2>
                            </div>
                            {/* <!-- Table List --> */}
                            <ul className="table-list">
                                <li><i className="fa fa-angle-right"></i>2 Business Website</li>
                                <li><i className="fa fa-angle-right"></i>24/7 Technic Support</li>
                                <li><i className="fa fa-angle-right"></i>Live Dashboard</li>
                                <li><i className="fa fa-angle-right"></i>Pre Made Software</li>
                                <li><i className="fa fa-angle-right"></i>Unlimited Email Account</li>
                                <li><i className="fa fa-angle-right"></i>Free Domain Name</li>
                            </ul>
                            {/* <!-- Table Bottom --> */}
                            <div className="table-bottom">
                                <a className="btn primary" href="contact.html"><i className="fa fa-shopping-cart"></i>Order Now</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End Single Table--> */}
                </div>	
            </div>	
        </section>	
        {/* <!--/ End Pricing Table -->
        
        <!-- Start Testimonials --> */}
        <section id="testimonials" className="testimonials section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="testimonial-carousel">
                            {/* <!-- Single Testimonial --> */}
                            <div className="single-testimonial">
                                <div className="testimonial-content">
                                    <i className="fa fa-quote-left"></i>
                                    <p>simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer It is a long etabs-mainlished fact that a reader will be distracted by the readable content of a page when looking at its layout. Suspendisse porta sem vel mauris semper consequat. Proin id aliquet felis.</p>
                                </div>
                                <div className="testimonial-info">
                                    <span className="arrow"></span>
                                    <img src="http://via.placeholder.com/150x150" alt="#"/>
                                    <h6>Tromas Mou<span>Freelancer</span></h6>
                                </div>				
                            </div>
                            {/* <!--/ End Single Testimonial -->	
                            <!-- Single Testimonial --> */}
                            <div className="single-testimonial">
                                <div className="testimonial-content">
                                    <i className="fa fa-quote-left"></i>
                                    <p>simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer It is a long etabs-mainlished fact that a reader will be distracted by the readable content of a page when looking at its layout. Suspendisse porta sem vel mauris semper consequat. Proin id aliquet felis.</p>
                                </div>
                                <div className="testimonial-info">
                                    <span className="arrow"></span>
                                    <img src="http://via.placeholder.com/150x150" alt="#"/>
                                    <h6>Rimu Akter<span>Developer</span></h6>
                                </div>			
                            </div>
                            {/* <!--/ End Single Testimonial -->	
                            <!-- Single Testimonial --> */}
                            <div className="single-testimonial">
                                <div className="testimonial-content">
                                    <i className="fa fa-quote-left"></i>
                                    <p>simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer It is a long etabs-mainlished fact that a reader will be distracted by the readable content of a page when looking at its layout. Suspendisse porta sem vel mauris semper consequat. Proin id aliquet felis.</p>
                                </div>
                                <div className="testimonial-info">
                                    <span className="arrow"></span>
                                    <img src="http://via.placeholder.com/150x150" alt="#" />
                                    <h6>SM Jehad<span>Designer</span></h6>
                                </div>			
                            </div>
                            {/* <!--/ End Single Testimonial -->		 */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!--/ End Testimonial --> */}
        
        {/* <!-- Start Newslatter --> */}
        <div id="newslatter" className="newslatter section" data-stellar-background-ratio="0.5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                        {/* <!-- Single Widget --> */}
                        <div className="newslatter-inner">
                            <div className="checkbox">
                                <label className="checkbox-inline" for="updates"><input name="updates" id="updates" type="checkbox"/> About updates</label>
                                <label className="checkbox-inline" for="news"><input name="news" id="news" type="checkbox"/> Weekly news</label>
                                <label className="checkbox-inline" for="reseller"><input name="reseller" id="reseller" type="checkbox"/>Monthly Digest</label>
                            </div>	
                            <form className="form" action="#">
                                <input placeholder="type your email" type="email" />
                                <button type="submit" className="btn primary"><i className="fa fa-paper-plane"></i></button>
                            </form>	
                            <p>Every month our subscribers get awesome updates</p>
                        </div>
                        {/* <!--/ End Single Widget --> */}
                    </div>
                </div>
            </div>
        </div>
        {/* <!--/ End Newslatter -->

        <!-- Start Clients --> */}
        <section id="clients" className="clients section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Happy Clients</h1>
                            <p>Contry to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="clients-slider">
                            {/* <!-- Single Clients --> */}
                            <div className="single-clients">
                                <a href="#" target="_blank"><img src="http://via.placeholder.com/220x100" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients -->
                            <!-- Single Clients --> */}
                            <div className="single-clients active">
                                <a href="#" target="_blank"><img src="http://via.placeholder.com/220x100" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients -->
                            <!-- Single Clients --> */}
                            <div className="single-clients">
                                <a href="#" target="_blank"><img src="http://via.placeholder.com/220x100" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients -->
                            <!-- Single Clients --> */}
                            <div className="single-clients">
                                <a href="#" target="_blank"><img src="http://via.placeholder.com/220x100" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients -->
                            <!-- Single Clients --> */}
                            <div className="single-clients">
                                <a href="#" target="_blank"><img src="http://via.placeholder.com/220x100" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients -->
                            <!-- Single Clients --> */}
                            <div className="single-clients">
                                <a href="#" target="_blank"><img src="http://via.placeholder.com/220x100" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients --> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!--/ End Clients -->
        
        <!-- Start Blogs --> */}
        <section id="blog-main" className="blog-main section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Latest Blog</h1>
                            <p> Fusce semper purus suscipit ultricies tincidunt. Nulla eget turpis ac leo euismod pharetra at nec diam. Etiam id purus lacus. Suspendisse ligula nulla, cursus non</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="blog-main">		
                        <div className="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                            {/* <!-- Blog Sticky --> */}
                            <div className="single-blog sticky">
                                <div className="blog-post">
                                    <div className="blog-head">
                                        <img src="http://via.placeholder.com/800x450" alt="#" />
                                    </div>
                                    <div className="blog-info">
                                        <h2><a href="blog-single.html">Powerfull Html5 Website Theme</a></h2>
                                        <div className="meta">
                                            <span><i className="fa fa-list"></i><a href="#">Marketing</a></span>
                                            <span><i className="fa fa-calendar-o"></i>10 Sep, 2017</span>
                                            <span><i className="fa fa-heart-o"></i><a href="#">99</a></span>
                                        </div>
                                        <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Mirum est notare quam littera gothica, quam nunc putamus parum</p>
                                    </div>
                                </div>						
                            </div>						
                            {/* <!--/ End Blog Sticky--> */}
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="blog-slider">
                                {/* <!-- Single Slider --> */}
                                <div className="single-blog single-slider">
                                    <div className="blog-post">
                                        <div className="blog-head">
                                            <img src="http://via.placeholder.com/1200x800" alt="#" />
                                            <a className="link" href="blog-single.html"><i className="fa fa-paper-plane"></i></a>
                                        </div>
                                        <div className="blog-info">
                                            <h2><a href="blog-single.html">10 Tips for Growing Your Business</a></h2>
                                            <div className="meta">
                                                <span><i className="fa fa-list"></i><a href="#">Marketing</a></span>
                                                <span><i className="fa fa-calendar-o"></i>28 Sep, 2017</span>
                                                <span><i className="fa fa-heart-o"></i><a href="#">35</a></span>
                                            </div>
                                            <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula</p>
                                        </div>
                                    </div>				
                                </div>
                                {/* <!--/ End Single Slider -->	
                                <!-- Single Slider --> */}
                                <div className="single-blog single-slider">
                                    <div className="blog-post">
                                        <div className="blog-head">
                                            <img src="http://via.placeholder.com/1200x800" alt="#" />
                                            <a className="link" href="blog-single.html"><i className="fa fa-paper-plane"></i></a>
                                        </div>
                                        <div className="blog-info">
                                            <h2><a href="blog-single.html">Amazing Multipage & Onepage</a></h2>
                                            <div className="meta">
                                                <span><i className="fa fa-list"></i><a href="#">Web</a></span>
                                                <span><i className="fa fa-calendar-o"></i>15 Aug, 2017</span>
                                                <span><i className="fa fa-heart-o"></i><a href="#">35</a></span>
                                            </div>
                                            <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula</p>
                                        </div>
                                    </div>				
                                </div>
                                {/* <!--/ End Single Slider -->	
                                <!-- Single Slider --> */}
                                <div className="single-blog single-slider">
                                    <div className="blog-post">
                                        <div className="blog-head">
                                            <img src="http://via.placeholder.com/1200x800" alt="#"/ >
                                            <a className="link" href="blog-single.html"><i className="fa fa-paper-plane"></i></a>
                                        </div>
                                        <div className="blog-info">
                                            <h2><a href="blog-single.html">How to start online business</a></h2>
                                            <div className="meta">
                                                <span><i className="fa fa-list"></i><a href="#">Finance</a></span>
                                                <span><i className="fa fa-calendar-o"></i>02 July, 2017</span>
                                                <span><i className="fa fa-heart-o"></i><a href="#">99</a></span>
                                            </div>
                                            <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula</p>
                                        </div>
                                    </div>				
                                </div>
                                {/* <!--/ End Single Slider -->	
                                <!-- Single Slider --> */}
                                <div className="single-blog single-slider">
                                    <div className="blog-post">
                                        <div className="blog-head">
                                            <img src="http://via.placeholder.com/1200x800" alt="#" />
                                            <a className="link" href="blog-single.html"><i className="fa fa-paper-plane"></i></a>
                                        </div>
                                        <div className="blog-info">
                                            <h2><a href="blog-single.html">Discover new banking tricks</a></h2>
                                            <div className="meta">
                                                <span><i className="fa fa-list"></i><a href="#">Marketing</a></span>
                                                <span><i className="fa fa-calendar-o"></i>02 Apr, 2017</span>
                                                <span><i className="fa fa-heart-o"></i><a href="#">35</a></span>
                                            </div>
                                            <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula</p>
                                        </div>
                                    </div>				
                                </div>
                                {/* <!--/ End Single Slider -->	
                                <!-- Single Slider --> */}
                                <div className="single-blog single-slider">
                                    <div className="blog-post">
                                        <div className="blog-head">
                                            <img src="http://via.placeholder.com/1200x800" alt="#"/>
                                            <a className="link" href="blog-single.html"><i className="fa fa-paper-plane"></i></a>
                                        </div>
                                        <div className="blog-info">
                                            <h2><a href="blog-single.html">What makes us best in the world?</a></h2>
                                            <div className="meta">
                                                <span><i className="fa fa-list"></i><a href="#">Resource</a></span>
                                                <span><i className="fa fa-calendar-o"></i>25 March, 2017</span>
                                                <span><i className="fa fa-heart-o"></i><a href="#">35</a></span>
                                            </div>
                                            <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula</p>
                                        </div>
                                    </div>				
                                </div>
                                {/* <!--/ End Single Slider -->	
                                <!-- Single Slider --> */}
                                <div className="single-blog single-slider">
                                    <div className="blog-post">
                                        <div className="blog-head">
                                            <img src="http://via.placeholder.com/1200x800" alt="#" />
                                            <a className="link" href="blog-single.html"><i className="fa fa-paper-plane"></i></a>
                                        </div>
                                        <div className="blog-info">
                                            <h2><a href="blog-single.html">Tips for success in 2017</a></h2>
                                            <div className="meta">
                                                <span><i className="fa fa-list"></i><a href="#">Web</a></span>
                                                <span><i className="fa fa-calendar-o"></i>02 Feb, 2017</span>
                                                <span><i className="fa fa-heart-o"></i><a href="#">99</a></span>
                                            </div>
                                            <p>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula</p>
                                        </div>
                                    </div>				
                                </div>
                                {/* <!--/ End Single Slider -->									 */}
                            </div>
                        </div>
                    </div>						
                </div>
            </div>
        </section>
        {/* <!--/ End Blog -->	
        
        <!-- Start Contact --> */}
        <section id="contact-us" className="contact-us section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Contact Us</h1>
                            <p>Contry to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Contact Form --> */}
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <form className="form" method="post" action="mail/mail.php">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="name" placeholder="Full Name" required="required"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="email" name="email" placeholder="Your Email" required="required"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="text" name="subject" placeholder="Subject" required="required"/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <textarea name="message" rows="7" placeholder="Type Your Message Here" ></textarea>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group button">	
                                        <button type="submit" className="btn primary">Submit Message</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <!--/ End Contact Form -->
                    <!-- Contact Address --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="contact-address">
                            <div className="contact">
                                <h2>Get In Touch</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                {/* <!-- Single Address --> */}
                                <div className="single-address">
                                    <span><i className="fa fa-headphones"></i>Phone</span>
                                    <p>+(123) 45678910, +(346) 45678910</p>
                                </div>
                                {/* <!--/ End Single Address -->
                                <!-- Single Address --> */}
                                <div className="single-address">
                                    <span><i className="fa fa-envelope"></i>Email</span>
                                    <p><a href="mailto:info@youremail.com">info@youremail.com</a>, <a href="mailto:success@youremail.com">success@youremail.com</a></p>
                                </div>
                                {/* <!--/ End Single Address -->
                                <!--/ End Single Address --> */}
                                {/* <!-- Single Address --> */}
                                <div className="single-address">
                                    <span><i className="fa fa-map"></i>Corporate Office:</span>
                                    <p>Road no 3, Block-D, Khilgaon 1200, Dhaka Bangladesh</p>
                                </div>
                                {/* <!--/ End Single Address --> */}
                            </div>
                        </div>
                    </div>
                    {/* <!--/ End Contact Address --> */}
                </div>
            </div>
        </section>
        {/* <!--/ End Contact -->
        
        <!-- Map Section --> */}
        <div className="map-section">
            <div id="myMap"></div>
        </div>
        {/* <!--/ End Map Section -->
        
        <!-- Start Call-To-Action --> */}
        <section className="call-to-action">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="call-to-main">
                            <h2>we'll one over <span>30 Years of experience you always</span> the best guidance</h2>
                            <a href="contact.html" className="btn"><i className="fa fa-send"></i>Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!--/ End Call-To-Action -->
    
        <!-- Start Footer --> */}
        <footer id="footer" className="footer dark">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            {/* <!-- Address Widget --> */}
                            <div className="single-widget address">
                                <h2>Head Office</h2>
                                <p>Lorem ipsum dolor sit amet, consectet adipisicing elit, sed do eiusmod temporia.</p>
                                <ul className="list">
                                    <li><i className="fa fa-phone"></i>Phone: +123 456-7890 </li>
                                    <li><i className="fa fa-envelope"></i>Email:<a href="mailto:info@youremail.com">Info@youremail.com</a></li>
                                    <li><i className="fa fa-map-o"></i>Address: Road no 3, Khilgaon 1200, Dhaka Bangladesh</li>
                                </ul>		
                                <ul className="social">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                                </ul>
                            </div>
                            {/* <!--/ End Address Widget --> */}
                        </div>	
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            {/* <!-- Links Widget --> */}
                            <div className="single-widget links">
                                <h2>Quick Links</h2>
                                <ul className="list">
                                    <li><a href="about-us.html"><i className="fa fa-angle-right"></i>About Our Company</a></li>
                                    <li><a href="services.html"><i className="fa fa-angle-right"></i>Our Latest services</a></li>
                                    <li><a href="projects-masonry.html"><i className="fa fa-angle-right"></i>Our Recent Project</a></li>
                                    <li><a href="blogs-right-sidebar.html"><i className="fa fa-angle-right"></i>Latest Blog</a></li>
                                    <li><a href="#"><i className="fa fa-angle-right"></i>Help Desk</a></li>
                                    <li><a href="contact.html"><i className="fa fa-angle-right"></i>Contact With Us</a></li>
                                </ul>
                            </div>
                            {/* <!--/ End Links Widget --> */}
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            {/* <!-- Twitter Widget --> */}
                            <div className="single-widget twitter">
                                <h2>Recent Tweets</h2>
                                <div className="single-tweet">
                                    <i className="fa fa-twitter"></i>
                                    <p><a href="#">@Tromas</a> Mirum est notare quam littera gothica, quam nunc</p>
                                    <span>4 Minutes Ago</span>
                                </div>
                                <div className="single-tweet">
                                    <i className="fa fa-twitter"></i>
                                    <p><a href="#">@Tromas</a> claram, anteposuerit litterarum</p>
                                    <span>3 Hourse Ago</span>
                                </div>
                                <div className="single-tweet">
                                    <i className="fa fa-twitter"></i>
                                    <p><a href="#">@Tromas</a> per seacula quarta decima et quinta decima.</p>
                                    <span>5 Hourse Ago</span>
                                </div>
                            </div>
                            {/* <!--/ End Twitter Widget --> */}
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            {/* <!-- Gallery Widget --> */}
                            <div className="single-widget photo-gallery">
                                <h2>Photo Gallery</h2>
                                <ul className="list">
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                    <li><a href="http://via.placeholder.com/800x400" data-fancybox="images"><img src="http://via.placeholder.com/200x200" alt="#"/></a></li>
                                </ul>
                            </div>
                            {/* <!--/ End Gallery Widget --> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            {/* <!-- copyright --> */}
                            <div className="copyright">
                                <p>&copy; 2017 All Right Reserved.  Design & Developed By <a href="http://www.codeglim.com">codeglim</a></p>
                            </div>
                            {/* <!--/ End Copyright --> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </div>
        </body>
        </span>
    )
}
}

export default Index;