import TypeWriterEffect from 'react-typewriter-effect';

const BirthdayWords = () => {
    return <TypeWriterEffect
    textStyle={{
      color: '#8b6a60',
      fontWeight: 500,
      fontSize: '1.5em',
      textAlign: 'center'
    }}
    startDelay={1000}
    cursorColor="#3F3D56"
    multiText={[
      '这是只属于你的生日页面',
      '今天是你的第31个生日，祝你生日快乐🥰🎉，happy happy birthday🎂!! 希望你以后每天每日都像今天一样，开开心心🎶，快快乐乐😁，无忧无虑😎。很高兴也很荣幸能够向你发送这样的祝福语，能参与到你生命里的第31个生日是我无比开心的事情，我也很想在以后的日子里，陪你一起度过开心快乐的每一天，希望余下的每一个生日我都能分享到你的快乐，不好意思，我在你的生日里，许了个我的愿望😛。'
    ]}
    multiTextDelay={4000}
    typeSpeed={100}
  />;
  };
  
export default BirthdayWords;
