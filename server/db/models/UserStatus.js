'use strict';

const bookshelf = require('./bookshelf');

class UserStatus extends bookshelf.Model {
  get tableName() {
    return 'user_statuses';
  }

  get hasTimestamps() {
    return true;
  }

  items() {
    return this.hasMany('Item', 'user_status_id');
  }
}

module.exports = bookshelf.model('UserStatus', UserStatus);
