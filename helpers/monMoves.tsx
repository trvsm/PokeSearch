const moves = require('../data/moves.json');
const monMoves = mon => {
  //takes a pokemon, returns the moves available
  const learnedMoves = moves.filter(move => {
    move.learned_by_pokemon.some(named);
  });
  const named = el => el.name === mon.name;
  return learnedMoves;
};

export default monMoves;
