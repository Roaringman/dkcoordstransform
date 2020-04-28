import React from "react";
import "../App.css";

import {
  Article,
  AboutNav,
  StyledLink,
  Paragraph,
  AboutTitle,
  AboutSubtitle,
  AboutSection,
  AboutMain,
} from "../styles/elements";

function AboutPage() {
  return (
    <AboutMain className={"App"}>
      <Article>
        <AboutNav>
          <StyledLink to="/">Transform</StyledLink>
        </AboutNav>
        <AboutTitle>About</AboutTitle>
        <AboutSection>
          <AboutSubtitle>What is this?</AboutSubtitle>
          <Paragraph>
            This project is based on an OpenSource{" "}
            <a
              href="https://docs.kortforsyningen.dk/#webproj"
              target="_blank"
              rel="noopener"
            >
              API
            </a>{" "}
            developed at the Danish Agency for Data Supply (SDFE). I am not
            involved in the development of this API.
          </Paragraph>

          <Paragraph>
            Coordinate transformation for high precision positioning data is not
            a simple task so I've tried to make the interface and workflow
            simple, so you can verify your results and move on quickly.
          </Paragraph>
        </AboutSection>
        <AboutSection>
          <AboutSubtitle>I'm Here to Learn </AboutSubtitle>
          <Paragraph>
            My goal with this front-end application is simply to play around
            with technologies that are new or interesting to me. The three main
            things I've used are:
          </Paragraph>
          <ul>
            <li>ReactJS</li>
            <li>XStateJS</li>
            <li>LeafletJS</li>
          </ul>

          <Paragraph>
            If you have comments, questions or tips for improvements, you are
            welcome to contact me here: roargengell@gmail.com{" "}
          </Paragraph>

          <Paragraph>I hope you enjoy using the front-end!</Paragraph>
        </AboutSection>
      </Article>
    </AboutMain>
  );
}

export default AboutPage;
