(function () {

  let _players_ = [];
  let _finished_ = [];

  function Player(obj) {
    this.name = obj.name || randomName();
    this.power = obj.power || 0;
    this.pts = obj.pts || 0;
    this.newRoll = obj.newRoll || randNum(5, 50);
    this.rolls = obj.rolls || [];
    this.allPts = obj.pts || [];
    this.prize = 0;
    this.rank = 0;
  };

  Player.prototype.changeRolls = function() {
    var newRoll = randNum(1, this.newRoll);
    this.rolls.push(newRoll);
    if(this.rolls.length === 4) {
      this.rolls.pop();
    }
    this.power = sum(this.rolls);
  }

  Player.prototype.bankPts = function() {
    this.allPts.push(this.prize);
    this.prize = 0;
    this.pts = sum(this.allPts);
  }

  var randNum = function(min, max) {
      return Math.floor(Math.random()*(max-min+1)+min);
  };

  var sum = function(array) {
    console.log('array', array);
    var result = array.reduce(function(a, b) {
      return a + b;
    }, 0);
    console.log('result', result);
    return result;
  }

  var randomName = function() {
    const chars = randNum(3,8);
    const pattern = randNum(0,2);
    let word;

    const vowels = ['a','a','a','a','a','a','a','a','a','a',
                 'e','e','e','e','e','e','e','e','e','e',
                 'o','o','o','o','o','o','o','o','o','o',
                 'i','i','i','i','i','u','u','u','u','u',
                 'ae','ai','au','aa','ea','ee','ei','eu','ia','ie',
                 'io','ua','ue','ui','uo','eau','oa','oi','ou','ea'
                ];

    const first_conson = ['B','C','D','F','G','H','J','K','L','M',
                       'N','N','P','Q','R','S','T','V','W','X',
                       'Y','Z','Ch','Sh','Ph','Th','Sh','Str','Sk','Sp',
                       'Kr','Kl','Qu','Fr','Bl','Pl','Tr','Tw','Dr','Br',
                       'Gh','Gr','Gl','Pr','Zh','Fl','Cl','Cr','Chr','Spr',
                       'R','S','T','L','N','R','S','T','L','N'
                      ];

    const other_conson = ['b','c','d','f','g','h','j','k','l','m',
                       'n','n','p','q','r','s','t','u','v','x',
                       'y','z','ch','sh','ph','th','st','str','sk','sp',
                       'ss','tt','qu','mm','nn','gg','tr','rt','lt','ft',
                       'gh','rg','dd','rp','ll','ck','rf','cr','chr','spr',
                       'r','s','t','l','n','r','s','t','l','n'
                      ];

    if(pattern < 2 ) {
    word = first_conson[randNum(0,59)] +
           vowels[randNum(0,59)] +
           other_conson[randNum(0,59)] +
           vowels[randNum(0,59)] +
           other_conson[randNum(0,59)];

    } else {
    word = vowels[randNum(0,59)] +
           other_conson[randNum(0,59)] +
           vowels[randNum(0,59)] +
           other_conson[randNum(0,59)] +
           vowels[randNum(0,59)];

    word = capitalise(word);
    }

    word = word.substr(0,chars);

    return word;
  };

  var shuffle = function(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
  }

  var capitalise = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  var fetchData = function(next) {
    var data = localStorage.getItem('players');

    if(data) {
      console.log('data loaded');
      var parsed = JSON.parse(data);
      _players_ = parsed.map(function(item) {
        return new Player(item);
      })
      console.log(_players_);
      next();
    } else {
      console.log('data created');
      createPlayers(64);
      saveData(_players_, next);
    }
  }

  var saveData = function(next) {
    localStorage.setItem('players', JSON.stringify(_players_));
    next();
  }

  var createPlayers = function(n) {
    var newPlayers = [];
    for(var i = 0; i < n; i += 1) {
      _players_.push(new Player({}));
    }
    _players_.forEach(function(player){
      player.changeRolls();
    });
  }

  var sortForBracketPosition = function() {
    var sortedPlayers =
    [
      _players_[0],
      _players_[63],
      _players_[31],
      _players_[32],
      _players_[16],
      _players_[57],
      _players_[15],
      _players_[48],
      _players_[8],
      _players_[55],
      _players_[23],
      _players_[40],
      _players_[24],
      _players_[39],
      _players_[7],
      _players_[56],
      _players_[3],
      _players_[60],
      _players_[28],
      _players_[35],
      _players_[19],
      _players_[44],
      _players_[12],
      _players_[51],
      _players_[11],
      _players_[52],
      _players_[20],
      _players_[43],
      _players_[27],
      _players_[36],
      _players_[4],
      _players_[59],
      _players_[1],
      _players_[62],
      _players_[30],
      _players_[33],
      _players_[17],
      _players_[46],
      _players_[14],
      _players_[49],
      _players_[9],
      _players_[54],
      _players_[22],
      _players_[41],
      _players_[25],
      _players_[38],
      _players_[6],
      _players_[57],
      _players_[2],
      _players_[61],
      _players_[29],
      _players_[34],
      _players_[18],
      _players_[45],
      _players_[13],
      _players_[50],
      _players_[10],
      _players_[53],
      _players_[21],
      _players_[42],
      _players_[26],
      _players_[37],
      _players_[5],
      _players_[58]
    ]

    return sortedPlayers;
  }

  var rankPlayersByCurrentIndex = function() {
    _players_.forEach(function(player, index) {
      player.rank = index + 1;
    })
  }

  var displayPlayers = function(roundName, showPlayers, slots) {
    if(!showPlayers) {
      for(var i = 0; i < slots; i += 1) {
        $('#' + roundName).append('<li>--</li>');
      }
    } else {
      if(roundName !== "rd1") {
        $('#' + roundName).empty()
      }
      _players_.forEach(function(player, index){
        $('#' + roundName).append('<li data-index="' + index + '"><strong>' + player.rank + "</strong> " + player.name + '</li>');
      })
    }
  }

  var playRound = function(rd) {
    //get results first
    const matches = _players_.length / 2;
    console.log('matches', matches);
    console.log('players', _players_);
    const winners = [];

    for(let match = 1, pIndex = 0; match <= matches; match += 1, pIndex += 2) {
      setTimeout(() => {
        const a = _players_[pIndex];
        const b = _players_[pIndex + 1];
        const result = getResult(a, b);
        //winners.push(result.winner);
        _finished_.push(result.loser);

        //get the elements
        const $list = $('#rd' + rd);
        const $rowA = $($list.children().get(pIndex));
        const $rowB = $($list.children().get(pIndex + 1));

        //turn them colors
        if(result.winner === a) {
          $rowA.css('color', '#0099cc');
        } else {
          $rowB.css('color', '#0099cc');
        }
      }, 1000 * match);
    }

    setTimeout(() => {
      loadNextRound(rd + 1);
    }, 1000 * (matches + 1))
  }

  var loadNextRound = function(rd) {
    //remove all finished from the players list

    _players_.forEach((player, index) => {
      if (_finished_.indexOf(player) > -1) {
        _players_.splice(index, 1);
      }
    })

    displayPlayers("rd" + rd, true);
  }

  var getResult = function(a, b) {
    const aRoll = a.power * Math.random();
    const bRoll = b.power * Math.random();
    const winner = aRoll > bRoll ? a : b;
    const loser = winner === a ? b : b;
    return {
      winner: winner,
      loser: loser
    };
  }

  //////////////////////////////////////////////////////////
  // on load, fetch data and display game
  //////////////////////////////////////////////////////////

  fetchData(function() {
    _players_.sort(function(a, b) {
      return b.power - a.power;
    });

    _players_.sort(function(a, b) {
      return b.pts - a.pts;
    });

    rankPlayersByCurrentIndex();
    _players_ = sortForBracketPosition();

    displayPlayers("rd1", true);
    displayPlayers("rd2", false, 32);
    displayPlayers("rd3", false, 16);
    displayPlayers("rd4", false, 8);
    displayPlayers("rd5", false, 4);
    displayPlayers("rd6", false, 2);
    displayPlayers("rd7", false, 1);
  });

  $('.go-btn').on('click', (e) => {
    const rd = $(e.target).attr('data-rd') * 1;
    console.log('rd:', rd);
    playRound(rd);
  })

})();
