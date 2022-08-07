var engine = require('workshop-engine');

var jediName = "" // your Jedi name
var forcePower = 0; // force power gained meditating at the Jedi Temple
var bountyValue = 0; // starts at 0, if it reaches 100 you get busted and lose the game
var fear = 0; // starts at 0, if it reaches 100 you join the Dark side and lose the game
var vulnerabilities = 0; // Current total of vulnerabilities
var vulnerabilitiesNum; // Number of vulnerabilities found
var jediKnight = false; // boolean to indicate if the player has reached Jedi knight level
var techniquesKnown = false; // boolean to know if the player already learned the techniques required;
var hitpoints = 30 // your current hitpoints

var ancientTexts = [
    { chapter: 1, technique: '□Fo□□rc□e L□ea□p□□' },
    { chapter: 2, technique: 'T□ra□□n□□□s□fe□r F□o□rc□e□□' },
    { chapter: 3, technique: 'Fo□□rc□e B□urs□t' },
    { chapter: 4, technique: '□□M□alac□i□a' },
    { chapter: 5, technique: '□Fo□rce□□ We□a□□po□n'}
];
var sithLord = {
    name: 'Darth Tekman',
    hitpoints: 45,
    counterImmune: false
};


/*
  * Introduction to Code Wars
*/

var introduction = engine.create({ 
  type: 'before', 
  name: 'Introduction' });

// Add a banner to beforeStage
introduction.executeBefore(function() {
  engine.showBanner(`Welcome to Code Wars!`)
});

//Add Questions to beforeStage
// First Question
introduction.addQuestion({
  type: 'input',
  message: 'What\'s your name, future Jedi Knight?',
  validator: function(answer) {
    if((answer[0] !== answer[0].toUpperCase()) || (answer.length <= 2)) {
      return 'Your name needs to be capitalized and have at leat three characters'
    }
  },
  action: function(answer) {
    jediName = answer;
  }
});
// Second Question
introduction.addQuestion({
  type: 'confirm',
  message: 'Are you the chosen one to make the galaxy a peaceful place?',
  action: function(answer) {
    if(answer) {
      console.log('')
      console.log('Let\'s see what are you made off!!!')
      console.log('')
      console.log('To protect the galaxy, you must face a long journey.Get ready to have access to a bunch of cool instructions.');
  console.log('');
  console.log('1 - Defeat the Sith Lord to win');
  console.log('');
  console.log('2 - Find vulnerabilities to infiltrate the Star Destroyer');
  console.log('');
  console.log('3 - Learn force techniques through ancient texts');
  console.log('');
  console.log('4 - All of your actions will increase your fear');
  console.log('');
  console.log('5 - If your bounty value or fear reaches 100, you lose');
  console.log('');
  console.log('6 - If your fear becomes higher than 70, you are experienced enough and become a Jedi Knight');
  console.log('');
    } else {
      console.log('')
      console.log('Such a disappointment! Good luck to be a normal Jedi!') 
      console.log('');
      engine.quit()
    }
  }
})

/*
  * Jedi Temple
*/
var temple = engine.create({
  type: 'stage',
  name: 'Jedi Temple'
})

// Add a banner to the Temple stage
temple.executeBefore(function() {
  engine.showBanner(`Welcome to Jedi Temple`);
  console.log('Where you can attune with the Force');
  console.log('');
})

// Add Questions to the Temple stage
temple.addQuestion({
  type: 'input',
  message: 'How many hours do you want to spend in the temple?',
  validator: function(answer) {
    if(answer <= 0 || answer > 24) {
      return 'Please choose a number between 0 and 24.You can only spend a day in a row.'
    }
  },
  action: function(answer) {
    fear += 5
    for(var i = 1; i <= answer; i++) {
      if (fear >= 50) {
        forcePower += 1; 
      } else {
          forcePower += 2
          
      }
      
    }
    console.log(`You spent ${answer} hours in Jedi Temple.`);
    console.log(`Force power obtained: ${forcePower}`);
  }
});

// Show a message after the player leave the temple
temple.executeAfter(function() {
  console.log('')
  console.log('Leaving Jedi Temple...')
  console.log(`The current value of fear: ${fear}`);
  console.log(`The current value of bounty value: ${bountyValue}`);
  if(fear >= 70) {
    jediKnight = true;
    console.log('Congratulations! You became a Jedi Knight! Jedi Training Stage is unlocked.')
  }
  
  if(fear >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('You have entered to the dark side of the force.TRY AGAIN.');
    engine.quit();
  };
  if(bountyValue >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('Your Bounty value reached 100.TRY AGAIN.')
    engine.quit()
  }
  
})

/*
  * CANTINA
*/
var cantina = engine.create({
  type: 'stage',
  name: 'Cantina'
})

//ADD a banner to Cantina stage
cantina.executeBefore(function () {
  engine.showBanner(`Welcome to Cantina`)
  console.log('Where you gather intel');
  console.log('')
})

//Add question to Cantina Stage
cantina.addQuestion({
  type: 'list',
  message: 'Do you want to perform a Jedi mind trick or find vulnerabilities?',
  options: ['Mind Trick', 'Vulnerabilities'],
  action: function(answer) {
    if(answer === 'Mind Trick') {
      console.log('Nice! You decided to perform a ' + answer)
      console.log('')
      fear += 5;
      bountyValue -= 10;
      forcePower -= Math.ceil(Math.random() * 10)
      console.log(`The current value of bounty value: ${bountyValue}`);
    } 
    if(answer === 'Vulnerabilities' && fear < 50) {
      console.log('Great! You decided to find ' + answer)
      console.log('')
      fear += 5;
      bountyValue += 10;
      vulnerabilitiesNum = Math.ceil(Math.random() * 10);
      vulnerabilities += vulnerabilitiesNum   
      console.log(`You found ${vulnerabilitiesNum} vulnerabilities`)
      console.log(`The current value of vulnerabilties: ${vulnerabilities}`);
      console.log(`The current value of bounty value: ${bountyValue}`);
    } else if(answer === 'Vulnerabilities' && fear >= 50) {
      console.log('Great! You decided to find ' + answer)
      console.log('')
      fear += 5;
      bountyValue += 10;
      vulnerabilitiesNum = Math.ceil(Math.random() * 4);
      vulnerabilities += vulnerabilitiesNum      
      console.log(`You found ${vulnerabilitiesNum} vulnerabilities`)
      console.log(`The current value of vulnerabilties: ${vulnerabilities}`);
      console.log(`The current value of bounty value: ${bountyValue}`);
    }
  }
});


// Show a message after the player leave the Cantina
cantina.executeAfter(function() {
  console.log('')
  console.log('Leaving Cantina...')
  console.log(`The current value of fear: ${fear}`);
  if(fear >= 70) {
    jediKnight = true;
    console.log('Congratulations! You became a Jedi Knight! Jedi Training Stage is unlocked.')
  }
  if(fear >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('You have entered to the dark side of the force.TRY AGAIN.')
    engine.quit()
  };
  if(bountyValue >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('Your Bounty value reached 100.TRY AGAIN.')
    engine.quit()
  }
})

/*
  * AHCH-TO
*/
var ahch = engine.create({
  type: 'stage',
  name: 'Ahch-To'
});

//Add a banner to Ahch-To Stage
ahch.executeBefore(function() {
  engine.showBanner(`Welcome to Ahch-To`)
  console.log('Where you can face your fears')
  console.log('')
});

//Add Questions to Ahch-To Stage
ahch.addQuestion({
  type: 'input',
  message: 'How many hours do you want to spend in the Mirror Cave?',
  validator: function(answer) {
    if(answer <= 0 || answer > 8) {
      return 'You can only stay here up to 8 hours!'
    }
  },
  action: function(answer) {
    fear += 5;
    for(var i = 1; i <= answer; i++) {
      fear -= 2;
      forcePower -= 2;
    }
    console.log(`You spent ${answer} hours in the Mirror Cave.`);
  }
});

// Show a message after the player leave the Ahch-To
ahch.executeAfter(function() {
  console.log('')
  console.log('Leaving Ahch-To...')
  console.log(`The current value of fear: ${fear}`);
  console.log(`The current value of bounty value: ${bountyValue}`);
  if(fear >= 70) {
    jediKnight = true;
    console.log('Congratulations! You became a Jedi Knight!! Jedi Training Stage is unlocked')
  }
  if(fear >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('You have entered to the dark side of the force.TRY AGAIN.')
    engine.quit()
  };
  if(bountyValue >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('Your Bounty value reached 100.TRY AGAIN.')
    engine.quit()
  }
})

/*
  * Jedi Training
*/

var training = engine.create({
  type: 'stage',
  name: 'Jedi Training'
});

//Abort the Jedi Training if the player isn't a Jedi Knight
training.executeBefore(function() {
  if(!jediKnight) {
    console.log('You are not allowed to enter this stage.Try to be a Jedi Knight to explore this stage.');
    return false;
  } 
  engine.showBanner(`Welcome to the Jedi Training`)
  console.log('Where you learn techniques');
  console.log('')
});

//Add a question to Jedi Trainig Stage
training.addQuestion({
  type: 'confirm',
  message: 'Do you want to learn new techniques?',
  action: function(answer) {
    if(answer){
      fear += 5;
      for(var i = 0; i < ancientTexts.length; i++) {
        var texts = ancientTexts[i].technique.split('□').join('');
        if((texts.length >= 10 && texts.length <= 11) && texts.includes(' ')) {
          console.log(`New Technique acquired: ${texts}`);
          techniquesKnown = true
        }
        
      };
    } else {
      console.log('')
      console.log(`Are you sure you don\'t want to learn new techniques? ${jediName}, you need to know 2 techniques to fight against the Sith Lord!`) 
    }
  }
});

// Show a message after the player leave the Jedi Training
training.executeAfter(function() {
  console.log('')
  console.log('Leaving Jedi Training...')
  console.log(`The current value of fear: ${fear}`);
  console.log(`The current value of bounty value: ${bountyValue}`);
  if(fear >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('You have entered to the dark side of the force.TRY AGAIN.')
    engine.quit()
  };
  if(bountyValue >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('Your Bounty value reached 100.TRY AGAIN.')
    engine.quit()
  }
  
})


/*
  * Star Destroyer
*/

var star = engine.create({
  type: 'stage',
  name: 'Star Destroyer'
});


//Abort the Star Destroyer if the player doesn't know 2 techniques and hasn't found at least 15 vulnerabilities
star.executeBefore(function() {
  if(vulnerabilities < 15 || !techniquesKnown){
    console.log('You are not allowed to get in this stage. You need to found at least 15 vulnerabilities and know 2 techniques')
    return false
  }
  engine.showBanner(`Welcome to Star Destroyer`)
  console.log('Where you\'ll fight the Sith Lord');
  console.log('')
});


//Add questions to Star Destroyer Stage
star.addQuestion({
  type: 'list',
  message: 'Choose your combat action: Attack or Counter?',
  options: ['Attack', 'Counter'],
  action: function(answer) {
    if(answer === 'Attack') {
      fear += 5
      hitpoints -= 15;
      sithLord.hitpoints -= 10
      sithLord.counterImmune = false;
    }  
    if(answer === 'Counter' && !sithLord.counterImmune) {
      fear += 5      
      sithLord.hitpoints -= 20;
      sithLord.counterImmune = true
    }else if(answer === 'Counter' && sithLord.counterImmune) {
      fear += 5;
      hitpoints -= 10;
      sithLord.counterImmune = false;
      
    }    
  }
})

//Display the hitpoints of player and sith lord
star.executeAfter(function() {
  if(hitpoints > 0 || sithLord.hitpoints > 0) {
      console.log('')
      console.log(`${jediName} points: ${hitpoints}`);
      console.log(`${sithLord.name} points: ${sithLord.hitpoints}`)
    console.log('')
    } 
  if(hitpoints <= 0) {
      engine.showBanner('YOU LOST THE GAME')
      console.log('')
      console.log('YOU DISSAPOINTED THE ENTIRE GALAXY! TRY AGAIN.');
    engine.quit()
    } 
  if(sithLord.hitpoints <= 0) {
      engine.showBanner('YOU WIN');
      console.log(`Congratulations ${jediName}! You are the chosen one!`)
      console.log('')
      console.log('The galaxy will be forever grateful.')
      engine.quit()
    }
  if(fear >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('You have entered to the dark side of the force.TRY AGAIN.')
    engine.quit()
  };
  if(bountyValue >= 100) {
    engine.showBanner('YOU LOST THE GAME')
    console.log('Your Bounty value reached 100.TRY AGAIN.')
    engine.quit()
  }
})

//Add a quit Option
var quit = engine.create({
  type: 'stage',
  name: 'Quit'
})

quit.executeBefore(function() {
  engine.quit();
})


engine.run()


