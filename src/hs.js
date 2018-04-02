import axios from 'axios';
import config from './config';


const hs = (msg) => {
  const searchQuery = msg.content.replace('?hs ', ''); // Remove '?hs ' from the string

  // Make http get request to hearthstoneapi
  axios.get(`https://omgvamp-hearthstone-v1.p.mashape.com/cards/${searchQuery}`, { headers: { 'X-Mashape-Key': config.mashapeKey } })
    // loop through the list and make bot reply the image
    .then(res => res.data.forEach(card => msg.reply(card.img)))
    .catch(err => console.log(err)); // eslint-disable-line no-console
};

export default hs;
