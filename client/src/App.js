import React, { useState } from "react";
import "./App.css";
import $ from "jquery";

const App = () => {
  var prevScrollpos = window.pageYOffset;

  window.onscroll = function() {
    let currPos = $(window).scrollTop();
    $(".links ul li a").each(function() {
      let sectionLink = $(this);
      let navHeight = $("#navbar").outerHeight() + 1;
      let section = $(sectionLink.attr("href"));

      console.log(`Section pos is ${section.position().top}`);
      console.log(`Current Position is ${currPos}`);

      if (
        section.position().top - navHeight <= currPos &&
        sectionLink.offset().top + section.height() > currPos
      ) {
        $(".links ul li").removeClass("active");
        sectionLink.parent().addClass("active");
      } else {
        sectionLink.parent().removeClass("active");
      }
    });

    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      // document.getElementById("navbar").style.top = "-125px";
      document.getElementById("navbar").classList.add("shadowed");
    }
    if (this.window.pageYOffset > 0) {
      document.getElementsByClassName("links")[0].classList.remove("active");
      document.getElementById("navbar").classList.remove("active");
    }
    if (this.window.pageYOffset == 0) {
      if (document.getElementById("navbar").classList.contains("open")) {
        return;
      }
      document.getElementById("navbar").classList.remove("shadowed");
    }
    prevScrollpos = currentScrollPos;
  };

  const toggleButton = () => {
    document.getElementsByClassName("links")[0].classList.toggle("open");
    if (document.getElementById("navbar").classList.contains("shadowed")) {
      if (
        window.pageYOffset > 0 &&
        document.getElementById("navbar").classList.contains("open")
      ) {
        document.getElementById("navbar").classList.add("shadowed");
      } else if (window.pageYOffset == 0) {
        document.getElementById("navbar").classList.remove("shadowed");
      }
    } else {
      document.getElementById("navbar").classList.toggle("shadowed");
    }
  };

  var formData = new FormData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const nameInputHandler = e => {
    setName(e.target.value);
  };

  const emailInputHandler = e => {
    setEmail(e.target.value);
  };

  const contactInputHandler = e => {
    setContact(e.target.value);
  };

  const messageInputHandler = e => {
    setMessage(e.target.value);
  };

  const submitHandler = () => {
    formData.name = name;
    formData.email = email;
    formData.contact = contact;
    formData.message = message;
    let errorHandler = 0;

    if (name === "" || email === "" || contact === "" || message === "") {
      errorHandler += 1;
    }

    if (errorHandler === 0) {
      fetch("http://localhost:8000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.data.message === "message_not_sent" || errorHandler > 0) {
            alert("something went wrong");
          } else {
            alert("message sent");
          }

          setName("");
          setEmail("");
          setContact("");
          setMessage("");
        });
    } else {
      alert("fill in all fields");
    }
  };

  return (
    <div className="main-container">
      <div id="navbar" className="">
        <div className="nav container">
          <div className="brand">
            <img src="./img/logo.png" />
          </div>

          <div className="links">
            <ul>
              <li>
                <a href="#about" className="">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="burger" onClick={toggleButton}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="header-message">
          <p>Hi, my name is</p>
          <h2>Janmar Roque Jr.</h2>
          <h3>I can build websites.</h3>
          <p>I am a web developer from Manila.</p>
        </div>
        <div className="header-links">
          <a className="btn" href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Resume
          </a>
          <a
            className="btn"
            href="https://github.com/janmarroquejr"
            target="_blank"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            GitHub
          </a>
        </div>
      </div>

      <section id="about">
        <div className="about-me container">
          <div className="picture">
            <img src="./img/pic.jpg" />
          </div>
          <div className="about-text">
            <h1>About me</h1>
            <p className="about-para">
              I am aspiring to be a full-stack web developer. I love
              programming, writing, music, and gaming. I studied Computer
              Science in The University of Santo Tomas. I am a graduate of{" "}
              <a
                style={{ color: "#668386", textDecoration: "none" }}
                href="https://zuitt.co"
                target="_blank"
              >
                Zuitt
              </a>{" "}
              Coding Bootcamp where I learned to build fullstack websites.
            </p>
            <div className="tech">
              <div>
                <p className="tech-para">
                  Here are some of the technologies I've used:
                </p>
              </div>
              <div className="tech-list">
                <div>
                  <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript (ES6+)</li>
                    <li>PHP</li>
                    <li>MySQL</li>
                    <li>Laravel (6.x)</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>MongoDB</li>
                    <li>GraphQL</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <h1 className="proj-header">My sample projects</h1>

          <div className="cards">
            <div className="card">
              <img src="./img/sneakerhub.png" />
              <div className="project-text">
                <h1>Sneakerhub</h1>
                <a href="#" className="btn btn-proj">
                  Site
                </a>
                <a href="#" className="btn btn-proj">
                  GitHub
                </a>
                <p>
                  A static e-commerce website focused on mobile responsiveness.
                </p>
                <small>HTML5</small>
                <small>CSS3</small>
                <small>Bootstrap</small>
              </div>
            </div>

            <div className="card">
              <img src="./img/highersteaks.png" />
              <div className="project-text">
                <h1>Highersteaks</h1>
                <a href="#" className="btn btn-proj">
                  Site
                </a>
                <a href="#" className="btn btn-proj">
                  GitHub
                </a>
                <p>
                  Restaurant booking website using Laravel. Hosted on Heroku and
                  remotemysql.com.
                </p>
                <small>Laravel</small>
                <small>MySQL</small>
                <small>PHP</small>
                <small>JavaScript</small>
              </div>
            </div>

            <div className="card">
              <img src="./img/bnb.png" />
              <div className="project-text">
                <h1>Bed&Breakfast++</h1>
                <a href="#" className="btn btn-proj">
                  Site
                </a>
                <a href="#" className="btn btn-proj">
                  GitHub
                </a>
                <p>
                  Room booking website using MERN-G Stack. Hosted on Heroku.
                </p>
                <small>JavaScript</small>
                <small>MongoDB</small>
                <small>Express.js</small>
                <small>React.js</small>
                <small>Node.js</small>
                <small>GraphQL</small>
                <small>Apollo</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h1>Contact me</h1>
          <div className="contact-form">
            <form>
              <input
                type="text"
                placeholder="Name"
                className="contact-form-text"
                autoComplete="no"
                value={name}
                onChange={nameInputHandler}
              />
              <input
                type="email"
                placeholder="E-mail"
                className="contact-form-text"
                autoComplete="no"
                value={email}
                onChange={emailInputHandler}
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="contact-form-text"
                autoComplete="no"
                value={contact}
                onChange={contactInputHandler}
              />
              <textarea
                className="contact-form-text"
                placeholder="Your message"
                rows="5"
                value={message}
                onChange={messageInputHandler}
              />
              <a
                href="#contact"
                type="submit"
                class="btn-contact"
                onClick={submitHandler}
              >
                Send
              </a>
            </form>
          </div>
        </div>
      </section>

      <div className="icons">
        <ul>
          <a href="https://www.facebook.com/janmur" target="_blank">
            <li className="facebook">
              <i className="fab fa-facebook-f"></i>
            </li>
          </a>
          <a href="https://www.twitter.com/janmarroquejr" target="_blank">
            <li className="twitter">
              <i className="fab fa-twitter"></i>
            </li>
          </a>
          <a href="https://www.instagram.com/janmarroquejr" target="_blank">
            <li className="instagram">
              <i className="fab fa-instagram"></i>
            </li>
          </a>
          <a
            href="https://www.linkedin.com/in/janmar-roque-029611197/"
            target="_blank"
          >
            <li className="linked-in">
              <i className="fab fa-linkedin-in"></i>
            </li>
          </a>
          <a href="https://github.com/janmarroquejr" target="_blank">
            <li className="github">
              <i className="fab fa-github"></i>
            </li>
          </a>
        </ul>
      </div>

      <footer>
        <div>
          <p>Designed and built by Janmar Roque Jr.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
