import React from 'react'

const getMinPower = (arr) => {
    let min = 1000;
    let minPlayerKey;
    arr.map((ele, index) => {
        if (ele.total < min) {
            minPlayerKey = index;
            min = ele.total;
        }
    });
    return minPlayerKey

}
const getMaxPower = (arr) => {
    let max = 0;
    let maxPlayerKey = -1;
    arr.map((ele, index) => {
        if (ele.total > max) {
            maxPlayerKey = index;
            max = ele.total;
        }
    });
    return maxPlayerKey

}
export const playersFilter = (players) => {
    let playersFilterd = [];
    players.map((player, index) => {
        if (player.status === 1) {
            playersFilterd.push(player);
        }
    })
    return playersFilterd;
}
export const teamBuilderMinMax = (players, nTeam, teamSize) => {
    nTeam = parseInt(nTeam);
    teamSize = parseInt(teamSize);
    let playersFilterd = playersFilter(players);
    let teams = [[], [], [], [], []];
    const nPlayers = playersFilterd.length;
    let allPlayers = playersFilterd.slice();
    // console.log(playersFilterd);
    let minSwitch = true;
    for (let p = 0; p < nPlayers; p++) {
        for (let t = 0; t < nTeam; t++) {
            let len = allPlayers.length;
            if (len > 0 && teams[t].length < teamSize) {

                if (minSwitch) {
                    let minK = getMinPower(allPlayers);
                    teams[t].push(allPlayers[minK]);
                    allPlayers.splice(minK, 1)

                } else {
                    let maxK = getMaxPower(allPlayers);
                    teams[t].push(allPlayers[maxK]);
                    allPlayers.splice(maxK, 1)
                }
            }
        }
        minSwitch ? minSwitch = false : minSwitch = true;
    }

    // console.log(teams);
    return teams;
}


export const teamTotalPower = (team, teamSize) => {
    // const teamSize = team.length;
    let totalPower = 0;
    // console.log("team");
    // console.log(team);
    team.map((player, index) => {
        totalPower += player.total;
    });
    return parseInt(totalPower / teamSize);
}


// ==================
const randomPickObject = function (obj) {
    let keys = Object.keys(obj);
    // return obj[keys[keys.length * Math.random() << 0]];
    return keys[keys.length * Math.random() << 0];
};
const randomPickArray = function (arr) {
    const random = Math.floor(Math.random() * arr.length);
    return random;
};
export const teamBuilderRandom = (players, nTeam, teamSize) => {
    nTeam = parseInt(nTeam);
    teamSize = parseInt(teamSize);
    let playersFilterd = playersFilter(players);
    let teams = [[], [], [], [], []];
    const nPlayers = playersFilterd.length;
    let allPlayers = playersFilterd.slice();
    for (let p = 0; p < nPlayers; p++) {
        for (let t = 0; t < nTeam; t++) {
            let len = allPlayers.length;
            if (len > 0 && teams[t].length < teamSize) {
                let rKey = randomPickArray(allPlayers);
                teams[t].push(allPlayers[rKey]);
                allPlayers.splice(rKey, 1)
            }
        }
    }

    // console.log(teams);
    return teams;
}
// Captains 
const removeCaptains = (players, captainsId) => {
    let newPlayers = [];
    let captainsData = [];
    const nPlayers = players.length;
    // console.log(["captains", captainsId]);
    for (let p = 0; p < nPlayers; p++) {

        if (!captainsId.includes(players[p].id)) {
            newPlayers.push(players[p]);
        } else {
            captainsData.push(players[p]);
        }
    }

    return [newPlayers, captainsData];
}
export const teamBuilderCaptainsRandom = (players, captainsId, nTeam, teamSize) => {
    teamSize = parseInt(teamSize);
    let playersFilterd = playersFilter(players);
    let teams = [[], [], [], [], []];
    let [newPlayers, captainsData] = removeCaptains(playersFilterd, captainsId)
    nTeam = captainsData.length; //parseInt(nTeam);
    // add captains
    // for (let index = 0; index < captainsData.length; index++) {
    for (let index = 0; index < nTeam; index++) {
        teams[index].push(captainsData[index]);
    }
    // console.log(["newPlayers", newPlayers]);
    const nPlayers = newPlayers.length;
    let allPlayers = newPlayers.slice();
    for (let p = 0; p < nPlayers; p++) {
        for (let t = 0; t < nTeam; t++) {
            let len = allPlayers.length;
            if (len > 0 && teams[t].length < teamSize) {
                let rKey = randomPickArray(allPlayers);
                teams[t].push(allPlayers[rKey]);
                allPlayers.splice(rKey, 1)
            }
        }
    }

    // console.log(teams);
    return teams;
}

// ==========================================
// function shuffle(array) {
const shuffle = (array) => {
    let shuffleArray = array.slice();
    for (let i = shuffleArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
    }
    return shuffleArray
}
// def teamsScore(teamA, teamB, teamC):
// a = sum(teamA)
// b = sum(teamB)
// c = sum(teamC)
// score = abs(a - b) + abs(a - c) + abs(b - c)
// return score
const teamsScore = (teams, nTeam, teamSize) => {
    let score = 0;
    for (let i = 0; i < nTeam; i++) {
        for (let j = 0; j < nTeam; j++) {
            if (j > i) {
                score += Math.abs(teamTotal(teams[i], teamSize) - teamTotal(teams[j], teamSize));
            }
        }
    }
    return score;
}

const teamEntropy = (team) => {
    let entropy = 0;
    // if (team.length > 1) {
    for (let i = 0; i < team.length; i++) {
        for (let j = 0; j < team.length; j++) {
            if (j > i) {
                entropy += Math.abs(team[i].total - team[j].total);
            }
        }
    }
    // }
    return entropy;
}
// def teamsOVR(a, b, c):
//     # score = abs(a - b) + abs(a - c) + abs(b - c)
// score = max(a, b, c) - min(a, b, c)
// return score
const teamsEntropy = (teams, nTeam) => {
    let entropy = 0;
    for (let i = 0; i < nTeam; i++) {
        for (let j = 0; j < nTeam; j++) {
            if (j > i) {
                entropy += Math.abs(teamEntropy(teams[i]) - teamEntropy(teams[j]));
            }
        }
    }
    return entropy;
}

const totalTeamsEntropy = (teams, nTeam) => {
    let entropy = 0;
    for (let i = 0; i < nTeam; i++) {
        entropy += teamEntropy(teams[i]);
    }
    return entropy;
}




function comparePlayers(a, b) {
    if (a.total < b.total) {
        return -1;
    }
    if (a.total > b.total) {
        return 1;
    }
    return 0;
}
function compareTeams(a, b) {
    let l = a.length;
    if (a.length > 0 && b.length > 0) {
        if (a[l - 1].total < b[l - 1].total) {
            return -1;
        }
        if (a[l - 1].total > b[l - 1].total) {
            return 1;
        }
    }
    return 0;
}
const sortTeams = (teams, nTeam) => {
    let newTeams = teams.slice();
    for (let index = 0; index < nTeam; index++) {
        newTeams[index] = newTeams[index].sort(comparePlayers);
    }
    // console.log("newTeams");
    // console.log(newTeams);
    newTeams.sort(compareTeams);
    return newTeams;

}
const teamTotal = (team, teamSize) => {
    // const teamSize = team.length;
    let totalPower = 0;
    // console.log("team");
    // console.log(team);
    team.map((player, index) => {
        totalPower += player.total;
    });
    return totalPower;
}
// def teamScore(team):
// score = 0
// for i in range(len(team)):
//     for j in range(len(team)):
//         if j > i:
//             score += abs(team[i] - team[j])
// return score

// def teamsOVR(a, b, c):
// score = abs(a - b) + abs(a - c) + abs(b - c)
// return score
// const teamsOVR = (teams, nTeam, teamSize) => {
//     let tOVR = 0;
//     for (let i = 0; i < nTeam; i++) {
//         for (let j = 0; j < nTeam; j++) {
//             if (j > i) {
//                 tOVR += Math.abs(teamEntropy(teams[i], teamSize) - teamEntropy(teams[j], teamSize));;
//             }
//         }
//     }
//     return tOVR;
// }
const genRandomTeams = (players, nTeam, teamSize) => {
    let minScore = 1000000;
    let myScore = 1000000;
    let score = 0;
    let suggZeroTeams = [];
    // let lowerTeams;
    let ll = 2000000;
    // let shufflePlayers = shuffle(players);
    for (let index = 0; index < ll; index++) {
        // shufflePlayers = shuffle(shufflePlayers.slice())
        let teams = teamBuilderRandom(players, nTeam, teamSize)

        score = teamsScore(teams, nTeam, teamSize);
        if (score <= minScore) {

            minScore = score;
            // lowerTeams = teams;
            let tOVR = teamsEntropy(teams, nTeam)
            let tte = totalTeamsEntropy(teams, nTeam)
            let testMyScore = (score * score) + (tOVR / 100) + (tte / 10000)
            if (testMyScore <= myScore) {
                myScore = testMyScore;
                suggZeroTeams.push(sortTeams(teams, nTeam));
            }
        }
    }

    return suggZeroTeams;
}
function compareEntropyTeams(a, b) {
    let nTeam = a.length;
    let teamSize = a[0].length;
    if (teamsEntropy(a, nTeam, teamSize) < teamsEntropy(b, nTeam, teamSize)) {
        return -1;
    }
    if (teamsEntropy(a, nTeam, teamSize) > teamsEntropy(b, nTeam, teamSize)) {
        return 1;
    }
    return 0;
}
export const teamBuilder = (players, nTeam, teamSize) => {
    let randomTeams = genRandomTeams(players, nTeam, teamSize);
    // randomTeams.sort(compareEntropyTeams);
    // console.log("randomTeams");
    // console.log(randomTeams.length);
    // console.log("teamsEntropy");
    // console.log(teamsEntropy(randomTeams[randomTeams.length - 1], nTeam, teamSize));
    // // // console.log(teamsEntropy(randomTeams[0], nTeam, teamSize));
    // console.log(teamsScore(randomTeams[randomTeams.length - 1], nTeam, teamSize));
    // console.log("teams info");
    // randomTeams[randomTeams.length - 1].map((team, index) => {
    //     console.log(team);
    //     console.log([teamTotal(team, teamSize), teamEntropy(team)])
    // })
    return randomTeams[randomTeams.length - 1];

};

// ====================================
export const getTeamName = (team, captainsId) => {
    let [newPlayers, captains] = removeCaptains(team, captainsId)
    // console.log(["getTeamName", newPlayers, captains]);
    if (captains.length > 0) {

        return captains[0].name
    } else {
        let maxPlayerKey = getMaxPower(team);
        if (maxPlayerKey > -1) {
            return team[maxPlayerKey].name
        } else {
            return "X"
        }

    }

}

// ====================================
export const getPlayerInfo = (players, playerId) => {
    const nPlayers = players.length;
    for (let p = 0; p < nPlayers; p++) {
        if (players[p].id === playerId) {
            return players[p]
        }
    }
}
const teams = () => {



    return (
        <div>teams</div>
    )
}

export default teams