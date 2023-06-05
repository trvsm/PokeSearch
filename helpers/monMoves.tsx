const moves = require('../data/moves.json');
const monMoves = mon => {
  //takes a pokemon, returns the moves available
  const learnedMoves = moves.filter(move => {
    const learned = move.learned_by_pokemon.some(el => el.name === mon.name);
    return learned;
  });
  const moveNames = [];
  learnedMoves.forEach(longMove => {
    moveNames.push(longMove.name);
  });
  return moveNames.sort();
};

export default monMoves;
