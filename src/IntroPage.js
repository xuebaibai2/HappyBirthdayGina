import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Danmu from './Danmu';
import countapi from 'countapi-js';

const IntroPage = ({ handleButtonClick }) => {
  useEffect(() => {
    // countapi.hit('happy-birthday-gina.vercel.app', 'IntroPageV4').then(res => {
    //   console.log('hit intro page', res);
    // });
  }, []);
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="./css/intro-page.css"></link>
      </Helmet>
      <Danmu></Danmu>
      <div className="center">
        <div className="heart" onClick={() => handleButtonClick()}></div>
      </div>
    </>
  );
};

export default IntroPage;
