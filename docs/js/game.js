const game = {
    xTurn: true,
    xState: [],
    oState: [],
    winningStates: [
        // Rij
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // kolomen
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // diagonaal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

let scores = {
    X: 0,
    O: 0
};

const updateScoreboard = () => {
    document.querySelector('.score-x-score').textContent = `X: ${scores.X}`;
    document.querySelector('.score-o-score').textContent = `O: ${scores.O}`;
};

document.addEventListener('click', event => {
    const target = event.target;
    const isCell = target.classList.contains('grid-cell');
    const isDisabled = target.classList.contains('disabled');

    if (isCell && !isDisabled) {
        const cellValue = target.dataset.value;

        game.xTurn === true ?
            game.xState.push(cellValue) :
            game.oState.push(cellValue)

        target.classList.add('disabled')
        target.classList.add(game.xTurn ? 'x' : 'o');

        game.xTurn = !game.xTurn;



        if (!document.querySelectorAll('.grid-cell:not(.disabled)').length) {
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent = 'Gelijk!'
        }

        game.winningStates.forEach(winningState => {
            const xWins = winningState.every(state => game.xState.includes(state))
            const oWins = winningState.every(state => game.oState.includes(state))

            if (xWins || oWins) {
                document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled'))
                document.querySelector('.game-over').classList.add('visible')
                document.querySelector('.game-over-text').textContent = xWins ?
                    '❌ wint!' :
                    '⭕ wint!'
                if (xWins) {
                    scores.X++;
                } else {
                    scores.O++;
                }
                updateScoreboard();
            }
        })
    }
})

document.querySelector('.restart').addEventListener('click', () => {
    document.querySelector('.game-over').classList.remove('visible')
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('disabled', 'x', 'o')
    })

    game.xTurn = true
    game.xState = []
    game.oState = []
})

updateScoreboard();