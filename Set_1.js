// QUICK SIDE NOTE
// I RECALL YOU TOLD US TO USE MONKEY PATCHING WITH CAUTION
// I JUST WANTED TO PRACTICE DOING IT FOR THESE SIMPLE EXERCISES
// ALSO, I JUST REALLY LIKE ONE-LINERS AND CHAINING

// I could loop through the string in reverse, but I'm so used to loops already
// I wanted to learn JavaScript-specific functions
String.prototype.reverse = function() { return this.split("").reverse().join("") }

// Removes all non-letter and non-space characters
String.prototype.clean = function() { return this.replace(/[^a-zA-Z ]/gi, '').toLowerCase() }

String.prototype.isPalindrome = function() { return this.clean().replace(/[ ]/gi, '') === this.clean().replace(/[ ]/gi, '').reverse() }

String.prototype.capitalizeLetters = function()
{
  fixed = ""

  const words = this.clean().split(" ")

  for (word in words)
    fixed += words[word][0].toUpperCase() + words[word].slice(1, words[word].length) + " "
  
  return fixed.trim()
}

String.prototype.maxCharacter = function()
{
  const cleaned = this.clean()

  const totals = new Map()

  for (property in cleaned)
    if (totals.get(cleaned[property]))
      totals.set(cleaned[property], totals.get(cleaned[property]) + 1)
    else
      totals.set(cleaned[property], 1)
  //return totals // TODO: Research why there are function references
  // UPDATE: I've determined monkey patching influences those entries. Still researching WHY, though
  return [...totals.entries()].reduce((a, b) => b[1] > a[1] ? b : a)[0]
}

Number.prototype.reverse = function() { return Number(this.toString().reverse()) }

// I realize one-line solutions aren't the easiest to read
// I, again, just wanted to have some fun with this and see how compact I could accomplish this
const fizzbuzz = () => [...Array(101).keys()].forEach(i => console.log((i % 3) === 0 && (i % 5) === 0 ? 'FIZZBUZZ' : (i % 3) === 0 ? 'FIZZ' : (i % 5) === 0 ? 'BUZZ' : i))

console.log("Do geese see God?".reverse())
console.log("Do geese see God?".isPalindrome())
console.log("Do geese see God?".capitalizeLetters())
console.log("Do geese see God?".maxCharacter())
console.log((1.9).reverse())

fizzbuzz()
