import React from 'react';
import {Helmet} from "react-helmet";
// import "./style.css"
// // import "./css/bootstrap.min.css"
// // import "./css/theme-plugins.css"

// // import "./css/responsive.css"
// // import "./css/skin/skin1.css"
import globals from '../../constants/Globals';
import { Spin, Icon } from 'antd';
import { Link } from "react-router-dom";
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
class Index extends React.Component {
    state={
        loading:true,
    }
    componentDidMount= ()=>{
    setTimeout(()=>{this.setState({loading:false})},1000)
}
render= () =>{
    const {state}= this;
    // if (this.state.loading) {
    //     return (
    //       <div style={center}>
    //         <Spin indicator={antIconLarge} />
    //       </div>
    //     );
    //   }
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
               <link rel="stylesheet" href={`${globals.PUBLIC_URL}/css/bootstrap.min.css`}/>
               
               {/*{/*<!-- Tromas CSS -->*/}
               <link rel="stylesheet" href={`${globals.PUBLIC_URL}/css/theme-plugins.css`}/>
                <link rel="stylesheet" href={`${globals.PUBLIC_URL}/style.css`}/> 
               <link rel="stylesheet" href={`${globals.PUBLIC_URL}/css/responsive.css`}/>	
               
               {/*{/*<!-- Tromas Color -->*/}
               <link rel="stylesheet" href={`${globals.PUBLIC_URL}/css/skin/skin1.css`}/>
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
           <div style={{...center, 	width: '100%',background: '#fff',
	height:'100%',	zIndex: 9999, display:state.loading?'':'none'}}>
            <Spin  style={center} indicator={antIconLarge} />
          </div>
        <body className="box-bg" >
        
        <div className="boxed-layout"  >
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
												<li><a href="#about-us">Who we are</a></li>
												<li><a href="#services">Our programs</a></li>
												{/* <li><a href="#projects">Projects</a></li> */}
										
												{/* <li><a href="#pricing-table">Pricing Table</a></li> */}
												<li><a href="#testimonials">Testimonial</a></li>
                                                <li><a href="#team">Team</a></li>
												{/* <li><a href="#blog-main">Blogs</a></li>	 */}
												<li><a href="#contact-us">Contact</a></li>		
                                                <li>  <Link  to={`/login`}>Login</Link></li>						
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
        
     {/*  <!-- Start Services --> */}
        <section id="services" className="services section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Our programs</h1>
                            <p>We want to bring a new generation of science children based on Artificial Intelligence, Robotics,Basic Electronics, Internet of Things and Mobile Applications.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services" style={{height:'300px'}}>
                            <div className="icon"><i className="fa fa-edit"></i></div>
                            <div className="icon two"><i className="fa fa-edit"></i></div>
                            <h2><a href="service-single.html">Basic Electronics</a></h2>
                            <p>Children are normally inquisitive about how things function, and with a new trend in hardware companies creating open source hardware products, it's best time to teach kids about electronics.</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services"   style={{height:'300px'}}>
                            <div className="icon"><i className="fa fa-lightbulb-o"></i></div>
                            <div className="icon two"><i className="fa fa-lightbulb-o"></i></div>
                            <h2><a href="service-single.html">Mobile Applications</a></h2>
                            <p>We’re living in a digital age where mobile phones and tablets are a natural part of kids’ lives and they need to learn how to create Mobile Apps that they use everyday.</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services"  style={{height:'300px'}}>
                            <div className="icon"><i className="fa fa-money"></i></div>
                            <div className="icon two"><i className="fa fa-money"></i></div>
                            <h2><a href="service-single.html">Robotics</a></h2>
                            <p>We develop Robots that requires intelligence to handle tasks such as object manipulation and navigation, along with sub-problems of localization, motion planning and mapping</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services"  style={{height:'300px'}}>
                            <div className="icon"><i className="fa fa-clock-o"></i></div>
                            <div className="icon two"><i className="fa fa-clock-o"></i></div>
                            <h2><a href="service-single.html">Artificial Intelligence</a></h2>
                            <p>We teach Artificial intelligence (AI) an area of computer science emphasizing on the creation of intelligent machines that work and react like humans.</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services"  style={{height:'300px'}}>
                            <div className="icon"><i className="fa fa-globe"></i></div>
                            <div className="icon two"><i className="fa fa-globe"></i></div>
                            <h2><a href="service-single.html">Internet of Things</a></h2>
                            <p>In IoT classes, learners learns how to intergrate electrical technology to control devices which can communicate and interact over the Internet, and they can be remotely monitored and controlled.</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service -->
                    <!-- Single Service --> */}
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="single-services"  style={{height:'300px'}}>
                            <div className="icon"><i className="fa fa-magic"></i></div>
                            <div className="icon two"><i className="fa fa-magic"></i></div>
                            <h2><a href="service-single.html">Art & Design</a></h2>
                            <p>We train on Arts and Designs as the worlds of engineering and construction would also be nowhere without the technical design skills of architects, product designers, spatial designers, landscape designers and mechanical design engineers.</p>
                        </div>
                    </div>
                    {/* <!--/ End Single Service --> */}
                </div>
            </div>
        </section>
        {/* <!--/ End Services -->*/}
       {/* <!-- About Us --> */}
         
        {/* <!-- Start Testimonials --> */}
        <section id="testimonials" className="testimonials section">
            <div className="container">
            <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="section-title">
                            <h1>Testimonial</h1>
                         
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="testimonial-carousel">
                            {/* <!-- Single Testimonial --> */}
                            <div className="single-testimonial">
                                <div className="testimonial-content">
                                    <i className="fa fa-quote-left"></i>
                                    <p>I love TotoSci because we learn how to connect the bulbs on and off using programming.I can now automate the streets lights in Nairobi all by myself. Thank you TotoSci.</p>
                                </div>
                                <div className="testimonial-info">
                                    <span className="arrow"></span>
                                    <img src="https://totosci.smartbeaver.co.ke/assets/img/avatar/avatar-13.jpg" alt="#"/>
                                    <h6>Emma Kyaesi<span></span></h6>
                                </div>				
                            </div>
                            {/* <!--/ End Single Testimonial -->	
                            <!-- Single Testimonial --> */}
                            <div className="single-testimonial">
                                <div className="testimonial-content">
                                    <i className="fa fa-quote-left"></i>
                                    <p>I love TotoSci because they give me a chance to learn how to draw and make sculptures.I can make more original lion sculpture like the one Governor Sonko bought. Thank you TotoSci.</p>
                                </div>
                                <div className="testimonial-info">
                                    <span className="arrow"></span>
                                    <img src="https://totosci.smartbeaver.co.ke/assets/img/avatar/avatar-13.jpg" alt="#"/>
                                    <h6>John Ogunde<span></span></h6>
                                </div>			
                            </div>
                            {/* <!--/ End Single Testimonial -->	
                            <!-- Single Testimonial --> */}
                            <div className="single-testimonial">
                                <div className="testimonial-content">
                                    <i className="fa fa-quote-left"></i>
                                    <p>I love TotoSci because we learn how to connect the bulbs on and off using programming.I can now automate the streets lights in Nairobi all by myself. Thank you TotoSci.</p>
                                </div>
                                <div className="testimonial-info">
                                    <span className="arrow"></span>
                                    <img src="https://totosci.smartbeaver.co.ke/assets/img/avatar/avatar-13.jpg" alt="#" />
                                    <h6>Martin Muriithi<span></span></h6>
                                </div>			
                            </div>
                            {/* <!--/ End Single Testimonial -->		 */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!--/ End Testimonial --> */}
        

     
      
  
     
       
       {/* <!-- Start Counter --> */}
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
                                <p>Learners</p>
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
                                <p>Trainers</p>
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
                                <p>Attendants</p>
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
                                <p>Lab Technicians</p>
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
                            <p>TotoSci Academy is made up of a committed and devoted team who are experienced and well trained.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        {/* <!-- Single Team --> */}
                        <div className="single-team one default">
                            {/* <!-- Team Head --> */}
                            <div className="t-head"> 
                                <img src="https://totosci.smartbeaver.co.ke/assets/img/avatar/MuthunguTotoSci.jpg" alt="#"/>
                                {/* <div className="t-hover">
                                    <ul className="t-social">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                    </ul>
                                </div> */}
                            </div>
                            {/* <!-- Team Bottom --> */}
                            <div className="t-bottom">
                                <div className="t-icon">
                                    <a href="#team1"><i className="fa fa-plus"></i></a>
                                </div>
                                <h2 className="t-name">Anthony Muthungu</h2>
                                <p className="what">Business Development</p>
                            </div>
                        </div>
                        {/* <!-- End Single Team --> */}
                    </div>		
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        {/* <!-- Single Team --> */}
                        <div className="single-team two default">
                            {/* <!-- Team Head --> */}
                            <div className="t-head">
                                <img src="https://totosci.smartbeaver.co.ke/assets/img/avatar/DavidTotoSci.jpg" alt=""/>
                                {/* <div className="t-hover">
                                    <ul className="t-social">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                    </ul>
                                </div> */}
                            </div>
                            {/* <!-- Team Bottom --> */}
                            <div className="t-bottom">
                                <div className="t-icon">
                                    <a href="#team2"><i className="fa fa-plus"></i></a>
                                </div>
                                <h2 className="t-name">David Chuthi</h2>
                                <p className="what">Head of Administration</p>
                            </div>
                        </div>
                        {/* <!-- End Single Team --> */}
                    </div>	
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        {/* <!-- Single Team --> */}
                        <div className="single-team three default">
                            {/* <!-- Team Head --> */}
                            <div className="t-head">
                                <img src="https://totosci.smartbeaver.co.ke/assets/img/avatar/ZeddyTotoSci.jpg" alt="#"/ >
                                {/* <div className="t-hover">
                                    <ul className="t-social">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                        <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                    </ul>
                                </div> */}
                            </div>
                            {/* <!-- Team Bottom --> */}
                            <div className="t-bottom">
                                <div className="t-icon">
                                    <a href="#team3"><i className="fa fa-plus"></i></a>
                                </div>
                                <h2 className="t-name">Zeddy Zeitun</h2>
                                <p className="what">Assistant Administration</p>
                            </div>
                        </div>
                        {/* <!-- End Single Team --> */}
                    </div>		
                   
                </div>
                {/* <!-- Team Detailes One --> */}
                <div id="team1" style={{zIndex:500}} className="team-details  one">
                    <a href="#team1" className="cross"><i className="fa fa-remove"></i></a>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="single-team default">
                                {/* <div className="t-head">
                                    <img src="http://via.placeholder.com/360x400" alt=""/>
                                    <div className="t-hover">
                                        <ul className="t-social">
                                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                            <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                            <li><a href="#"><i className="fa fa-dribbble"></i></a></li>				
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>	
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <h2>Anthony Muthungu</h2>
                            <p>BSc Education Science - Karatina University</p> <p>Diploma in Computer Engineering - Zetech University</p>
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
        {/* <!--/ End Team -->*/}

      
        
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
                            <h1>OUR PARTNERS</h1>
                            <p>We say thank you to our partners for being part of us.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="clients-slider" >
                            {/* <!-- Single Clients --> */}
                            <div className="single-clients">
                                <a href="#" target="_blank"><img src="https://totosci.smartbeaver.co.ke/assets/img/brands/brand-6.png" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients -->
                            <!-- Single Clients --> */}
                            <div className="single-clients active">
                                <a href="#" target="_blank"><img src="https://totosci.smartbeaver.co.ke/assets/img/brands/brand-1.png" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients -->
                            <!-- Single Clients --> */}
                            <div className="single-clients">
                                <a href="#" target="_blank"><img src="https://totosci.smartbeaver.co.ke/assets/img/brands/brand-4.png" alt="#" /></a>
                            </div>
                            {/* <!--/ End Single Clients -->
                            <!-- Single Clients --> */}
                           
                            {/* <!--/ End Single Clients --> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!--/ End Clients -->
        
      
        
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
                            <h2> <span>Give us your Child we sprout the Cognitive Thinking in them.</span></h2>
                            <a href="#" className="btn"><i className="fa fa-send"></i>Register Here</a>
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
        <Helmet>
             {/* <!-- Jquery --> */}
             <script
                src={`${globals.PUBLIC_URL}/js/jquery.min.js`}
                type="text/javascript"
                ></script>
                {/* <!-- Bootstrap JS --> */}
                <script
                src={`${globals.PUBLIC_URL}/js/bootstrap.min.js`}
                type="text/javascript"
                ></script>
                {/* <!-- Modernizer JS --> */}
                <script
                src={`${globals.PUBLIC_URL}/js/modernizr.min.js`}
                type="text/javascript"
                ></script>
                {/* <!-- Tromas Plugins --> */}
                <script
                src={`${globals.PUBLIC_URL}/js/theme-plugins.js`}
                type="text/javascript"
                ></script>
                {/* <!-- Google Map JS --> */}
                <script
                src={`${globals.PUBLIC_URL}/js/googlemapapi.js`}
                type="text/javascript"
                ></script>
                {/* <!-- Main JS --> */}
                <script
                src={`${globals.PUBLIC_URL}/js/main.js`}
                type="text/javascript"
                ></script>
           
           </Helmet>
        </body>
        </span>
    )
}
}

export default Index;
const center = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  WebkitTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)'
};
