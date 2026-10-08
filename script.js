function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getHumanChoice() {
  const choice = prompt("Rock, paper, or scissors?");
  return choice.toLowerCase();
}

const VALID_ROUND_OPTIONS = [1, 3, 5, 7, 9];

function getRoundsToPlay() {
  let rounds;
  do {
    rounds = parseInt(prompt("Best of how many rounds? Choose 1, 3, 5, 7, or 9:"));
  } while (!VALID_ROUND_OPTIONS.includes(rounds));
  return rounds;
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  const totalRounds = getRoundsToPlay();
  const roundsToWin = Math.ceil(totalRounds / 2);
  const history = [];

  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (humanChoice === computerChoice) {
      console.log(`Tie! Both chose ${humanChoice}.`);
      history.push({ humanChoice, computerChoice, outcome: "tie" });
      return;
    }

    const beats = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };

    if (beats[humanChoice] === computerChoice) {
      humanScore++;
      console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
      history.push({ humanChoice, computerChoice, outcome: "human" });
    } else {
      computerScore++;
      console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
      history.push({ humanChoice, computerChoice, outcome: "computer" });
    }
  }

  for (let round = 1; round <= totalRounds; round++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    console.log(`Round ${round}:`);
    playRound(humanSelection, computerSelection);

    if (humanScore === roundsToWin || computerScore === roundsToWin) {
      break;
    }
  }

  console.log("Round recap:");
  history.forEach((entry, index) => {
    const resultLabel =
      entry.outcome === "tie" ? "Tie" : entry.outcome === "human" ? "You won" : "Computer won";
    console.log(`  Round ${index + 1}: ${entry.humanChoice} vs ${entry.computerChoice}. ${resultLabel}.`);
  });

  console.log(`Final score. You: ${humanScore}, Computer: ${computerScore}`);
  if (humanScore > computerScore) {
    console.log("You win the game!");
  } else if (computerScore > humanScore) {
    console.log("Computer wins the game!");
  } else {
    console.log("The game is a tie!");
  }
}

playGame();
