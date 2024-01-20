// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import AliceCarousel from "react-alice-carousel";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import PropTypes from "prop-types";
function HomeSectionCarosel({ data, sectionname }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef();

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };
  const slidePrev = () => carouselRef.current.slideTo(activeIndex - 1);
  const slideNext = () => carouselRef.current.slideTo(activeIndex + 1);

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data
    .slice(0, 10)
    .map((item, index) => <HomeSectionCard key={index} product={item} />);

  return (
    <div className="px-4 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {sectionname}
      </h2>
      <div className="relative p-5">
        <AliceCarousel
          items={items}
          ref={carouselRef}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {activeIndex !== items.length - 5 && (
          <Button
            variant="contained"
            className="z-50 bg-white"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "7rem",
              right: "5rem",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "white",
            }}
            aria-aria-label="next">
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}

        <Button
          variant="contained"
          className="z-50 bg-white"
          onClick={slidePrev}
          sx={{
            position: "absolute",
            top: "7rem",
            left: "0rem",
            transform: "translateX(50%) rotate(-90deg)",
            bgcolor: "white",
          }}
          aria-aria-label="next">
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>
      </div>
    </div>
  );
}
HomeSectionCarosel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sectionname: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default HomeSectionCarosel;
