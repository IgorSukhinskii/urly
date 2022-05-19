export function shortenUrlIdBased(id: number): string {
  const alphabet = ('0123456789'
                  + 'abcdefghijklmnopqrstuvwxyz').split('');
  // first, let's figure out the length of our shortened url
  const minShortLength = Math.log(id) / Math.log(alphabet.length);
  // 5 symbols min
  const shortLength = minShortLength < 5 ? 5 : minShortLength;
  // the number of all possible short urls of a given length
  const base = Math.pow(alphabet.length, shortLength);
  // this is how we turn an autoincrementing id into random-looking string
  // first, we map an id to another number using a prime number smaller than base
  const primeStep = 49999991;
  const representation = id * primeStep % base;
  // now we just convert this numeric representation into a string
  return representation.toString(alphabet.length);
}

const shortenUrl = shortenUrlIdBased;
export default shortenUrl;
