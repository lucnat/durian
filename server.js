
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

const adminEmail = 'admin@bonobi.ch';

Meteor.methods({
  'isAdmin': function() {
    const user = Meteor.users.findOne(this.userId);
    if(!user) return "you are not logged in";
    const admin = Meteor.users.findOne({'profile.isAdmin': true});
    if(!admin) {
      // there is no admin yet, so let's make the current user the admin
      console.log('lets make him an admin');
      Meteor.users.update(this.userId, {$set: {'profile.isAdmin': true}});
    }
    return user.profile && user.profile.isAdmin;
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
