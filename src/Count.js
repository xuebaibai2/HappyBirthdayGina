import { useEffect } from 'react';
import countapi from 'countapi-js';

const Count = () => {
    useEffect(() => {
        countapi.info('happy-birthday-gina.vercel.app', 'IntroPageV4').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'homeV4').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'letterV4').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'photoV4').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'todosV4').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'apologyV4').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
      }, []);
    return <h1>没有页面了</h1>;
  };
  
export default Count;