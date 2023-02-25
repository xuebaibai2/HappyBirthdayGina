import BulletScreen, { StyledBullet } from 'rc-bullets';

import { useEffect, useState } from 'react';

const Danmu = () => {
  const [screen, setScreen] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const months = ["相遇即是缘", "生日快乐", "点击❤️", "开心快乐", "爱你", "谢谢你", "对不起"];

  let timer;
  useEffect(() => {
    let s = new BulletScreen('.screen', { duration: 20 });
    setScreen(s);
    
      return () => {
        clearInterval(timer);
      }
  }, []);

  timer = setInterval(() => {
    handleSend();
  }, 3000);

  const handleSend = () => {
    const random = Math.floor(Math.random() * months.length);
    if(screen&& isFirst) {
        screen.push(
            <StyledBullet
              head={''}
              msg={'点击❤️'}
              backgroundColor={'#fff'}
              size="normal"
            />,
          );
          setIsFirst(false);
          return;
    }

    if (screen) {
      screen.push(
        <StyledBullet
          head={''}
          msg={months[random]}
          backgroundColor={'#fff'}
          size="normal"
        />,
      );
    }
  };

  return (
    <>
      <div className="screen" style={{ width: '100vw', height: '80vh' }}></div>
    </>
  );
};

export default Danmu;
