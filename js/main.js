(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        {
            logo: "./images/icons/devbox_icon.png",
            alt: "JS_DEVBOX Logo",
            title: "JaySoft:DevBox",
            desc: "JaySoft-DevBox is an all-in-one local development toolkit powered by Docker. It has pre-configured databases, Kafka, Redis, monitoring (Prometheus & Grafana), and automated setup scripts. Easily start, manage, and scale your dev environment in seconds!",
            link: "https://github.com/iamjpsonkar/JaySoft-DevBox"
        },
        {
            logo: "./images/icons/proxy_server_icon.png",
            alt: "JS_Proxy Logo",
            title: "JaySoft:Proxy Server",
            desc: "Allows you to interact with external APIs through this server acting as a middleman. It forwards your requests to the external API and returns the received response, enabling seamless integration and testing of API-dependent applications.",
            link: "https://jsonkar.pythonanywhere.com/proxy/"
        },
        {
            logo: "./images/icons/PED_icon.png",
            alt: "PED_tools_logo",
            title: "JaySoft:PED_tools",
            desc: "Developed a web application for managing JSON data with features like prettification, encryption, and decryption. It provides a user-friendly interface for formatting, securing, and validating JSON—ideal for API development and debugging.",
            link: "http://jsonkar.pythonanywhere.com/"
        },
        {
            logo: "./images/icons/JS_Code_icon.png",
            alt: "JS_Code_logo",
            title: "JaySoft:JS_Code",
            desc: "Online Python IDE with Flask. Real-time compilation, code sharing, and debugging.",
            link: "http://iamjpsonkar.pythonanywhere.com/"
        },
        {
            logo: "./images/icons/bietcoder_icon.png",
            alt: "BIETCoders_logo",
            title: "JaySoft:BIETCoders",
            desc: "Social Networking Website for college students built on Python Flask.",
            link: "http://imsoftkid.pythonanywhere.com/"
        },
        {
            logo: "./images/icons/folder_icon.png",
            alt: "Github_logo",
            title: "JaySoft:IASTapp",
            desc: "Image Annotation & Segmentation Tool for training machine learning models.",
            link: "https://github.com/iamjpsonkar/IASTool"
        },
        {
            logo: "./images/icons/folder_icon.png",
            alt: "Github_logo",
            title: "JaySoft:JS_Paint",
            desc: "GUI-based Paint Application in Python with tools like layering and color palettes.",
            link: "https://github.com/iamjpsonkar/JaySoft-Paint"
        },
        {
            logo: "./images/icons/folder_icon.png",
            alt: "Github_logo",
            title: "JaySoft:ImgViewer",
            desc: "Image Viewer with features like zoom and slideshow, built with Python's PyQt5.",
            link: "https://github.com/iamjpsonkar/JaySoft-ImageViewer"
        },
        {
            logo: "./images/icons/folder_icon.png",
            alt: "Github_logo",
            title: "JaySoft:YT-Trend",
            desc: "Web scraping script to fetch top 50 trending YouTube videos.",
            link: "https://github.com/iamjpsonkar/Youtube_trending"
        },
        {
            logo: "./images/icons/folder_icon.png",
            alt: "Github_logo",
            title: "JaySoft:KT-Tweets",
            desc: "Tweet Grabber to retrieve top 100 tweets for a keyword, useful for analysis.",
            link: "https://github.com/iamjpsonkar/Know-The-Tweets"
        },
        {
            logo: "./images/icons/folder_icon.png",
            alt: "Github_logo",
            title: "JaySoft:JSText",
            desc: "Efficient Text Editor in Python supporting .jst files with syntax highlighting.",
            link: "https://github.com/iamjpsonkar/JSText"
        },
        {
            logo: "./images/icons/folder_icon.png",
            alt: "Github_logo",
            title: "JaySoft:Dict",
            desc: "Offline Dictionary in Python for quick word lookups, synonyms, and antonyms.",
            link: "https://github.com/iamjpsonkar/JaySoftDictionary"
        }
    ];

    const container = document.getElementById("projects");

    const headerHTML = `
        <div class="container">
            <div class="position-relative d-flex align-items-center justify-content-center">
                <h1 class="display-1 text-uppercase text-white" style="-webkit-text-stroke: 1px #dee2e6;">Projects</h1>
                <h1 class="position-absolute text-uppercase text-primary">My Projects</h1>
            </div>
            <div class="row pb-3">
                ${projects.map(project => `
                    <div class="col-lg-4 col-md-6 text-center mb-5">
                        <div class="d-flex align-items-center justify-content-center mb-4">
                            <img class="project-logo" src="${project.logo}" alt="${project.alt}">
                            <h4 class="font-weight-bold m-0">${project.title}</h4>
                        </div>
                        <p>${project.desc}</p>
                        <a class="border-bottom border-primary text-decoration-none" href="${project.link}" target="_blank">Read More</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = headerHTML;


    const certifications = {
        udemy: [
            {
                driveLink: "https://drive.google.com/file/d/1MMa6OnPcbMgXBfZfN9Ns5Mj-COqd03KF/view?usp=sharing",
                certLink: "https://www.udemy.com/certificate/UC-04c4e63e-3d09-4b03-bac2-5362094a32c8/",
                title: "Python Advance"
            },
            {
                driveLink: "https://drive.google.com/file/d/1z54QuBoWfqwPcEtgFDpNkDn9r9QQwHbW/view?usp=sharing",
                certLink: "https://www.udemy.com/certificate/UC-dbe260a7-4173-4913-afec-850a2bb35dde/",
                title: "GUI with Tkinter"
            },
            {
                driveLink: "https://drive.google.com/file/d/1TVC7bhE6c-j3W2hyI8KKMQrqk6WrtRtY/view?usp=sharing",
                certLink: "https://www.udemy.com/certificate/UC-7294146a-f05d-475c-bfa9-72c17f7ba3ef/",
                title: "Python3 OOPs"
            },
            {
                driveLink: "https://drive.google.com/file/d/122bblOW7o98vYnYWmnBUT2AXQVw0DjUK/view?usp=sharing",
                certLink: "https://www.udemy.com/certificate/UC-71df7363-fc5d-4c57-b621-5e09a41c4bb1/",
                title: "Web with Flask"
            },
            {
                driveLink: "https://drive.google.com/file/d/1qOHGYS2rGD2XqAmnM2NMSu2M2kNVY9xK/view?usp=sharing",
                certLink: "https://www.udemy.com/certificate/UC-75dbdf82-be3d-466b-8f8c-cdde811a5bbd/",
                title: "Django Full Stack"
            },
            {
                driveLink: "https://drive.google.com/file/d/1NU7P3n1iaAgMOZMSUuvPdjnDyJ11JKUm/view?usp=sharing",
                certLink: "https://www.udemy.com/certificate/UC-cd2c33e9-7cc6-4e3d-86e6-304b7002250e/",
                title: "Machine Learning <sup>A-Z™</sup>"
            },
            {
                driveLink: "https://drive.google.com/file/d/1QmKSVIMgWMahwmr_j8Fpjo8kYSpQh89U/view?usp=sharing",
                certLink: "https://www.udemy.com/certificate/UC-ce97f306-2ca2-46c3-909b-4749d93b1e32/",
                title: "HTML and CSS"
            }
        ],
        technical: [
            {
                platform: "Snackdown",
                platformIcon: "./images/icons/codechef_icon.png",
                certs: [
                    { label: "2017", link: "https://drive.google.com/file/d/1cERRpjlI_-RsRdGex0kiaERCQ75pM_js/view?usp=sharing" },
                    { label: "2019", link: "https://drive.google.com/file/d/1OAwbp1kmHSgMpucM4j75oHhgpD6U2Dkd/view?usp=sharing" },
                    { label: "2021", link: "https://drive.google.com/file/d/1Ru6Q5FYrvjGUhLIhB8yfxeiJQjxR_XFZ/view?usp=sharing" }
                ]
            },
            {
                platform: "Hackerrank",
                platformIcon: "./images/cert_icons/hackerrank_icon.png",
                certs: [
                    { label: "Python Certificate", link: "https://drive.google.com/file/d/17rkuC4zVATpoFHrKESMqhkZ1TfAf7IEg/view?usp=sharing" }
                ]
            },
            {
                platform: "Hackerrank",
                platformIcon: "./images/cert_icons/hackerrank_icon.png",
                certs: [
                    { label: "Problem Solving", link: "https://drive.google.com/file/d/1D2gPItEWfPWQMvrbXKJal76rQH04a9dc/view?usp=sharing" }
                ]
            },
            {
                platform: "Techgig",
                platformIcon: "./images/cert_icons/techgig_icon.png",
                certs: [
                    { label: "C,C++", link: "https://drive.google.com/file/d/157J5vDNOTvdml02SKPonSURRtIrzZtoT/view?usp=sharing" }
                ]
            },
            {
                platform: "Techgig",
                platformIcon: "./images/cert_icons/techgig_icon.png",
                certs: [
                    { label: "Python", link: "https://drive.google.com/file/d/1dHS1kEnEloSj9IjCAMzSENBbxYQAKRJJ/view?usp=sharing" }
                ]
            },
            {
                platform: "TEQIP-3",
                platformIcon: "./images/cert_icons/teqip_icon.png",
                certs: [
                    { label: "AI & ML", link: "https://drive.google.com/file/d/169BSTEJNAnHqtCTGJW5diMIHRC9HlN61/view?usp=sharing" }
                ]
            },
            {
                platform: "Datapure",
                platformIcon: "./images/cert_icons/datapure_icon.png",
                certs: [
                    { label: "Internship", link: "https://drive.google.com/file/d/1U81Rx549w_VkZsojJOCTwhkTfI4t146-/view?usp=sharing" }
                ]
            },
            {
                platform: "Datapure",
                platformIcon: "./images/cert_icons/datapure_icon.png",
                certs: [
                    { label: "Recommendation", link: "https://drive.google.com/file/d/1fQlyGyTgqANvOpt38TMA2A0U_EvwI45V/view?usp=sharing" }
                ]
            },
            {
                platform: "Programmr",
                platformIcon: "./images/cert_icons/programr_icon.png",
                certs: [
                    { label: "Internship", link: "https://drive.google.com/file/d/1_cQ7gQEJPlE5M_s3c3Kmq9iQjhiC3Tvr/view?usp=sharing" }
                ]
            },
            {
                platform: "ACM ICPC",
                platformIcon: "./images/cert_icons/acm_icpc_icon.png",
                certs: [
                    { label: "2018 Regionals", link: "https://drive.google.com/file/d/1XYMO1p31tg-SeVV_GbxcrV7uiwV6DQsb/view?usp=sharing" }
                ]
            },
            {
                platform: "Infosys",
                platformIcon: "./images/cert_icons/infytq_icon.png",
                certs: [
                    { label: "Python Certificate", link: "https://drive.google.com/file/d/1K9FrcH-dlY6TJhaRchVsqJ6OwOpY8ctF/view?usp=sharing" }
                ]
            },
            {
                platform: "PDA",
                platformIcon: "./images/cert_icons/PDA_icon.png",
                certs: [
                    { label: "Cyber Security", link: "https://drive.google.com/file/d/1bAcYNi3yJQk4aZIfCFpEzg9H0xGgTJ2C/view?usp=share_link" }
                ]
            }
        ]
    };

    const certContainer = document.getElementById("certifications");

    const certHTML = `
        <div class="container">
            <div class="position-relative d-flex align-items-center justify-content-center">
                <h1 class="display-1 text-uppercase text-white" style="-webkit-text-stroke: 1px #dee2e6;">Certifications</h1>
                <h1 class="position-absolute text-uppercase text-primary">My Certifications</h1>
            </div>
            
            <!-- Udemy Certifications -->
            <h2 class="text-center text-primary">Udemy Certifications</h2>
            <hr/>
            <div class="row pb-3">
                ${certifications.udemy.map(cert => `
                    <div class="col-lg-4 col-md-6 text-center mb-5">
                        <div class="d-flex align-items-center justify-content-center mb-4">
                            <img class="project-logo" src="./images/cert_icons/udemy_icon.png" alt="Udemy Icon">
                            <h4 class="font-weight-bold m-0">${cert.title}</h4>
                        </div>
                        <p>
                            <a class="border-bottom border-primary text-decoration-none" 
                            href="${cert.driveLink}" target="_blank">Download</a><br>
                            <a class="border-bottom border-primary text-decoration-none" 
                            href="${cert.certLink}" target="_blank">Verify Online</a>
                        </p>
                    </div>
                `).join('')}
            </div>

            <!-- Technical Certifications -->
            <h2 class="text-center text-primary">Other Certifications</h2>
            <hr/>
            <div class="row pb-3">
                ${certifications.technical.map(tech => `
                    <div class="col-lg-4 col-md-6 text-center mb-5">
                        <div class="d-flex align-items-center justify-content-center mb-4">
                            <img class="project-logo" src="${tech.platformIcon}" alt="${tech.platform} Logo">
                            <h4 class="font-weight-bold m-0">${tech.platform}</h4>
                        </div>
                        <p>
                            ${tech.certs.map(c => `
                                <a class="border-bottom border-primary text-decoration-none" 
                                href="${c.link}" target="_blank">${c.label}</a><br>
                            `).join('')}
                        </p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    certContainer.innerHTML = certHTML;
});


function chunkArray(arr, chunkSize) {
const chunks = [];
for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
}
return chunks;
}
