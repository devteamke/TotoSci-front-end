import React from 'react';
import {Helmet} from "react-helmet";
import ReactPlayer from "react-player";
// import "./style.css"
// // import "./css/bootstrap.min.css"
// // import "./css/theme-plugins.css"

// // import "./css/responsive.css"
// // import "./css/skin/skin1.css"
import globals from '../../constants/Globals';
import validate from "./validation";
import { Spin, Icon,Result, Button} from 'antd';
import {MDBIcon} from 'mdbreact';
import { Link } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const antIconLarge = <Icon type='loading' style={{ fontSize: 40 }} spin />;
class Index extends React.Component {
   
    state={
        loading:true,
        name:'',
        nameError:'',
        email:'',
        emailError:'',
        subject:'',
        subjectError:'',
        message:'',
        messageError:'',
        submitting:false,
        submitted:false,

    }
    handleSubmit = (e) =>{
           e.preventDefault(); 
           const { state } = this;
           const nameError = validate("name", state.name?state.name:null);
           const emailError =validate("email", state.email?state.email:null);
           const subjectError =  validate("subject", state.subject?state.subject:null);
           const messageError = validate("message", state.message?state.message:null);
           
           this.setState(
            {
              nameError: nameError,
              emailError: emailError,
              subjectError: subjectError,
              messageError: messageError,

              
            },
            () => {
              if (!nameError && !emailError && !subjectError && !messageError) {
                // alert('Details are valid!'+globals.BASE_URL)
                let data={
                    name:state.name,
                    email:state.email,
                    subject:state.subject,
                    message:state.message,
                }
            
                console.log('values from contact',data)
                this.setState({ submitting:true, });
                const LoginAsync = async () =>
                  await (await fetch(`${globals.BASE_URL}/api/website/contact_us`, {
                    method: "post",
                    mode: "cors", // no-cors, cors, *same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json"
                      // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    redirect: "follow", // manual, *follow, error
                    referrer: "no-referrer", // no-referrer, *client
                    body: JSON.stringify(data)
                  })).json();
      
                LoginAsync()
                  .then(data => {
                    //this.setState({currentPlace:data.results})
                    if (data.success) {
                        this.setState({submitted:true})
                      // this.props.global._logoutHelper(user.exp - user.iat);
                    } else {
                     this.setState({failed:true})
                    }
                  })
                  .catch(error => {
                    console.log(error);
                    if (error == "TypeError: Failed to fetch") {
                      //   alert('Server is offline')
                      this.setState({
                        serverRes: "Failed to contact server!"
                      });
                    } else if (error.message == "Network request failed") {
                      // alert('No internet connection')
                      this.setState({
                        serverRes: "Network request failed"
                      });
                    }
                    this.setState({ failed: true });
                    console.log(error);
                  });
              }
            }
          );


          
           //get field values
           //send email
    }

    componentDidMount= async()=>{
        let   script = document.createElement("script");
        script.type = 'text/javascript';
        script.src =`${globals.PUBLIC_URL}/js/jquery.min.js`
        script.async = true;
        document.body.appendChild(script)
      
       script = document.createElement("script")
      script.type = 'text/javascript';
      script.src = `${globals.PUBLIC_URL}/js/bootstrap.min.js`;
      script.async = true;
      document.body.appendChild(script)
    
      script = document.createElement("script")
      script.type = 'text/javascript';
      script.src =`${globals.PUBLIC_URL}/js/modernizr.min.js`
      script.async = true;
      document.body.appendChild(script)
    
      script = document.createElement("script")
      script.type = 'text/javascript';
      script.src =`${globals.PUBLIC_URL}/js/theme-plugins.js`
      script.async = true;
      document.body.appendChild(script)
        
      setTimeout (() =>{
        script = document.createElement("script")
        script.type = 'text/javascript';
        script.src =`${globals.PUBLIC_URL}/js/main.js`
        script.async = true;
        document.body.appendChild(script)
      },100)
     
   
      
 
     

    setTimeout(()=>{
      
        this.setState({loading:false})},2500)


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
            
            <>
                    <Helmet>
        
        
            
                {/* {/*{/*<!-- Meta tag -->*/} */}
                <meta charset="utf-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords" content="SITE KEYWORDS HERE" />
                <meta name="description" content=""/>
                <meta name='copyright' content='codeglim'/>	
                
                {/* {/*{/*<!-- Title Tag -->*/} 
                <title>TotoSci Academy</title>
                
                {/*{/*<!-- Favicon -->*/}
           
                
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
      
            
            <div className="boxed-layout"  >
            {/* <!-- Start Header --> */}
                <header id="header" className="header style2 onepage">
                    {/* <!-- Topbar --> */}
                    <div className="topbar">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="topbar-inner">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                {/* <!-- Contact --> */}
                                                <ul className="contact" style={{height:'27px'}}>
                                            
                                                    <li><i className="fa fa-phone"></i>+254 707 571 682 | +254 723 081 406</li>
                                                    <li><i className="fa fa-envelope"></i> <a href="mailto:totosci.academy@gmail.com">totosci.academy@gmail.com   </a></li>
                                                    <li><i className="fa fa-map"></i> Nairobi National Museum at Heri-Hub   </li>
                                                </ul>
                                                {/* <!--/ End Contact --> */}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--/ End Topbar --> */}
                    <div className="header-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-2 col-sm-12 col-xs-12">
                                    {/* <!-- Logo --> */}
                                    <div className="logo" style={{padding:'10px', marginTop:'10px'}}>
                                        <a href="index.html"><img src="images/logo.png" alt="logo"/></a>
                                    </div>
                                    {/* <!--/ End Logo --> */}
                                    <div className="mobile-nav"></div>
                                </div>
                                <div className="col-md-10 col-sm-12 col-xs-12">
                                    <div className="nav-area">
                                        {/* <!-- Main Menu --> */}
                                        <nav className="mainmenu">
                                            <div className="collapse navbar-collapse">	
                                                <ul className="nav navbar-nav">
                                                    <li className="active"><a href="#header">Home</a></li>
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
                        <div className='overlay' />
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
                                        <p style={{fontWeight:'bold', color:'#fff', fontSize:'2.0rem'}}>A STEAM Subjects Academy</p>
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
                        <div className='overlay' />
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
                                        <p style={{fontWeight:'bold', color:'#fff', fontSize:'2.0rem'}}>Tinkering, Learning & Teaching</p>
                                        <div className="slide-btn">	
                                            <a href="#services" className="btn primary"><i className="fa fa-long-arrow-down"></i>Our Programs</a>
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
                        <div className='overlay' />
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
                                        <p style={{fontWeight:'bold', color:'#fff', fontSize:'2.0rem'}}>Transforming Children Lives Scientifically</p>
                                        <div className="slide-btn">	
                                            <a href="#contact-us" className="btn primary"><i className="fa fa-long-arrow-down"></i>Contact Us</a>
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
                



                       {/*  <!-- Start Call-To-Action --> */}
            <section className="call-to-action" style={{backgroundColor: '#00aeef'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="call-to-main">
                                <h2> <span>Give us your Child we sprout the Cognitive Thinking in them.</span></h2>
                                      
                                        <a href="http://35.246.149.29:3000/register" className="btn"  style={{color: '#00aeef'}}><i className="fa fa-send"></i>Apply now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                    {/* <!--/ End Call-To-Action --> */}


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
                                    <p>We teach Science, Technology, Engineering, Arts and Design, Robotics, Internet of Things, Mobile Applications, Basic Electronics, Animations, Web systems and Mathematics to children above 7 years.</p>
                                </div>
                                {/* <!-- End Single Choose -->
                                <!-- Single Choose --> */}
                                <div className="single-choose">
                                    <i className="fa fa-check"></i>
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
                                <div className="icon"><i className="fa fa-gears"></i></div>
                                <div className="icon two"><i className="fa fa-gears"></i></div>
                                <h2><a href="service-single.html">Basic Electronics</a></h2>
                                <p>Children are normally inquisitive about how things function, and with a new trend in hardware companies creating open source hardware products, it's best time to teach kids about electronics.</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Service -->
                        <!-- Single Service --> */}
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="single-services"   style={{height:'300px'}}>
                                <div className="icon" ><i className="fa fa-mobile" style={{fontSize:'-webkit-xxx-large'}} ></i></div>
                                <div className="icon two"><i className="fa fa-mobile"  style={{fontSize:'-webkit-xxx-large'}}></i></div>
                                <h2><a href="service-single.html">Mobile Applications</a></h2>
                                <p>We’re living in a digital age where mobile phones and tablets are a natural part of kids’ lives and they need to learn how to create Mobile Apps that they use everyday.</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Service -->
                        <!-- Single Service --> */}
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="single-services"  style={{height:'300px'}}>
                                <div className="icon"><i className="fa fa-sliders fa-lg"></i></div>
                                <div className="icon two"><i className="fa fa-sliders fa-lg"></i></div>
                                <h2><a href="service-single.html">Robotics</a></h2>
                                <p>We develop Robots that requires intelligence to handle tasks such as object manipulation and navigation, along with sub-problems of localization, motion planning and mapping</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Service -->
                        <!-- Single Service --> */}
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="single-services"  style={{height:'300px'}}>
                                <div className="icon"><i className="fa fa-assistive-listening-systems"></i></div>
                                <div className="icon two"><i className="fa fa-assistive-listening-systems"></i></div>
                                <h2><a href="service-single.html">Artificial Intelligence</a></h2>
                                <p>We teach Artificial intelligence (AI) an area of computer science emphasizing on the creation of intelligent machines that work and react like humans.</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Service -->
                        <!-- Single Service --> */}
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="single-services"  style={{height:'300px'}}>
                                <div className="icon"><i className="fa fa-wifi"></i></div>
                                <div className="icon two"><i className="fa fa-wifi"></i></div>
                                <h2><a href="service-single.html">Internet of Things</a></h2>
                                <p>In IoT classes, learners learns how to intergrate electrical technology to control devices which can communicate and interact over the Internet, and they can be remotely monitored and controlled.</p>
                            </div>
                        </div>
                        {/* <!--/ End Single Service -->
                        <!-- Single Service --> */}
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="single-services"  style={{height:'300px'}}>
                                <div className="icon"><i className="fa fa-edit"></i></div>
                                <div className="icon two"><i className="fa fa-edit"></i></div>
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
                                    <i className="fa fa-mortar-board"></i>
                                </div>
                                <div className="s-info">
                                    <span className="number">170</span>
                                    <p>Learners</p>
                                </div>
                            </div>
                            {/* <!--/ End Single Counter--> */}
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            {/* <!-- Single Counter--> */}
                            <div className="counter-single">
                                <div className="icon">
                                    <i className="fa fa-group"></i>
                                </div>
                                <div className="s-info">
                                    <span className="number">26</span>
                                    <p>Trainers</p>
                                </div>
                            </div>
                            {/* <!--/ End Single Counter--> */}
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            {/* <!-- Single Counter--> */}
                            <div className="counter-single">
                                <div className="icon">
                                    <i className="fa fa-heartbeat"></i>
                                </div>
                                <div className="s-info">
                                    <span className="number">2</span>
                                    <p>Attendants</p>
                                </div>
                            </div>
                            {/* <!--/ End Single Counter--> */}
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            {/* <!-- Single Counter--> */}
                            <div className="counter-single">
                                <div className="icon">
                                    <i className="fa fa-flask"></i>
                                </div>
                                <div className="s-info">
                                    <span className="number">2</span>
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
                                <h1>Management Team</h1>
                                <p>TotoSci Academy is made up of a committed and devoted team who are experienced and well trained.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div  style={{margin:'0 auto'} }
                        className="col-md-7 col-sm-8 col-xs-12">
                        <div className="col-md-6 col-sm-6 col-xs-12">

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
                        <div className="col-md-6 col-sm-6 col-xs-12">
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
                            
                                <ul>
                                    <li><p>Top 40 Under 40 Men 2018 Award-Business Daily Africa.</p></li>
                                    <li><p>Face of Kenya Science 2018 -Next Einstein Forum.</p></li>
                                    <li><p>Physics Mathematics Teacher-State House Girls High School,Nairobi.</p></li>
                                    <li><p>Technology Commercialization Certification -Royal Academy of Engineering (UK).</p></li>
                                    <li><p>Advancing Healthcare Innovation Certification - Emory University (USA), Johanesburg South Africa.</p></li>
                                    <li><p>Africa Young Entreprenuer Support (YES) Program 2019.</p></li>
                                    <li><p>American Society of Mechanical Engineers Innovation Showcase Finalist Award 2018 (USA).</p></li>
                                    <li><p>Arduino Google Group Teacher 2019 -Arduino.</p></li>
                                    <li><p>Demo Africa Innovation Tour Nairobi Winner 2018-Kenya.</p></li>
                                    <li><p>Health Tech Innovation Award Winner 2018 -Nigeria.</p></li>
                                    <li><p>Aspiring Intervarsity Innovator Winner 2018 -Kenya.</p></li>
                                    <li><p>Venture Capital for Africa Member 2019.</p></li>
                                    <li><p>German African Sustainability Innovation Health Winner 2019.</p></li>
                                    <li><p>Transformational Business Awards Special Category 2019 "Innovating for Disability" (FT/IFC) UK.</p></li>
                                    <li><p>WhiteBox Innovator-Kenya ICT Authority.</p></li>
                                    <li><p>Zetech University Centre Board Member.</p></li>
                                    <li><p>TotoSci Incubate Heri Hub 2018,ICT Authority.</p></li>
                                    <li><p>AlexCane Incubate IHub 2018.</p></li>
                                    <li><p>AlexCane Incubate GearBox 2018</p></li>
                                    <li><p>Refa Incubate Villgro Kenya 2019.</p></li>
                                </ul>
                            </div>
                        </div>	
                    </div>
                    {/* <!--/ End Team Detailes One -->
                    <!-- Team Detailes two --> */}
                    <div id="team2"  style={{zIndex:500}}  className="team-details  two">
                        <a href="#team2" className="cross"><i className="fa fa-remove"></i></a>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="single-team default">
                                    {/* <div className="t-head">
                                        <img src="http://via.placeholder.com/360x400" alt="#" />
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
                                <h2>David Chuthi</h2>
                                <p>Secretariat WhiteBox - ICT Authority (www.whitebox.go.ke) </p>
                                <p>BSc Informatics - Moi University</p>
                                <ul>
                                    <li><p>IBM Digital Course 2018-2019</p></li>
                                    <li><p>Huawei HCNA Course 2018</p></li>
                                    <li><p>CCNA Kabarak University 2015</p></li>
                                    <li><p>Jenga Payment Gateway API Training by Finserve</p></li>
                                    <li><p>IBM Business Intelligence Analyst Mastery Award 2016</p></li>
                                    <li><p>Oracle Innovation Awards 2018 - Housing & Urbanization National Integrated Affordable Housing System (NIAHS) Winner</p></li>
                                    <li><p>Hack the BIG 4 2018 – Affordable Housing Innovation (Winner) - National Integrated Affordable Housing System (NIAHS)</p></li>
                                
                                </ul>
                            
                            </div>
                        </div>	
                    </div>
                    {/* <!--/ End Team Detailes two -->
                    <!-- Team Detailes Three --> */}
                   
                    {/* <!--/ End Team Detailes Three -->*/}
                
                </div>
            </section>
            {/* <!--/ End Team -->*/}

        
        

        {/*    <!-- Start Clients --> */}
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
                                    <a href="#" ><img src="https://totosci.smartbeaver.co.ke/assets/img/brands/brand-6.png" alt="#" /></a>
                                </div>
                                {/* <!--/ End Single Clients -->
                                <!-- Single Clients --> */}
                                <div className="single-clients active">
                                    <a href="#"><img src="https://totosci.smartbeaver.co.ke/assets/img/brands/brand-1.png" alt="#" /></a>
                                </div>
                                {/* <!--/ End Single Clients -->
                                <!-- Single Clients --> */}
                                <div className="single-clients">
                                    <a href="#" ><img src="https://totosci.smartbeaver.co.ke/assets/img/brands/brand-4.png" alt="#" /></a>
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
                                <p>Do you have any questions? Do you want to register your child? Get in touch and our team will happily get back to you. </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* <!-- Contact Form --> */}
                         
                        <div className="col-md-8 col-sm-6 col-xs-12">
                            {state.failed?(
                                   <Result  status='error'   title="An error occurred" subTitle="Please try again."  extra={
                                    <Button type="primary" onClick={()=>{this.setState({failed:false, submitting:false})}}>
                                    Try again
                                    </Button>
                                  } />
                            ):state.submitted?(
                                     
                                   
                                    <Result  status='success'   title="Great, your message was sent!" subTitle="We will get back to you as soon as possible." />
                                   
                                     
                            ):(   <Spin tip="Sending message..." spinning={this.state.submitting} >
                            <form className="form"  >
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" value={state.name}  onChange={(event)=>{this.setState({name:event.target.value})}} name="name"  placeholder="Full Name" required="required"/>
                                            <p style={{color:'red'}}>{state.nameError}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email"  value={state.email}  onChange={(event)=>{this.setState({email:event.target.value})}} name="email" placeholder="Your Email" required="required"/>
                                            <p style={{color:'red'}}>{state.emailError}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text"  value={state.subject}  onChange={(event)=>{this.setState({subject:event.target.value})}} name="subject"  placeholder="Subject" required="required"/>
                                            <p style={{color:'red'}}>{state.subjectError}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea name="message"   value={state.message}  onChange={(event)=>{this.setState({message:event.target.value})}} rows="7" placeholder="Type Your Message Here" ></textarea>
                                            <p style={{color:'red'}}>{state.messageError}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group button">	
                                            <button type="submit" onClick={this.handleSubmit} className="btn primary">Submit Message</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            </Spin>)}
                     
                        </div>
                       
                        {/* <!--/ End Contact Form -->
                        <!-- Contact Address --> */}
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="contact-address">
                                <div className="contact">
                                    <h2>Get In Touch</h2>
                            
                                    {/* <!-- Single Address --> */}
                                    <div className="single-address">
                                        <span><i className="fa fa-phone"></i>Phone</span>
                                        <p>+(254) 707 571 682 | +(254) 723 081 406 </p>
                                    </div>
                                    {/* <!--/ End Single Address -->
                                    <!-- Single Address --> */}
                                    <div className="single-address">
                                        <span><i className="fa fa-envelope"></i>Email</span>
                                        <p><a href="mailto:info@youremail.com" style={{textTransform:'lowercase'}}> totosci.academy@gmail.com</a></p>
                                    </div>
                                    {/* <!--/ End Single Address -->
                                    <!--/ End Single Address --> */}
                                    {/* <!-- Single Address --> */}
                                    <div className="single-address">
                                        <span><i className="fa fa-map"></i>Located at:</span>
                                        <p>Nairobi National Museum at Heri-Hub</p>
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
            <section className="map-section">
            <div  style={{height:'350px',position:'relative',}}>
                <Map
                google={this.props.google}
                zoom={14}
                style={{
                    position:'relative',
                    width: '100%',
                    height: '350px',
                  }}
                initialCenter={{ lat: -1.274257, lng: 36.814393}}
                >
                <Marker  title={'TotoSci Academy'} name={'TotoSci Academy'} position={{ lat: -1.274257, lng: 36.814393}} />
                </Map>
            </div>
            </section>
                    {/* <!--/ End Map Section --> */}
            
        
        
      {/*       <!-- Start Footer --> */}
            <footer id="footer" className="footer dark">
                
                    
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {/* <!-- copyright --> */}
                                <div className="copyright">
                                    <p>&copy; 2019 All Right Reserved.</p>
                                </div>
                                {/* <!--/ End Copyright --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
         
                       </>
        )
    }
}

export default  GoogleApiWrapper({
  apiKey:'AIzaSyD-dDXT3_ovgGRfe7Gb3khE1_jv-eWR7k4'
})(Index);
const center = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  WebkitTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)'
};
