import React from "react";
import Hero from "../components/Hero/Hero";
import SpecialtyMenu from "../components/SpecialtyMenu/SpecialtyMenu";
import TopDoctors from "../components/TopDoctors/TopDoctors";
import Banner from "../components/Banner/Banner";

const Home = () => {
  return (
    <>
      <Hero />
      <SpecialtyMenu/>
      <TopDoctors/>
      <Banner/>
    </>
  );
};

export default Home;
