// eslint-disable-next-line no-unused-vars
import React from "react";
import MainCarousel from "../Component/HomeCarousel/MainCarousel";
import HomeSectionCarosel from "../Component/HomeSectionCarosel/HomeSectionCarosel";
import { coolmate } from "../../Data/coolmate";

function Homepage() {
  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-10 flex flex-col justify-center">
        <HomeSectionCarosel
          data={coolmate}
          sectionname={"Sản Phẩm Mới Ra Mắt "}
        />
        <HomeSectionCarosel data={coolmate} sectionname={"Sản Phẩm Sale"} />
        <HomeSectionCarosel data={coolmate} sectionname={"Sản Phẩm Bán Chạy"} />
      </div>
    </div>
  );
}

export default Homepage;
