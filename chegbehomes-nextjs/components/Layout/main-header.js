import Link from "next/link";


import Logo from "../../public/images/logo.png";

function MainHeader() {
  return (
    <header id="head">
      <div
        className="head-content"
        style={{backgroundColor: "#000", padding: "32px 0 14px 0"}}
      >
        <div className="head-content-box inner">
          <div className="head-logo">
            <figure>
              <Link href="/" title="Chegbe Homepage">
                <img
                  src={Logo}
                  alt="Chegbe Homes Logo"
                  title="Chegbe Homes Logo"
                  height="193"
                  width="38"
                />
              </Link>
            </figure>
          </div>
          <div className="head-menu">
            <div className="head-menu-overflow">
              <div className="head-menu-overflow-box">
                <ul className="menu">
                  <li>
                    <Link href="/" title="Homepage">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" title="About Chegbe Homes">
                      About us
                    </Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link href="" title="Chegbe Homes Products">
                      Products
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link href="/private-haven" title="Private Haven">
                          Private Haven
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <Link href="" title="Chegbe Homes Products">
                      Media
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link href="/" title="Chegbe Homes Gallery">
                          Gallery
                        </Link>
                      </li>
                      <li>
                        <Link href="/" title="Chegbe Homes Events">
                          Events
                        </Link>
                      </li>
                      <li>
                        <Link href="/" title="Chegbe Homes Events">
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="/crowd-fund" title="Chegbe Crowd Housing">
                      Crowd Housing
                    </Link>
                  </li>
                </ul>
                <div className="menu-link">
                  <Link
                    href="/about-us"
                    title="Contact Chegbe Homes"
                    className="book-link"
                  >
                    Make Enquiries
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dick-menu-link">
            <a
              href="tel:080-3514-6243"
              title="Call Chegbe Homes Now"
              className="tel-link"
            >
              <i className="demo-icon icon-phone">&#xe80c;</i>(80) 3514 6243
            </a>
            <Link
              href="/about-us"
              title="Online Enquiry with Chegbe Homes"
              className="book-link"
              role="button"
            >
              Online Enquiry
            </Link>
          </div>
          <div className="login-link-and-hamburger">
            <a
              href="tel:080-3514-6243"
              title="Call Chegbe Homes Now"
              className="tel-link"
            >
              <i className="demo-icon icon-phone">&#xe80c;</i>(80) 3514 6243
            </a>
            <div className="hamburger" title="Menu" role="button">
              <span style={{border: "1px solid #000"}}>&nbsp;</span>
              <span style={{border: "1px solid #000"}}>&nbsp;</span>
              <span style={{border: "1px solid #000"}}>&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
