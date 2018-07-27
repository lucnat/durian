
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';

Tracker.autorun(() => {
  const collections = Mongo.Collection.getAll();

  collections.forEach(collection => {
    Meteor.subscribe('admin_'+collection.name);
  });
});
