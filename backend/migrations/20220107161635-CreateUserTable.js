'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {

  db.createTable('users', {

    id: {
      type: 'int',
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: 'string',
      length: 64,
      notNull: true,
    },
    email: {
      type: 'string',
      length: 64,
      notNull: true,
    },
    password: {
      type: 'string',
      length: 64,
      notNull: true,
    },
    isAdmin: {
      type: 'boolean',
      notNull: true,
      defaultValue: false
    },
    isVerified: {
      type: 'boolean',
      notNull: true,
      defaultValue: false
    },
    verificationCode: {
      type: 'string',
      length: 51,
      notNull: true,
      defaultValue: false
    },
  }, callback);

};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};

exports._meta = {
  "version": 1
};
