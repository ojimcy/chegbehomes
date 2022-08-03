import Link from "next/link";

function MainFooter() {
  return (
    <>
      <footer>
        <div className="foot inner">
          <div className="foot-content">
            <div className="block">
              <div className="foot-logo">
                <figure>
                  <img
                    src="../public/images/logo.png"
                    alt="Chegbe Homes Logo"
                    title="Chegbe Homes Logo"
                    width="206"
                    height="40"
                  />
                </figure>
              </div>
              <div className="foot-share">
                <a
                  href="https://web.facebook.com/chegbehomes"
                  className="iconSocial"
                  title="Chegbe Homes on Facebook"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i
                    className="demo-icon fa fa-facebook"
                    aria-hidden="true"
                  ></i>
                </a>
                <a
                  href="https://www.instagram.com/chegbehomes/"
                  className="iconSocial"
                  title="Chegbe Homes on Instagram"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="demo-icon fa fa-instagram "></i>
                </a>
                <a
                  href="https://twitter.com/chegbehomes/"
                  className="iconSocial"
                  title="Chegbe Homes on twitter"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="demo-icon fa fa-twitter "></i>
                </a>
                <a
                  href="https://linkedin.com/company/chegbehomes"
                  className="iconSocial"
                  title="Chegbe Homes on Linkedin"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="demo-icon fa fa-linkedin "></i>
                </a>
              </div>
            </div>
            <div className="block">
              <nav className="foot-menu">
                <h2>Quick Links</h2>
                <ul>
                  <li>
                    <Link href="/" title="Homepage">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" title="About ChegbeHomes">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/" title="Terms Of Use">
                      Terms Of Use
                    </Link>
                  </li>
                  <li>
                    <Link href="/" title="Privacy Policy">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/" title="Sitemap">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="block">
              <nav className="foot-menu">
                <h2>Building Services</h2>
                <ul>
                  <li>
                    <Link href="/" title="All Chegbe Homes Services">
                      All Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/private-haven" title="Architectural Homes">
                      Smart Homes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/private-haven"
                      title="Residential Construction"
                    >
                      Residential Construction
                    </Link>
                  </li>
                  <li>
                    <Link href="/" title="Commercial Construction">
                      Commercial Construction
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="block">
              <nav className="foot-menu">
                <h2>Contact us</h2>
                <ul>
                  <li className="icon location">
                    <a
                      href="https://www.google.com/maps/d/u/0/viewer?mid=10Dg861xJNy18dTvB6dHk9fp8dRQ&ie=UTF8&hl=en&msa=0&ll=13.043052804510172%2C80.172004179235&spn=34.668997%2C78.662109&z=17"
                      title="Find us on Google"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <i className="demo-icon icon-location">&#xe810;</i>No. 20
                      Okpoga Street, High-level Makurdi
                    </a>
                    <a
                      href="tel:080-3514-6242"
                      title="Call Us Now"
                      target="_blank"
                    >
                      <i className="demo-icon icon-phone-call">&#xe80e;</i>(80)
                      3514 6242
                    </a>
                  </li>
                  <li className="icon emil">
                    <a
                      href="mailto:info@chegbehomes@gmail.com"
                      title="Email Us Today"
                    >
                      <i className="demo-icon icon-email">&#xe80f;</i>
                      info@chegbehomes@gmail.com
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="foot-bottom">
            <p>Copyright &copy; 2022 Chegbe Homes. All Rights Reserved.</p>
            <p>
              Made with <span className="love">&hearts;</span> in Nigeria <br />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MainFooter;
