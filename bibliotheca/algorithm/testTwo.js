function findLongestWord(str) {
    var strSplit = str.split(' ');
    var longestWord = 0;
    for(var i = 0; i < strSplit.length; i++){
      if(strSplit[i].length > longestWord){
        longestWord = strSplit[i].length;
      }
    }
    
    return ''.concat(strSplit[i],':',longestWord,' character');
  }
  
  let sentence = findLongestWord('Saya sangat senang mengerjakan soal algoritma');
  
  console.log(sentence);