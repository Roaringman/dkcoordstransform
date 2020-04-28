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
        <AboutTitle>Important Things</AboutTitle>
        <AboutSection>
          <AboutSubtitle>Something</AboutSubtitle>
          <Paragraph>
            I'm baby retro cray tofu, blog vegan gochujang four dollar toast pok
            pok franzen selvage. Palo santo banh mi four dollar toast vaporware,
            chambray lo-fi health goth next level. Roof party pug +1 beard
            austin. Fashion axe chicharrones viral crucifix farm-to-table. Deep
            v semiotics snackwave tousled chia, man braid next level. 3 wolf
            moon vape 8-bit selvage, roof party kale chips you probably haven't
            heard of them green juice health goth. Flannel iceland chillwave
            taiyaki.
          </Paragraph>

          <Paragraph>
            Asymmetrical vape forage photo booth. Letterpress flexitarian
            coloring book migas pinterest crucifix. Sartorial lumbersexual
            williamsburg 90's four loko PBR&B. Yuccie farm-to-table ennui,
            subway tile truffaut flannel synth austin. Fashion axe etsy paleo
            migas subway tile locavore. Kale chips selfies sartorial, swag
            coloring book vinyl brooklyn yr kombucha deep v bicycle rights
            mumblecore hoodie. Ramps vinyl snackwave portland DIY literally
            brunch mixtape selfies.
          </Paragraph>
        </AboutSection>
        <AboutSection>
          <AboutSubtitle>Someting else </AboutSubtitle>
          <Paragraph>
            +1 bicycle rights leggings coloring book messenger bag kinfolk.
            Subway tile scenester marfa, tbh portland enamel pin taxidermy
            readymade copper mug jean shorts tousled ethical chambray lomo kogi.
            Swag banjo brunch, direct trade meditation helvetica shoreditch
            snackwave. Etsy pickled irony echo park before they sold out prism
            venmo. Adaptogen snackwave sustainable +1 chambray pug. Microdosing
            thundercats af offal distillery enamel pin craft beer bicycle rights
            literally gluten-free fam authentic mixtape.
          </Paragraph>

          <Paragraph>
            Air plant vaporware letterpress tofu, sustainable try-hard street
            art fashion axe humblebrag vape pug cronut. Hell of slow-carb
            chartreuse migas tattooed etsy, mumblecore hammock everyday carry
            vinyl authentic. Photo booth fam paleo bespoke polaroid synth vape
            food truck mlkshk tbh copper mug.
          </Paragraph>
        </AboutSection>
      </Article>
    </AboutMain>
  );
}

export default AboutPage;
