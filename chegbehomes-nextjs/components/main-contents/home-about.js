function HomeAbout(props) {
  return (
    <>
      <section className="home-about">
        <div className="home-about-box inner wowo fadeInUp">
          <div className="content">
            <div className="left">
              <h2 className="color-yellow-and-line">{props.title}</h2>
              <h3>{props.subTitle}</h3>
            </div>
            <div className="right">
              {props.contents}
            </div>
          </div>
          <div className="img">
            {props.figure}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeAbout;
