import React, { Component } from 'react';
import { Container, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import '../index.css';
import './main.css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from "swiper";
// import 'swiper/css';
// import "swiper/css/navigation";
import AudioPlayer from '../AudioPlayer';
import CopyTextButton from '../CopyText';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountdownTimer from '../CountdownTimer';
import FormMessage from '../FormMessage';
export default class AppContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			destroyPopover: false, //hide permanent popover
			showPopover: false,
			isScrollingDown: true,
			showModal: false,
			isHideCover: false,
			toValue: '',
			fromValue: '',
			quotes: `Dan Diantara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu mendapatkan ketenangan hati dan dijadikan-Nya kasih sayang diantara kamu sesungguhnya yang demikian menjadi tanda-tanda kebesaran-Nya bagi orang-orang yang berfikir \n(Surat Ar-Ruum:21)`
		};
	}
	openModal = () => {
		this.setState({ showModal: true })
	}
	closeModal = () => {
		this.setState({ showModal: false })
	}
	hideCover = () => {
		this.setState({ isHideCover: true })
	}
	componentDidMount() {
		AOS.init();

		const getParams = new URLSearchParams(window.location.search);
		const toValue = getParams.get('to'); // Retrieve the 'to' parameter value
		const fromValue = getParams.get('from'); // Retrieve the 'from' parameter value

		// Set the 'toValue' in the component state
		this.setState({ toValue });
		this.setState({ fromValue });
		window.addEventListener('scroll', this.handleScroll);
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	componentDidUpdate() {
		// Refresh AOS whenever the component updates
		AOS.refresh();
	}
	handleScroll = () => {
		const currentScrollY = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

		// console.log(currentScrollY, 'currentScrollY');
		if (currentScrollY < 1) {
			// Scrolling down to the bottom of the page
			this.setState({ isScrollingDown: false });
		}

		if (currentScrollY < 100) {
			if (this.state.destroyPopover === false) {
				this.setState({ showPopover: true });
			}
		}
	};
	onClosePopover = () => {
		this.setState({ showPopover: false });
		this.setState({ destroyPopover: true });
	}


	render() {
		const { toValue, fromValue, isScrollingDown, showPopover } = this.state;
		const includeAOS = isScrollingDown;
		// console.log(isScrollingDown, showPopover);

		return (
			<React.Fragment>
				<style jsx="true">
					{`
				.couple-profile {
					background-image: url('./assets/images/template_1/flower_mx.png');
					background-size: contain;
					background-repeat: no-repeat;
					background-position: top;
					
				}
				.couple-profile h1 {
					font-size: 7rem;
				}
				.custom-quotes {
					height: 250px;
					position: relative;
					background-image: url('./assets/images/template_1/flower_side.png');
					background-size: cover;
					background-repeat-y: no-repeat;
					background-position: center;
				}
				.bg-primary {
					background: #91a692 !important;
				}
				.swiper-button-next, .swiper-button-prev{
					color: white;
				}
				.bg-countdown {
					background-color: #104636;
				}
				.flower-countdown {
					position: relative;
					background-color: rgb(145, 166, 146);
					overflow: hidden; /* Ensures the pseudo-element does not overflow */
				}

				.flower-countdown::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-image: url(./assets/images/template_1/bg_countdown.png);
					background-size: cover;
					background-position: center;
					background-blend-mode: soft-light;
					filter: brightness(0) invert(1) opacity(0.3);
				}

				.rundown {
					{/* margin: 2rem 0 2rem 0; */}
					padding-top: 2rem;
					padding-bottom: 1rem;
					background-image: url(./assets/images/template_1/flower2.png);
					{/* background-size: cover; */}
				}
				.object-suket {
					background-image: url(./assets/images/template_1/object-suket.png);
					background-size: contain;
					background-repeat: no-repeat;
					background-position: top;
					height: 21px;
				}
				.cover-story {
					float: left;
					width: 100%;
					position: relative;
				}
				#story {
					background-color: #ffffff;
					padding: 1rem 0 5rem 0;
					min-height: 400px;
					background-image: url(./assets/images/bg_wayang_tr.png);
					background-size: contain;
				}
				.end-rundown {
					float: left;
					position: relative;
					background-color: rgb(145 166 146);
					padding: 3rem 2.5rem;
				}
			`}
				</style>
				<Container style={{ "width": "100%", "margin": "auto" }}>
					<div className={(this.state.isHideCover === false) ? 'd-block' : 'd-none'}>
						<Card className="bg-transparent border-0" style={{ "zIndex": 1, "marginTop": "25vh" }}>
							<Card.Title className="title-wedding" data-aos={includeAOS ? "fade-down" : ""} data-aos-duration={includeAOS ? '1000' : ''}>THE WEDDING OF</Card.Title>
							<Card.Body className="p-0 row">
								<span className="name-wedding" data-aos={includeAOS ? "zoom-in" : ""} data-aos-duration={includeAOS ? '2000' : ''}  >Nisa' & Taqim</span>
								<span className="subtitle-wedding" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1500' : ''}  >
									{fromValue !== null ? (
										<>Rabu, 19</>
									) : (
										<>Selasa, 18</>
									)}
									. Juni . 2024
								</span>
							</Card.Body>

							<Card.Body>
								<Button onClick={() => this.hideCover()}
									className="position-relative mx-auto bg-transparent btn-open mt-5
								animate__animated animate__flash animate__infinite animate__slower
								"
								>Buka Undangan</Button>
							</Card.Body>
						</Card>
						{toValue !== null && (
							<div className="container-tamu mt-5">
								<p>Kepada Yth. <br />Bapak/Ibu/Saudara/i</p>
								<p>{toValue}</p>
							</div>
						)}

						<img alt="empty" src="./assets/images/cover_rose.png" className="w-100 position-absolute" style={{ "left": 0, "top": 0, "objectFit": "cover", "height": "100vh" }} />
					</div>
				</Container>
				<div className={(this.state.isHideCover === false) ? "d-none" : "d-block overflow-hidden"}>
					<AudioPlayer cbPlayAudio={this.state.isHideCover} />
					<div className="group-gift">
						<button className="btn-gift btn btn-sm btn-success" onClick={this.openModal}
						>
							<img src="https://our-wedding.link/_nuxt/img/pay_money.18b5b10.svg" alt="" style={{
								width: "80%",
							}}></img>
						</button>
						<div className={`popover ${showPopover ? 'd-block' : 'd-none'}`}>
							<div className="arrow"></div>
							<h3 className="popover-header">
								Amplop digital
								<button aria-label="Close" type="button" className="btn btn-close" onClick={this.onClosePopover}>
									<span aria-hidden="true" className="d-inline-block">×</span>
								</button>
							</h3>
							<div className="popover-body">
								<span>Sekarang <b>hadiahmu</b> bisa tersampaikan secara digital</span>
							</div>
						</div>
					</div>
					<Modal show={this.state.showModal} onHide={this.closeModal}>
						<Modal.Header closeButton>
							<Modal.Title className="w-100 text-center">Kirim Kado</Modal.Title>
						</Modal.Header>
						<Modal.Body className="text-center">
							<p>Jika memberi adalah ungkapan tanda kasih anda, Anda dapat memberi kado secara cashless.</p>
							<div className="object-suket my-4"></div>
							<Row className="gy-2">
								<Col xs={4} md={4} className="mx-auto">
									<img src={"./assets/images/logo-mandiri.svg"} alt="" style={{
										width: "80%",
									}}></img>
								</Col>
								<Col xs={8} md={8} className="text-left">
									<CopyTextButton textToCopy="1350015321143" an="Durtotun Nisa" />
								</Col>
								<Col xs={4} md={4} className="mx-auto">
									<img src={"./assets/images/logo-bca.png"} alt="" style={{
										width: "80%",
									}}></img>
								</Col>
								<Col xs={8} md={8} className="text-left">
									<CopyTextButton textToCopy="0310772976" an="Durtotun Nisa" />
								</Col>
								{/* 
								<Col xs={4} md={4} className="mx-auto">
									<img src={process.env.REACT_APP_PUBLIC_URL + "assets/images/logo-dana.png"} alt="" style={{
										width: "80%",
									}}></img>
								</Col>
								<Col xs={8} md={8} className="text-left">
									<CopyTextButton textToCopy="08567452717" an="Nurul Muttaqin" />
								</Col> */}
							</Row>
						</Modal.Body>
					</Modal>


					<Card className="bg-transparent border-0 position-relative" style={{ "zIndex": 1 }}>
						<div className="container-countdown text-center text-white w-100">
							<CountdownTimer includeAOS={includeAOS} />
						</div>
					</Card>

					<section className="bg-primary">
						<div className="shape">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svg-cover">
								<path fillOpacity="1" d="M 0 192 L 60 208 C 120 224 240 256 360 261.3 C 480 267 600 245 720 202.7 C 840 160 960 96 1080 106.7 C 1200 117 1304 143 1439 227 L 1440 288 L 1440 320 L 1380 320 C 1320 320 1200 320 1080 320 C 960 320 840 320 720 320 C 600 320 480 320 360 320 C 240 320 120 320 60 320 L 0 320 Z" className="shape-fill" data-v-c5783f70=""></path>
							</svg>
						</div>
						<img src="./assets/images/quotes_decor_nature.png" className="w-50 mx-auto" alt="Dekorasi Bunga" style={{
							filter: 'brightness(0) invert(1)'
						}} />
						<Card.Body className="text-white quotes padding-balance" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''}>
							{this.state.quotes}
						</Card.Body>
						<div className="shape">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svg-bottom">
								<path fillOpacity="1" d="M 0 192 L 60 208 C 120 224 240 256 360 261.3 C 480 267 600 245 720 202.7 C 840 160 960 96 1080 106.7 C 1200 117 1304 143 1439 227 L 1439 139 L 1439 0 L 1360 0 C 1349 0 1173 0 1066 0 C 958 0 825 0 724 0 C 624 0 507 0 375 0 C 375 1 130 0 116 0 L 0 0 Z" className="shape-fill" data-v-c5783f70=""></path>
							</svg>
						</div>
					</section>
					<section className="cover-story">

						<div id="story">
							<div style={{ "marginTop": "20%" }}>
								<h1 className="font-rosemary_jasmine-title">Calon Pengantin</h1>
							</div>
							<Row className="mx-0">
								<Col xs={12} md={6} className="row mx-auto position-relative overflow-hidden">
									<Card className="bg-transparent border-0" data-aos={includeAOS ? 'fade-right' : ''} data-aos-duration={includeAOS ? '1000' : ''}>
										<Card.Body className="text-black padding-balance text-black">
											<h4 className="font-rosemary text-black" style={{
												marginTop: '-15px',
												fontSize: '4rem'
											}}>
												<strong>Durrotun Nisa'</strong>
											</h4>
											<p className="font-roboto-light fw-bold mb-0">Putri Dari<br/>Bapak Mukron & Ibu Rohimatun</p>
											<p className="font-roboto-light">Ds. Jleper 05/03 Mijen Demak</p>

										</Card.Body>
									</Card>
								</Col>
								<Col xs={12} md={12} className="mx-auto">
									<div className="couple-profile">
										<h1 className="font-rosemary">&</h1>
									</div>
								</Col>
								<Col xs={12} md={12} className="mx-auto position-relative overflow-hidden">
									<Card className="bg-transparent border-0" data-aos={includeAOS ? 'fade-left' : ''} data-aos-duration={includeAOS ? '1000' : ''}>
										<Card.Body className="text-black padding-balance text-black">
											<h4 className="font-rosemary text-black" style={{
											fontSize: "4rem"
											}}>
												<strong>Mustaqim</strong>
											</h4>
											<p className="font-roboto-light fw-bold mb-0">Putra Dari<br/>Bapak Jamilin & Ibu Sumiyati</p>
											<p className="font-roboto-light">Ds. Mijen 08/02 Kaliwungu Kudus</p>

										</Card.Body>
									</Card>
								</Col>
							</Row>

							<Row className="mx-0">
								<Col xs={12} md={12} className="">
									<div className="custom-quotes pt-0 position-relative overflow-hidden">
										<h5 className="date-title" data-aos={includeAOS ? 'zoom-in' : ''} data-aos-duration={includeAOS ? '1000' : ''}  >
											18 . 06 . 2024
										</h5>
										<p className="mx-auto mt-5" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''}  >
											"Menciptakan kenangan adalah hadiah yang tak ternilai harganya.
											Kenangan akan bertahan seumur hidup; benda-benda hanya dalam waktu singkat."
										</p>
									</div>
								</Col>
							</Row>
						</div>
						<section className="p-0" style={{
							// backgroundColor: "rgb(90 87 78)"
						}}>
							<div className="group-svg">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" data-v-2f258c8b=""><path fillOpacity="1" d="M 0 192 L 60 208 C 120 224 240 256 360 261.3 C 480 267 600 245 720 202.7 C 840 160 915 107 1080 106.7 C 1238 109 1270 130 1374 168 L 1439 193 L 1440 320 L 1380 320 C 1320 320 1200 320 1080 320 C 960 320 840 320 720 320 C 600 320 480 320 360 320 C 240 320 120 320 60 320 L 0 320 Z" className="shape-fill-buttom" data-v-2f258c8b=""></path>
								</svg>
								<div className="container bg-countdown flower-countdown" style={{ "marginTop": "-0.5rem" }}>
									<Card className="bg-transparent shadow-none border-0 text-white" style={{
										minHeight: 500,
										zIndex: 11,
									}}>
										<Card.Title className="font-rosemary_jasmine-title mt-4">Acara Akan Diselenggarakan</Card.Title>
										<Row className="mx-auto">
											<Col xs={12} md={12} lg={12} className="mx-auto my-2">
												<div className="object-suket my-4"></div>
											</Col>
											<Col xs={12} md={12} lg={12} className="mx-auto mt-2" data-aos={includeAOS ? "zoom-in" : ""} data-aos-duration={includeAOS ? '1000' : ''} >
												<h4 className="font-rosemary_jasmine-title">
													Akad
												</h4>
											</Col>
											<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
												Selasa, 18 Juni 2024
											</Col>
											<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
												Pukul 10.00 WIB - Selesai
											</Col>
											<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
												Ds. Jleper 05/03 Mijen Demak<br />
												(Rumah mempelai wanita)
											</Col>
										</Row>

										<Row className="mx-auto">
											<Col xs={12} md={12} lg={12} className="mx-auto my-2">
												<div className="object-suket my-4"></div>
											</Col>
											<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? "zoom-in" : ""} data-aos-duration={includeAOS ? '1000' : ''} >
												<h4 className="font-rosemary_jasmine-title">
													Resepsi
												</h4>
											</Col>
											<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
												Selasa, 18 Juni 2024
											</Col>
											<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
												Pukul 11.00 WIB - Selesai
											</Col>
											<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
												Ds. Jleper 05/03 Mijen Demak<br />
												(Rumah mempelai wanita)
											</Col>
										</Row>
									</Card>
								</div>
							</div>
							<div className="shape">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svg-bottom">
									<path fillOpacity="1" d="M 0 192 L 60 208 C 120 224 240 256 360 261.3 C 480 267 600 245 720 202.7 C 840 160 960 96 1080 106.7 C 1200 117 1304 143 1439 227 L 1439 139 L 1439 0 L 1360 0 C 1349 0 1173 0 1066 0 C 958 0 825 0 724 0 C 624 0 507 0 375 0 C 375 1 130 0 116 0 L 0 0 Z" className="shape-fill-buttom" data-v-c5783f70=""></path>
								</svg>
							</div>
						</section>
					</section>

					<section className='pt-5 rundown cover' style={{
						backgroundColor: "#ecf4f0",
						backgroundImage: "url(./assets/images/bg_wayang_polos.jpeg)",
						backgroundSize: "cover",
					}}>
						<Card className="bg-transparent shadow-none border-0 text-black">
							<Card.Title className="font-rosemary_jasmine-title mt-4 pt-4"
								data-aos={includeAOS ? "zoom-in" : ""} data-aos-duration={includeAOS ? '1000' : ''}
							>Unduh Mantu</Card.Title>
							<Row className="mx-auto mt-2">
								<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
									Rabu, 19 Juni 2024
								</Col>
								<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
									Pukul 09.00 WIB - Selesai
								</Col>
								<Col xs={12} md={12} lg={12} className="mx-auto" data-aos={includeAOS ? 'fade-up' : ''} data-aos-duration={includeAOS ? '1000' : ''} >
									Ds. Mijen 08/02 Kaliwungu Kudus<br />
									(Rumah mempelai pria)
								</Col>
							</Row>
						</Card>
					</section>

					<section className="end-rundown w-100">
						<div className="text-white font-roboto-black" style={{
							letterSpacing: ".15rem",
							fontStyle: "italic",
						}}>Lokasi</div>
						<div className="font-rosemary_jasmine-title mt-2 text-white"
							data-aos={includeAOS ? "zoom-in" : ""} data-aos-duration={includeAOS ? '1000' : ''}
						>Mempelai Wanita</div>
						
						<iframe title="map wanita" src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d990.4463403173567!2d110.69875626946397!3d-6.795949667892575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNDcnNDUuNCJTIDExMMKwNDEnNTcuOCJF!5e0!3m2!1sid!2sid!4v1716115167478!5m2!1sid!2sid"
							style={{
								border: 0,
								marginTop: 25,
								width: "100%",
								height: "300px",
								borderRadius: "20px",
							}} allowFullScreen loading={"lazy"} referrerPolicy={"no-referrer-when-downgrade"}></iframe>
						<p className="font-roboto-light fw-bold text-white">Ds. Jleper 05/03 Mijen Demak</p>
						<Button className="text-white rounded-5 mt-2 mb-4 mx-5" style={{
							borderColor: "white",
							backgroundColor: "#104636",
						}} onClick={
							() => window.open("https://maps.app.goo.gl/piFVnB3dyp5tP2sx7", "_blank")
						}>Lihat Lokasi</Button>

						<div className="text-white font-roboto-black" style={{
							letterSpacing: ".15rem",
							fontStyle: "italic",
						}}>Lokasi</div>
						<div className="font-rosemary_jasmine-title mt-2 text-white"
							data-aos={includeAOS ? "zoom-in" : ""} data-aos-duration={includeAOS ? '1000' : ''}
						>Mempelai Pria</div>
						
						<iframe title="map pria" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25036.844660180348!2d110.78445372139456!3d-6.790930710416809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70dd8f959a57f3%3A0x6319b6b899742b5!2sDNE%20GROUP!5e0!3m2!1sid!2sid!4v1716115490593!5m2!1sid!2sid"
							style={{
								border: 0,
								marginTop: 25,
								width: "100%",
								height: "300px",
								borderRadius: "20px",
							}} allowFullScreen loading={"lazy"} referrerPolicy={"no-referrer-when-downgrade"}></iframe>
						<p className="font-roboto-light fw-bold text-white">Ds. Mijen 08/02 Kaliwungu Kudus</p>
						<Button className="text-white rounded-5 mt-2 mb-4 mx-5" style={{
							borderColor: "white",
							backgroundColor: "#104636",
						}} onClick={
							() => window.open("https://maps.google.com/?q=Dusun+III%2C+Jeruk%2C+Miri%2C+Sragen+Regency%2C+Central+Java+57276&ftid=0x2e7a0c1078169b9d:0xcc7f125c9d954ef9&entry=gps", "_blank")
						}>Lihat Lokasi</Button>

						<div className="object-suket my-4"></div>
					</section>
					<div className="shape float-left w-100">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="svg-bottom">
							<path fillOpacity="1" d="M 0 192 L 60 208 C 120 224 240 256 360 261.3 C 480 267 600 245 720 202.7 C 840 160 960 96 1080 106.7 C 1200 117 1304 143 1439 227 L 1439 139 L 1439 0 L 1360 0 C 1349 0 1173 0 1066 0 C 958 0 825 0 724 0 C 624 0 507 0 375 0 C 375 1 130 0 116 0 L 0 0 Z" className="shape-fill-buttom" data-v-c5783f70=""></path>
						</svg>
					</div>

					<FormMessage />
					<section className="section-footer bg-primary">
						<div className="footer w-100 text-white text-center">
							Made with &#10084; <a href="https://www.instagram.com/taqin_taqin_/"
								className="text-white"
								target="_blank" rel="noreferrer">taqin</a>.
						</div>
					</section>
				</div>
			</React.Fragment>
		)
	}
}