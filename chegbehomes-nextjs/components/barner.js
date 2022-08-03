import Link from "next/link";

import './barner.module.css'

function HomeBarner(props) {

  return (
    <>
      <section className="home-banner">
        <div className="home-banner-owl owl-carousel">
          <div className="slider-block">
            <div
              className="home-banner-bg lazy"
              data-bg-multi="linear-gradient(rgba(28,30,41,0.5),rgba(28,30,41,0.5)), url(../public/images/sh4.jpeg)"
            ></div>
            <div className="home-banner-box inner">
              <div className="content">
                <h1>
                  Ch<span>e</span>gbe Homes
                  <br />
                  <span style={{fontSize: "40px"}}>
                    {props.subtitle}
                  </span>
                </h1>
                <p className="page-info">
                  {props.pageInfo}
                </p>
                <div className="link">
                  <Link
                    href="/about"
                    title="About Chegbe Homes"
                    className="link-bg-white"
                  >
                    Find out more
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="slider-block">
            <div
              className="home-banner-bg lazy owl-courosel"
              data-bg-multi="linear-gradient(rgba(28,30,41,0.5),rgba(28,30,41,0.5)), url(../public/images/sh1.jpeg)"
            ></div>
            <div className="home-banner-box inner">
              <div className="content">
                <h2>
                  Pr<span className="color-yellow">i</span>vate Haven
                </h2>
                <p className="page-info">
                  Private Haven is the birthplace for exclusivity, the five (5)
                  units three bedroom duplex, came as a solution to living a
                  private yet communal life. Hence reserved for just 5
                  occupants.
                </p>
                <div className="link">
                  <a
                    href="/private-haven"
                    title="See Our Private Haven"
                    className="link-bg-white"
                  >
                    Private Haven
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="slider-block">
            <div
              className="home-banner-bg lazy"
              data-bg-multi="linear-gradient(rgba(28,30,41,0.5),rgba(28,30,41,0.5)), url(../public/images/sh2.jpeg)"
            ></div>
            <div className="home-banner-box inner">
              <div className="content">
                <h2>
                  SMART
                  <span className="color-yellow"> HOMES</span>
                </h2>
                <p className="page-info">
                  We present to you the true meaning of a smart city, the
                  reality of technology that gives comfort to the home. We have
                  moved away from what is common to bring you what is truly
                  exclusive.
                </p>
                <div className="link">
                  <Link
                    href="/private-haven"
                    title="Private Haven"
                    className="link-bg-white"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <div className="thumbnail-box inner wowo fadeInUp">
            <div className="thumbnail-box-box">
              <div className="images-box thumbnail-owl owl-carousel">
                <div className="img">
                  <figure>
                    <img
                      data-src="../public/images/sh4.jpeg"
                      className="lazy"
                      alt="Chegbe Home Thumbnail"
                      title="Chegbe Home Thumbnail"
                    />
                  </figure>
                </div>
                <div className="img">
                  <figure>
                    <img
                      data-src="../public/images/sh1.jpeg"
                      className="lazy"
                      alt="Private Haven Thumbnail"
                      title="Private Haven Thumbnail"
                    />
                  </figure>
                </div>
                <div className="img">
                  <figure>
                    <img
                      data-src="../public/images/sh2.jpeg"
                      className="lazy"
                      alt="Custom Built Home"
                      title="Custom Built Home"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeBarner;
