export const createBoard = () => {
    const chessboard = document.querySelector('.chessboard');
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
        const content = document.createElement('div');
        const index = `${col}-${Math.abs(row - 7)}`;
        content.classList.add('content');
        content.setAttribute('id', index)
        content.classList.add((col + row) % 2 === 0 ? 'white' : 'black');
        chessboard.appendChild(content)
        }
    }  
}
