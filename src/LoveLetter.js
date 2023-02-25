import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import LoverLetterContent from './LoveLetterContent';
import ShootingStar from './ShootingStart';
import { TimeElapse } from './TimeElapse';

const LoveLetter = () => {
  const together = new Date('2022-03-15T21:02:00');
  const heartRef = useRef(null);
  const cardRef = useRef(null);
  const boxRef = useRef(null);
  const [type, setType] = useState(false);
  const [openEnvelope, setOpenEnvelope] = useState(false);
  const [days, setDays] = useState(TimeElapse(together));
  let timer;
  useEffect(() => {
    if (!type) {
        timer = setInterval(() => {
            setDays(TimeElapse(together));
          }, 1000);
    }
  }, [openEnvelope]);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    }
  }, []);

  const handleHeartClick = () => {
    cardRef.current.style = { opacity: 0 };
    // showBackground();
    setType(true);
  };

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="./css/LoveLetter.css"></link>
      </Helmet>
      <div className="wrapper">
        {!type && (
          <div
            className="card"
            onMouseEnter={() => setOpenEnvelope(true)}
            onMouseLeave={() => setOpenEnvelope(false)}
            ref={cardRef}
          >
            <div
              className={`text content ${openEnvelope ? 'content-open' : ''}`}
            >
              Love you Gina
            </div>
            <div
              className={`textTwo content ${
                openEnvelope ? 'content-open' : ''
              }`}
            >
              献给最爱的你
              <p></p>
              <span className='click-left'>👈</span>
            </div>
            <div
              className="heart content"
              ref={heartRef}
              onClick={handleHeartClick}
            ></div>
          </div>
        )}
        {!type && days}
        <div className={`box ${type ? 'box-appear' : ''}`} ref={boxRef}>
          {type && <LoverLetterContent scrollRef={boxRef}/>}
          <ShootingStar></ShootingStar>
        </div>
      </div>
    </>
  );
};

export default LoveLetter;
