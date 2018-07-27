
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

const adminEmail = 'admin@bonobi.ch';

Meteor.methods({
  'isAdmin': function() {
    const user = Meteor.users.findOne(this.userId);
    if(user && user.emails[0].address == adminEmail){
      return true;
    }
    return false;
  }
});

// publications
Meteor.startup(() => {
  const collections = Mongo.Collection.getAll();
  collections.forEach(collection => {
    Meteor.publish('admin_'+collection.name, function() {
      const user = Meteor.users.findOne(this.userId);
      if(user && user.emails[0].address == adminEmail){
        return collection.instance.find({});
      }
    })
  });
});
