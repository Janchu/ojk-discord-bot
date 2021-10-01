import axios from 'axios';

export default async function getCards() {
  // Get the newest api version. First index of the returned array is the newest version.
  const res = await axios.get(
    `${process.env.LOR_DDRAGON_URL}/latest/core/en_us/data/globals-en_us.json`,
  );
  const sets = res.data?.sets;
  const allFullCards = await sets.map(async ({ nameRef: set }) => {
    const setRes = await axios.get(
      `${
        process.env.LOR_DDRAGON_URL
      }/latest/${set.toLowerCase()}/en_us/data/${set.toLowerCase()}-en_us.json`,
    );
    return setRes.data;
  });
  const allCards = await Promise.all(allFullCards);
  return allCards.flat().map(({ cardCode, name }) => ({ cardCode, name }));
}
