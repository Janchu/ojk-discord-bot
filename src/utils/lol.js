import axios from 'axios';

export async function getApiVersion() {
  // Get the newest api version. First index of the returned array is the newest version.
  const versionRes = await axios.get(
    `${process.env.RIOT_API_URL}/api/versions.json`,
  );
  return versionRes.data[0];
}

export async function getChampions() {
  // Get champions from the api. The api returns champions as an object.
  // To make life easier, we create an array of the object values (champions) and return it.
  const version = await getApiVersion();
  const championsRes = await axios.get(
    `${process.env.RIOT_API_URL}/cdn/${version}/data/en_US/champion.json`,
  );
  const championsObject = championsRes.data.data;
  return Object.values(championsObject);
}
