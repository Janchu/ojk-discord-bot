export default champion => `
**${champion.name}**, *${champion.title}*
roles: ${champion.tags.join(', ')}

attack: ${[...Array(champion.info.attack)].map(() => '‖').join('')}
defense: ${[...Array(champion.info.defense)].map(() => '‖').join('')}
magic: ${[...Array(champion.info.magic)].map(() => '‖').join('')}
difficulty: ${[...Array(champion.info.difficulty)].map(() => '‖').join('')}
`;
