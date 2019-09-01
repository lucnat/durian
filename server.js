
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';

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
  },

  'totalAmountDocs': function(collectionName) {
    console.log(Mongo.Collection.get(collectionName).find().count())
    return Mongo.Collection.get(collectionName).find().count()
  }
});


Meteor.startup(() => {

// // publications
//   const collections = Mongo.Collection.getAll();
//   collections.forEach(collection => {
//     Meteor.publish('admin_'+collection.name, function() {
//       const user = Meteor.users.findOne(this.userId);
//       if(user && user.profile && user.profile.isAdmin){
//         return collection.instance.find({}, {limit: 1000});
//       }
//     })
//   });

  // publications
  const collections = Mongo.Collection.getAll();
  collections.forEach(collection => {
    Meteor.publish('durian_'+collection.name, function(limit) {
      const user = Meteor.users.findOne(this.userId);
      if(user && user.profile && user.profile.isAdmin){
        return collection.instance.find({}, {limit: limit});
      }
    })
  });

  

});
