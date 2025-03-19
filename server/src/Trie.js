//Referenced from https://javascripttoday.com/blog/trie-data-structure/#google_vignette

class TrieNode {
  constructor() {
    this.children = {}; // To store child nodes
    this.isEndOfWord = false; // To mark the end of a valid word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word into the Trie
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // Search for a word in the Trie
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  // Check if a prefix exists in the Trie
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }

  // Get n suggestions that start with a given prefix
  getSuggestions(prefix, n) {
    let node = this.root;

    // Traverse the Trie to the end of the prefix
    for (let char of prefix) {
      if (!node.children[char]) {
        return []; // Return empty list if prefix not found
      }
      node = node.children[char];
    }

    // DFS to find all words with the given prefix
    const suggestions = [];
    const dfs = (currentNode, currentPrefix) => {
      if (suggestions.length >= n) return; // Stop when we have enough suggestions

      if (currentNode.isEndOfWord) {
        suggestions.push(currentPrefix);
      }

      for (let char in currentNode.children) {
        dfs(currentNode.children[char], currentPrefix + char);
      }
    };

    dfs(node, prefix);
    return suggestions;
  }

  // Delete a word from the Trie
  delete(word) {
    const deleteHelper = (node, word, index) => {
      if (index === word.length) {
        if (!node.isEndOfWord) {
          return false; // Word not found
        }
        node.isEndOfWord = false;
        return Object.keys(node.children).length === 0; // Delete if node has no children
      }

      const char = word[index];
      if (!node.children[char]) {
        return false; // Word not found
      }

      const shouldDeleteChild = deleteHelper(
        node.children[char],
        word,
        index + 1
      );

      if (shouldDeleteChild) {
        delete node.children[char];
        return Object.keys(node.children).length === 0 && !node.isEndOfWord;
      }

      return false;
    };

    deleteHelper(this.root, word, 0);
  }
}

module.exports = Trie;
