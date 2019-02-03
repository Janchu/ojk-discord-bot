export default champion => `
**${champion.name}**, *${champion.title}*
roles: ${champion.tags.join(", ")}
`;
