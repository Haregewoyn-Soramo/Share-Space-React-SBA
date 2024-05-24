import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Carousel from "react-material-ui-carousel";

const ImageSlide = ({ products }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  
  if (!products) {
    console.log(products)
    return <div>No products available</div>;
  }

  return (
    <Box sx={{ maxWidth: 800, flexGrow: 1 }} >
      <Carousel
        autoPlay={true}
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {products.map((product) => (
          <img
            key={product._id}
            src={product.image.url}
            alt={product.name}
            style={{ width: "100%" }}
          />
        ))}
      </Carousel>
      <Button
        onClick={handleBack}
        disabled={activeStep === 0}
        style={{ position: "absolute", top: "50%", left: 0 }}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        onClick={handleNext}
        disabled={activeStep === products.length - 1}
        style={{ position: "absolute", top: "50%", right: 0 }}
      >
        <KeyboardArrowRight />
      </Button>
    </Box>
  );
};

export default ImageSlide;
