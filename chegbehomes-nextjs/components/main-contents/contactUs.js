import Link from "next/link";

function ContactUs() {
  return (
    <>
      <section className="contact-us" id="contact-us">
        <div
          className="contact-us-bg lazy"
          data-bg="https://ik.imagekit.io/buildrite/themes/buildrite/images/contact-us-bg.png"
        ></div>
        <div className="contact-us-box inner wowo fadeInUp">
          <div className="left">
            <div className="text">
              <h2 className="color-yellow-and-line">Contact Us</h2>
              <h3>Let us build something great together</h3>
              <h4>Let Us Help You Build Your Dream Home</h4>
              <p>
                Part of our amazing service begins with delivering your dream
                home. Contact us and get yours.
              </p>
            </div>
            <div className="links">
              <div className="block">
                <div className="icon" title="Location">
                  <i className="demo-icon icon-location">&#xe810;</i>
                </div>
                <h5>Our Location</h5>
                No 20, Okpoga Street, High-level Makurdi. Benue State.
              </div>
              <div className="block">
                <div className="icon" title="Phone number">
                  <i className="demo-icon icon-phone-call">&#xe80e;</i>
                </div>
                <h5>Our Phone Number</h5>
                <Link
                  href="tel:080-6921-0726"
                  title="Call Us Now"
                  target="_blank"
                >
                  Ph. (80) 6921 0726
                </Link>
              </div>
              <div className="block">
                <div className="icon" title="Contact email">
                  <i className="demo-icon icon-email">&#xe80f;</i>
                </div>
                <h5>Our Contact Mail</h5>
                <Link href="mailto:info@chegbehomes.com" title="Email Us Now">
                  info@chegbehomes.com
                </Link>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-box">
              <div className="right-box-box">
                <div className="title">
                  <h4>Get in Touch!</h4>
                </div>
                <div className="contact-us-form">
                  <form
                    className="row g-3"
                    action="https://formsubmit.co/57436024833d98bccd00fc61cc19642f"
                    method="POST"
                  >
                    <input type="text" name="_honey" style={{display: "none"}} />

                    <input type="hidden" name="_captcha" value="false" />

                    <input
                      type="hidden"
                      name="_next"
                      value="http://chegbehomes.com/form-success"
                    />

                    <div className="col-md-6">
                      <label for="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="First&nbsp;Name"
                        id="firstName"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="Last&nbsp;Name"
                        id="lastName"
                        required
                      />
                    </div>
                    <div className="col-md-8">
                      <label for="emailInfo" className="form-label">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="emailInfo"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label for="phoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        id="phoneNumber"
                        placeholder="+234 (806) 867-5309"
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="lastName" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                      />
                    </div>
                    <div className="col-md-12">
                      <label for="comments" className="form-label">
                        Comments, questions?
                      </label>
                      <textarea
                        className="form-control"
                        id="comments"
                        name="comments,&nbsp;questions"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn btn-warning text-white font-weight-bold"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
