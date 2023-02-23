import { Helmet } from 'react-helmet';
import Gallery from './gallery/gallery';

const MyHappiness = () => {
    return <>
    <Helmet>
      <link rel="stylesheet" href="./css/gallery.css"></link>
    </Helmet>
    <Gallery />
    </>;
  };
  
export default MyHappiness;