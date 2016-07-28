//A flag variable so we check if character is selected then we can remove him
flag = 0;

//Template helpers

Template.showingCharacters.helpers({
  'character':function () {
  return Characters.find({},{sort:{CurrentXP:-1}});
  },

  'selectedClass':function () {
    var characterID = this._id;
    var selectedCharacter= Session.get('selectedCharacter');
    if(characterID == selectedCharacter){
      return "selected";
    }


  },

  'showSelectedCharacter':function () {
    var selectedCharacter= Session.get('selectedCharacter');
    return Characters.findOne(selectedCharacter);

  },
  //With characterCount template we return how many characters we have in db
  charactersCount: function() {
    return Characters.find().count()
  }

});




//Template events
Template.showingCharacters.events({


  'click .characterName':function () {
    //We are storing the unique id of database of the clicked item inside a variable
    var characterID = this._id;


    //With session we are setting the character inside selectedCharacter
    Session.set('selectedCharacter',characterID);

    //We get the selectedCharacter and we store it in a variable called selectedCharacter
    var selectedCharacter=Session.get('selectedCharacter');
    flag =1;


  },
  //Give and Lose XP buttons clicks
  'click .give20XP':function () {
    var selectedCharacter=Session.get('selectedCharacter');
    Characters.update(selectedCharacter,{$inc: {CurrentXP:20}});

  },
  'click .give50XP':function () {
    var selectedCharacter=Session.get('selectedCharacter');
    Characters.update(selectedCharacter,{$inc: {CurrentXP:50}});
  },

  'click .Lose20XP':function () {
    var selectedCharacter=Session.get('selectedCharacter');
    Characters.update(selectedCharacter,{$inc:{CurrentXP:-20}});
  },
  'click .Lose50XP':function () {
    var selectedCharacter=Session.get('selectedCharacter');
    Characters.update(selectedCharacter,{$inc:{CurrentXP:-50}});
  },
  
  //Remove Character
  'click .remove':function () {
    if((flag==1)&&confirm('Are you sure you want delete PERMANENTLY selected Character')){
      var selectedCharacter=Session.get('selectedCharacter');
      Characters.remove(selectedCharacter);
    }

  }

});

//Template addCharacterForm
Template.addCharacterForm.events({
  //This is the form will be submitted for adding new character
    'submit form':function (event) {
      //This prevents the browser from refreshing
      event.preventDefault();

      //We will store the values we get from inputs to variables
      var characterNameVar = event.target.Name.value;
      var characterClassVar = event.target.Class.value;
      var characterRaceVar = event.target.Race.value;
      var characterLevelVar = event.target.Level.value;
      var characterCurrentXPVar = Number(event.target.CurrentXP.value);
      var characternextLevelXPVar = Number(event.target.nextLevelXP.value);

      //Now we insert the variables to the value we want
      //and then will will display it in page
      Characters.insert({
        Name:characterNameVar,
        Class:characterClassVar,
        Race:characterRaceVar,
        Level:characterLevelVar,
        CurrentXP:characterCurrentXPVar,
        NeededXP: characternextLevelXPVar

      });


    }

  
});




