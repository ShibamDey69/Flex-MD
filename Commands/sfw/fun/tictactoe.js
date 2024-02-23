const sessions = new Map();

export default {
  name: "tictactoe",
  alias: ["ttt"],
  category: "fun",
  desc: "Play Tic Tac Toe with a friend.",
  react: "🧠",
  run: async (Neko, m, { from, sender, args ,nul}) => {
    try {
      class TicTacToe {
  constructor(m, id) {
    this.board = Array(9).fill(null);
    this.currentPlayer = "X";
    this.players = [];
    this.m = m;
    this.id = id;
    this.pending = [];
  }
  start(player) {
    player = `$${player.split("@")[1]}@s`;
    this.players.push(this.id);
    this.currentPlayer = "X";
    this.board = Array(9).fill(null);
    this.pending.push(player);
    sessions.set(this.id, this);
    this.m.reply("edit", nul, `*_Tic Tac Toe has started!_*`);
    this.m.reply(
      "mention",
      `${player}@s.whatsapp.net`,
      `@${player}have been invited to play Tic Tac Toe! with @${this.id}...\n To accept or reject the invite use ${prefix}ttt accept/reject`,
    );
  }

  play(index, sender) {
    if (this.board[index] || this.pending.includes(sender)) {
      return;
    }
    this.board[index] = this.currentPlayer;
    this.switchPlayer();
    this.m.reply(
      "mention",
      `${this.currentPlayer}@s.whatsapp.net`,
      `You have played ${this.currentPlayer} at index ${index}!`,
    );

    if (this.checkWin()) {
      this.m.reply(
        "mention",
        `${this.currentPlayer}@s.whatsapp.net`,
        `Congratulations! You have won the game!`,
      );
      this.end();
      return;
    }
    if (this.checkDraw()) {
      this.m.reply(
        "mention",
        `${this.currentPlayer}@s.whatsapp.net`,
        `It's a draw! The game is over.`,
      );
      this.end();
      return;
    }

    this.m.reply(
      "mention",
      `${this.currentPlayer}@s.whatsapp.net`,
      `*_It's ${this.currentPlayer}'s turn!_*`,
    );
  }
  acceptOrReject(player, text) {
    console.log(player,this.pending)
    if (this.pending.length > 0) {
      console.log(this.pending,player,text)
      if (this.pending.includes(player) && text == "accept") {
        this.m.reply(
          "edit",
          nul,
          `*_Player ${player} has accepted the game._*`,
        );
        this.pending.splice(this.pending.indexOf(player), 1);
      } else if (this.pending.includes(player) && text == "reject") {
        this.m.reply(
          "edit",
          nul,
          `*_Player ${player} has rejected the game._*`,
        );
        this.pending.splice(this.pending.indexOf(player), 1);
      } else if (
        this.pending.includes(player) &&
        (text !== "accept" || text !== "reject")
      ) {
        this.m.reply("edit", nul, `*_Invalid option!_*`);
      } else {
        return this.m.reply(
          "edit",
          nul,
          `*_Player ${player} is not invited to play TicTacToe._*`,
        );
      }
    }
  }

  makeMove(text, player) {
    this.m.reply(
      "mention",
      `${player}@s.whatsapp.net`,
      `@${player}, please enter your move (1-9):`,
    );
    const move = parseInt(text);
    if (isValidMove(move)) {
      this.m.reply("edit", null, `*_Invalid move!_*`);
      return;
    }

    this.board[move - 1] = this.currentPlayer;
    console.log(this);
  }

  isValidMove(move) {
    return move >= 1 && move <= 9 && !this.board[move - 1];
  }

  isGameOver() {
    return this.checkWinner() || this.isBoardFull();
  }

  checkWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return true;
      }
    }

    return false;
  }

  isBoardFull() {
    return this.board.every((cell) => cell !== null);
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  printBoard(channel) {
    let brdtr = "Board:\n";
    for (let i = 0; i < 9; i += 3) {
      brdtr += this.board.slice(i, i + 3).join(" | ") + "\n";
    }
    this.m.reply("edit", nul, brdtr);
  }
  end() {
    sessions.delete(this.id);
  }
      }
      
      let ttt = new TicTacToe(m, sender.split("@")[0]);
      if (args.length < 1) {
        return m.reply(
          "edit",
          nul,
          `*_Please provide an argument!\nExample: ${prefix}ttt start_*`,
        );
      } else if (args.startsWith("start") && !args.includes("@")) {
        return m.reply(
          "edit",
          nul,
          `*_Please tag someone!\nExample: ${prefix}ttt start @John Doe_*`,
        );
      } else if (args.startsWith("start") && args.includes("@")) {
        return ttt.start(args.split("start ")[1]);
      } else if (args.includes("accept") || args.includes("reject")) {
        console.log(args)
        return ttt.acceptOrReject(sender, args);
      } else if (args.match(/[0-9]/)) {
        return ttt.makeMove(parseInt(args), sender);
      } else {
        return m.reply("edit", null, `*_Invalid option!_*`);
      }
    } catch (error) {
      console.log(error)
      m.reply("edit", nul, `*_Error: ${error}_*`);
    }
  },
};
