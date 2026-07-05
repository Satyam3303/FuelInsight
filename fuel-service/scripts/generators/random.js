// Mulberry32 seeded random number generator

export const createRandom = (seed) => {
  let t = seed;

  return () => {
    t += 0x6d2b79f5;

    let r = Math.imul(t ^ (t >>> 15), t | 1);

    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);

    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

export const stringToSeed = (str) => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
};

export const randomBetween = (random, min, max) => {
  return min + random() * (max - min);
};

export const randomInt = (random, min, max) => {
  return Math.floor(randomBetween(random, min, max + 1));
};