import { Helmet } from 'react-helmet';
import BulletScreen, { StyledBullet } from 'rc-bullets';

import { useEffect, useState } from 'react';
const TEST = () => {
  const [screen, setScreen] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const months = ["相遇即是缘", "生日快乐", "点击❤️", "开心快乐", "爱你", "谢谢你", "对不起"];

  let timer;
  useEffect(() => {
    // 给页面中某个元素初始化弹幕屏幕，一般为一个大区块。此处的配置项全局生效
    let s = new BulletScreen('.screen', { duration: 20 });
    setScreen(s);
    
      return () => {
        clearInterval(timer);
      }
  }, []);

  timer = setInterval(() => {
    handleSend();
  }, 4000);

  // 发送弹幕

  const handleSend = () => {
    const random = Math.floor(Math.random() * months.length);
    if(isFirst) {
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
      // or 还可以这样使用，效果等同使用 StyledBullet 组件
      //   screen.push({msg:bullet,head:'',color:"#eee", size:"large", backgroundColor:"rgba(2,2,2,.3)"})
    }
  };

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="./css/test.css"></link>
      </Helmet>
      <div className="screen" style={{ width: '100vw', height: '80vh' }}></div>
    </>
  );
};

export default TEST;
