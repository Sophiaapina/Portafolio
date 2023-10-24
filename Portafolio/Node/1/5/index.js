const superheroes = require('superheroes');
const supervillains = require('supervillains');

// Generate a random superhero name
const randomHero = superheroes.random();

// Generate a random supervillain name
const randomVillain = supervillains.random();

// Announce the battle
console.log(`It's the battle of the century!`);
console.log(`${randomHero} vs. ${randomVillain}`);
