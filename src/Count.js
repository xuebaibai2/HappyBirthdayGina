import { useEffect } from 'react';
import countapi from 'countapi-js';

const Count = () => {
    useEffect(() => {
        countapi.visits().then((result) => {
            console.log('visit count: ', result.value);
        });
        countapi.visits('global').then((result) => {
            console.log('global site visit: ', result.value);
        });
        console.log('//////////////////////////////////////');
        countapi.info('happy-birthday-gina.vercel.app', 'foo').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'IntroPage').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'home').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'letter').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'photo').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'todos').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
        countapi.info('happy-birthday-gina.vercel.app', 'apology').then(res => {
            console.log(res.key, res.value);
            console.log('---------------------------------------');
        });
      }, []);
    return <h1>没有页面了</h1>;
  };
  
export default Count;