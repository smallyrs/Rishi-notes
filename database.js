const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'notes.json');

// Initialize empty array if file does not exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([]), 'utf8');
}

module.exports = {
  getNotes: () => {
    try {
      return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (e) {
      return [];
    }
  },
  saveNotes: (notes) => {
    fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2), 'utf8');
  }
};
