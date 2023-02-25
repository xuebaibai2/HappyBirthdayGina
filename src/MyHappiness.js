import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Gallery from './gallery/gallery';
import countapi from 'countapi-js';

const MyHappiness = () => {
  useEffect(() => {
    countapi.hit('happy-birthday-gina.vercel.app', 'photo').then(res => {
      console.log('hit photo: ', res);
    });
  }, []);
    return <>
    <Helmet>
      <link rel="stylesheet" href="./css/gallery.css"></link>
    </Helmet>
    <Gallery />
    </>;
  };
  
export default MyHappiness;