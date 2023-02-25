import { Helmet } from 'react-helmet';
import Danmu from './Danmu';

const IntroPage = ({ handleButtonClick }) => {
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
