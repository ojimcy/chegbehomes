function CurrentOffer() {
  return (
    <>
      <section className="home-our-work wowo fadeInUp">
        <div className="home-our-work-box inner">
          <div className="home-our-work-bg lazy"></div>
          <div className="left">
            <h2 className="color-yellow-and-line">Current Offer</h2>
            <h3>Private Haven</h3>
            <p>
              <b>Private Haven is the birthplace for exclusivity</b>, the five
              (5) units three bedroom duplex, came as a solution to living a
              private yet communal life. Hence reserved for just 5 occupants.
            </p>

            <div className="link">
              <a
                href="/private-haven"
                title="Private Haven Makurdi"
                className="link-bg-white"
              >
                Learn More <i className="fa fa-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="right home-our-work-owl owl-carousel">
            <div className="block owl-lazy lazy" data-src="../../public/images/sh3.jpeg">
              <div className="card-image">
                <a
                  href="../../public/images/sh3.jpeg"
                  data-fancybox="gallery"
                  data-caption="Caption Images 1"
                ></a>
              </div>
            </div>
            <div
              className="block owl-lazy lazy"
              data-src="../../public/images/privateHaven.jpeg"
            >
              <div className="card-image">
                <a
                  href="../../public/images/privateHaven.jpeg"
                  data-fancybox="gallery"
                  data-caption="Caption Images 1"
                ></a>
              </div>
            </div>
            <div
              className="block owl-lazy lazy"
              data-src="../../public/images/privateHavenMkd.jpeg"
            >
              <div className="card-image">
                <a
                  href="../../public/images/privateHavenMkd.jpeg"
                  data-fancybox="gallery"
                  data-caption="Caption Images 1"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CurrentOffer;
