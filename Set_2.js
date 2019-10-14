// QUICK SIDE NOTE
// I RECALL YOU TOLD US TO USE MONKEY PATCHING WITH CAUTION
// I JUST WANTED TO PRACTICE DOING IT FOR THESE SIMPLE EXERCISES
// ALSO, I JUST REALLY LIKE ONE-LINERS AND CHAINING

// I'm glad I practiced Monkey Patching, because I noticed some odd
// behavior that will definitely make me think twice about using it in the future.
// You'll notice some functions make sure the element isn't a function reference first.
// I'm still researching why those get pushed onto `this`.

Object.prototype.isFunction = function ()
{
  return typeof this === "function"
}

// Removes all non-letter characters
String.prototype.clean = function() { return this.replace(/[^a-zA-Z]/gi, '').toLowerCase() }

// This one goes beyond what the original challenge asked for
// This function flattens arrays of arbitrary depth
Array.prototype.flatten = function ()
{
  result = []
  
  for (i in this)
    if (!Array.isArray(this[i]) && !this[i].isFunction())
      result.push(this[i])//console.log(`why: ${this[i]}`)
    else
      if (!this[i].isFunction())
        result = result.concat(this[i].flatten())//console.log(`huh: ${this[i]}`)
  
  return result
}

Array.prototype.chunk = function (x)
{
  n = 0
  
  chunk = []
  result = []

  for (i = 0; i < this.length; i++)
  {
    if (n++ < x)
      chunk.push(this[i])
    else
    {
      result.push(chunk)
      n = 1
      chunk = [this[i]]
    }
  }

  if (chunk !== [])
    result.push(chunk)
  
  return result
}

// Used to appropriately handle the list of longest words.
// If the new word is the same length as the previous longest words, it's pushed.
// Otherwise, we found one longer than previous findings, so it should be the only result.
// This is what originally caused the "array reference" question
function addEntry(result, entry)
{
  if (result[0][0] === entry[0])
    result.push(entry)
  else
  {
    result.length = 0
    result.push(entry)
  }
}

String.prototype.longestWord = function ()
{
  words = this.split(' ')
  longest = [[0, '']]

  for (let i in words)
    if (words[i].length >= longest[0][0])
      addEntry(longest, [words[i].length, words[i]])

  return longest
}

String.prototype.isAnagramOf = function (word)
{
  word1 = this.clean()
  word2 = word.clean()
  
  if (word1.length !== word2.length)
    return false
  
  for (i in word1)
    if (!word1[i].isFunction() && !word2.includes(word1[i]))
      return false
    else
      word2 = word2.replace(word1[i], '')
  
  return true
}

String.prototype.letterChanges = function()
{
  result = ''

  for (i in this)
  {
    if (!this[i].isFunction())
      switch (this[i])
      {
        case ' ': result += ' '
          break
        case 'z': result += 'A'
          break
        case 'd':
        case 'h':
        case 'n':
        case 't': result += String.fromCharCode(this.charCodeAt(i) - 31)
          break
        default: result += String.fromCharCode(this.charCodeAt(i) + 1)
          break
      }
  }

  return result
}

console.log("sample words to verify".longestWord())
console.log([1, 2, 3, 4, 5, 6, 7].chunk(3))
console.log([0, [1, 2], 3, 4, [[5, 6], [7, 8]], [9]].flatten())
console.log("Dormitory".isAnagramOf("dirty room"))
console.log('hello there'.letterChanges())
