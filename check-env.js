Object.keys(process.env)
  .filter(key => key.includes('PG') || key.includes('DATABASE'))
  .forEach(key => console.log(`${key}=${process.env[key]}`));
