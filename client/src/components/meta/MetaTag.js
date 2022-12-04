import React from 'react';
import { Helmet } from 'react-helmet-async';

const MetaTag = ({ title = 'Around' }) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content="주변 동네의 운동친구를 찾아보세요!" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={'Around'} />
      <meta property="og:site_name" content={title} />
      <meta
        property="og:description"
        content="주변 동네의 운동친구를 찾아보세요!"
      />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/codestates-seb/seb40_main_001/develop/client/public/AroundImg.png"
      />
      <meta property="og:url" content="https://aroundexercise.com/" />

      <link rel="canonical" href="https://aroundexercise.com/" />
      <link rel="icon" href="around.png" />
    </Helmet>
  );
};

export default MetaTag;
