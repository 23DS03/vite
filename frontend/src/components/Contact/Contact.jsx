import React, { useState } from 'react'
import "./Contact.css"
//import con from "../../assets/con.jpg"
import {useGSAP} from "@gsap/react"
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)


function Contact() {
    const [activeContactKey, setActiveContactKey] = useState(null)
    const [copyStatus, setCopyStatus] = useState('')
    const phoneNumber = '+91 62667 88830'
    const phoneLink = '+916266788830'
    const emailAddress = 'pathakaditya6266@gmail.com'

    const copyEmail = async () => {
      try {
        await navigator.clipboard.writeText(emailAddress)
        setCopyStatus('Email copied')
      } catch {
        setCopyStatus('Copy is unavailable in this browser')
      }
    }

    useGSAP(()=>{
      const responsiveAnimations = gsap.matchMedia()

      responsiveAnimations.add("(min-width: 751px)", () => {
        gsap.from(".leftcontact",{
          duration:1,
          opacity:0,
          scrollTrigger:{
            trigger: ".leftcontact",
            scroll: "body",
            scrub:2
          }
        })

        gsap.from(".rightcontact",{
          duration:1,
          opacity:0,
          scrollTrigger:{
            trigger: ".rightcontact",
            scroll: "body",
            scrub:2
          }
        })
      })

      responsiveAnimations.add("(max-width: 750px)", () => {
        gsap.from(".leftcontact",{
          y:50,
          duration:1,
          opacity:0,
          scrollTrigger:{
            trigger: ".leftcontact",
            scroll: "body",
            scrub:2
          }
        })

        gsap.from(".rightcontact",{
          y:50,
          duration:1,
          opacity:0,
          scrollTrigger:{
            trigger: ".rightcontact",
            scroll: "body",
            scrub:2
          }
        })
      })

      return () => responsiveAnimations.revert()
    })
  return (
    <section id="contact" aria-label="Contact and frequently asked questions">
      <div className="contact-main">
        <div className="leftcontact">
            <div className="contact-keyboard">
              {/* <img src={con} alt="Keyboard with interactive contact keys" /> */}
              <div className="contact-key-buttons" aria-label="Contact shortcuts">
                <button type="button" aria-label="Show phone number" onClick={() => { setActiveContactKey('phone'); setCopyStatus('') }}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.56 3.57.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.19 2.45.56 3.57a1 1 0 0 1-.25 1.02l-2.19 2.2Z" /></svg>
                </button>
                <button type="button" aria-label="Show email address" onClick={() => { setActiveContactKey('email'); setCopyStatus('') }}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5Z" /></svg>
                </button>
                <button type="button" aria-label="Open quick contact options" onClick={() => { setActiveContactKey('at'); setCopyStatus('') }}>
                  <span aria-hidden="true">@</span>
                </button>
              </div>
            </div>
            {activeContactKey && (
              <div className="contact-key-details" aria-live="polite">
                <button className="contact-details-close" type="button" aria-label="Close contact details" onClick={() => { setActiveContactKey(null); setCopyStatus('') }}>×</button>
                {activeContactKey === 'phone' && <>
                  <span className="contact-detail-label">Phone</span>
                  <a href={`tel:${phoneLink}`}>{phoneNumber}</a>
                </>}
                {activeContactKey === 'email' && <>
                  <span className="contact-detail-label">Email</span>
                  <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                </>}
                {activeContactKey === 'at' && <>
                  <span className="contact-detail-label">Let's connect</span>
                  <a href={`mailto:${emailAddress}?subject=Let%27s%20connect`}>{emailAddress}</a>
                  <div className="contact-detail-actions">
                    <button type="button" onClick={copyEmail}>Copy email</button>
                    <a href={`mailto:${emailAddress}?subject=Let%27s%20connect`}>Compose email</a>
                  </div>
                  {copyStatus && <span className="contact-copy-status" role="status">{copyStatus}</span>}
                </>}
              </div>
            )}
        </div>

        <div className="rightcontact">
            <form action= "https://formspree.io/f/mgogoqor" method="post">
                <input name = "Username" type = "text" placeholder='name'/>
                <input name = "Email" type = "Email" placeholder='abc@gmail.com'/>
                <textarea name = "message" id = "textarea" placeholder='Message Me'/>
                <input type="Submit" id="btn" value="Submit "/>
            </form>
            <nav className="professional-links" aria-label="Professional links">
              <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer">
                <svg className="professional-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.56 20.452h3.553V9H3.56v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <svg className="professional-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 .7a11.5 11.5 0 0 0-3.637 22.41c.575.106.786-.25.786-.555 0-.274-.01-1.001-.015-1.965-3.2.696-3.877-1.543-3.877-1.543-.523-1.33-1.278-1.685-1.278-1.685-1.045-.715.08-.7.08-.7 1.155.081 1.763 1.186 1.763 1.186 1.027 1.76 2.694 1.251 3.35.956.104-.744.402-1.252.731-1.54-2.554-.29-5.24-1.278-5.24-5.69 0-1.257.45-2.284 1.186-3.09-.119-.29-.514-1.46.113-3.045 0 0 .967-.31 3.168 1.18a11.02 11.02 0 0 1 5.766 0c2.2-1.49 3.165-1.18 3.165-1.18.63 1.585.235 2.755.116 3.045.739.806 1.184 1.833 1.184 3.09 0 4.423-2.69 5.397-5.252 5.681.413.356.78 1.056.78 2.128 0 1.536-.014 2.775-.014 3.152 0 .308.207.666.79.553A11.5 11.5 0 0 0 12 .7Z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a href="/resume.pdf" download>
                <svg className="professional-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 1.5L18.5 8H14ZM6 20V4h6v5h6v11Zm2-8h8v1.5H8Zm0 3h8v1.5H8Z" />
                </svg>
                <span>Resume</span>
              </a>
            </nav>

        </div>
      </div>

    </section>
  )
}

export default Contact
