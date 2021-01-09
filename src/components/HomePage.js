import 'assets/styles/_homePage.scss';

import IndexFooter from 'components/IndexFooter';
import IndexNavbar from 'components/IndexNavbar';
import SectionAbout from 'components/SectionAbout';
import SectionContact from 'components/SectionContact';
import SectionMembers from 'components/SectionMembers';
import TitleBrand from 'components/TitleBrand';
import $ from 'jquery';
import debounce from 'lodash/debounce';
import React, { createElement, useEffect } from 'react';

export default function HomePage() {
  const Sections = {
    About: SectionAbout,
    Members: SectionMembers,
    Contact: SectionContact
  };

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    $('a[href^="http"]')
      .not(`a[href*="${window.location.hostname}"]`)
      .attr({ target: '_blank', rel: 'noopener noreferrer' });

    $(window).on('load', () => {
      let count = 0;
      $('.banner, .loader').fadeOut('slow', () => {
        if (++count === 2)
          $('#root').fadeTo('slow', 1, () => {
            $('body').attr('style', 'background-color: #fff !important');
          });
      });
    });

    setViewportHeight();
    const handleResize = debounce(setViewportHeight, 200);
    $(window).on('resize', handleResize);

    return () => {
      $(window).off('resize', handleResize);
    };
  }, []);

  return (
    <>
      <IndexNavbar />
      <TitleBrand />
      {Object.entries(Sections).map(([key, type]) => (
        <section key={key} id={key.toLowerCase()}>
          {createElement(type)}
        </section>
      ))}
      <IndexFooter />
    </>
  );
}
