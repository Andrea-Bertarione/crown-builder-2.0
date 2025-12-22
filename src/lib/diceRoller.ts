export const rollDice = (dice: string) => {
    const parts = dice.split("d");
    const amountOfDices = parts.length === 1 ? 1 : parseInt(parts[0]);
    const diceFaces = parseInt(parts[parts.length - 1]);

    // Create array with NEW objects for each die
    const diceRolls = Array.from({ length: amountOfDices }, () => ({
        dice: 'd' + diceFaces,
        result: Math.floor(Math.random() * diceFaces) + 1
    }));

    const totalRes = diceRolls.reduce((sum, v) => sum + v.result, 0);

    return {
        diceRolls,
        result: totalRes,
    };
};
