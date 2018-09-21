'use strict';

const uuid = require('uuid/v1');

class Note {
  constructor(title, content) {
    this.id = uuid();
    this.timestamp = new Date();

    this.title = title;
    this.content = content;
  }
}

module.exports = Note;
