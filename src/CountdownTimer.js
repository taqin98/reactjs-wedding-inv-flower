import React, { useState, useEffect } from 'react';
import AOS from 'aos';

const CountdownTimer = ({ includeAOS }) => {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Set your target date and time
    const targetDate = new Date('2024-06-18T10:00:00').getTime();

    useEffect(() => {
        AOS.init();
    }, []);
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const timeDifference = targetDate - now;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setCountdown({ days, hours, minutes, seconds });
            } else {
                // Countdown has reached zero, do something here if needed
                console.log('Countdown reached zero!');
            }
        };

        // Update the countdown every second
        const interval = setInterval(updateCountdown, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <React.Fragment>
            <style jsx="true">
            {`
            #countdown {
                background-color: #ecece9;
                padding: 2rem 0 2rem 0 !important;
                position: relative;
                height: 750px;
            }
            #countdown, #countdown > .parallax__container > .parallax {
                background-image: url(./assets/images/att_rose_max.png) !important;
                background-size: cover;
                background-position: 50% 50%;
                background-position-y: 70px;
                box-shadow: inset 2000px 0 0 0 rgb(255 255 255 / 35%);
            }
            #countdown .countdown-section, #countdown.going_on .event-going-on {
                z-index: 3;
                border-radius: 200px;
                color: #fff;
                background-color: #91a692;
                width: 359px;
                margin: auto;
                {/* -webkit-mask-image: url(./assets/images/bg_kelir.png); */}
                {/* -webkit-mask-size: 100%; */}
                background-color: #d8cfc9;
                height: 567px;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                -webkit-mask-repeat: no-repeat;
            }

            .bunga-mini-right {
                bottom: 116px;
                right: calc(59% - 130px);
                transform: translateX(50%) scaleX(-1) rotate(97deg);
                position: absolute;
                z-index: 4;
                width: 80px;
            }
            .bunga-mini-left {
                position: absolute;
                z-index: 4;
                top: 159px;
                left: calc(40% - 130px);
                transform: translateX(-50%) rotate(167deg);
                width: 80px;
            }
            
            .bunga-putih-right {
                position: absolute;
                z-index: 4;
                width: 110px;
                bottom: 156px;
                right: calc(50% - 148px);
                transform: scaleX(-1) translateX(-67%) rotate(318deg);
            }
            .bunga-putih-left {
                position: absolute;
                z-index: 4;
                width: 110px;
                left: calc(50% - 148px);
                transform: translateX(-50%);
            }
            .ranting {
                position: absolute;
                z-index: 3;
                width: 200px;
                bottom: -120px;
            }
            .ranting.right {
                right: -65px;
                transform: scaleX(-1);
            }
            .ranting.left {
                left: -65px;
            }
            `}
            </style>
            <div id="countdown">
                <div className="bunga-mini-right">
                    <img src="./assets/images/att_flowermini.png" alt="bunga samping" className="w-100" />
                </div>
                <div className="bunga-mini-left">
                    <img src="./assets/images/att_flowermini.png" alt="bunga samping" className="w-100" />
                </div>

                <div className="bunga-putih-right">
                    <img src="./assets/images/att_flowerside.png" alt="bunga samping" className="w-100" />
                </div>
                <div className="bunga-putih-left">
                    <img src="./assets/images/att_flowerside.png" alt="bunga samping" className="w-100" />
                </div>
                <div className="countdown-section">
                    <ul className="mb-0 ps-0">
                        <li className="days">
                            <span><strong>{countdown.days}</strong></span>
                            <strong>Hari</strong>
                        </li>
                        <li className="hours pb-1">
                            <span><strong>{countdown.hours}</strong></span>
                            <strong>Jam</strong>
                        </li>
                        <li className="minutes pb-1">
                            <span><strong>{countdown.minutes}</strong></span>
                            <strong>Menit</strong>
                        </li>
                        <li className="seconds pb-1">
                            <span><strong>{countdown.seconds}</strong></span>
                            <strong>Detik</strong>
                        </li>
                    </ul>
                    <p className="fst-italic fs-3 mt-3">18 Juni 2024</p>
                    <p className="font-rosemary_jasmine-title fst-italic mt-3">Nisa' & Taqim</p>
                </div>
                <h1 className="text-center font-rosemary_jasmine-title text-gray pt-4">Save The Date</h1>
                
            </div>
        </React.Fragment>
    );
};

export default CountdownTimer;
