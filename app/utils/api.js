var axios = require('axios');

var id = "ac2665a586f287c19366";
var sec = "a0c6a6f93585ffd2977a7ea6ac3b8fed8b9ab1ea";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile (username) {
    return axios.get('http://api.github.com/users/'+ username + params)
    .then(function(user){
        return user.data;
    });
}

function getRepos (username) {
    return axios.get('http://api.github.com/users/'+ username + '/repos' + params + '&per_page=100&token= f2fae4f6bfe696d2124fccbddd167cf8d5d5ed84');
}

function getStarCount (repos) {
    return repos.data.reduce(function (count, repo) {
        return count + repo.stargazers_count;
    }, 0)
}

function calculateScore (profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError (error) {
    console.warn(error);
    return null;
}

function getUserData (player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(data) {
        var profile = data[0]; // Axios.all() does multiple promises and returns data
        var repos = data[1]; // Data[0] contains first promise response and so on
        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    });
}

function sortPlayers (players) {
    return players.sort(function (a,b) {
        return b.score - a.score;
    });
}

module.exports = {
    battle: function(players) { // Each one in map below is a promise as seen above
        return axios.all(players.map(getUserData)) // Each of players will be mapped to whatever getUserData returns
        .then(sortPlayers)
        .catch(handleError)
    },
    fetchPopularRepos: function (language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + 
    '&sort=starts&order=desc&type=Repositories');

    return axios.get(encodedURI)
        .then(function(response) {
            return response.data.items;
        });
    }
}