var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: String,
})
mongoose.model('users', usersSchema);

// //Create user Schema
// var userSchema = mongoose.Schema({
//     name: String,
//     age: Number
// });
//
// var app = express();
//
// //Try mongoose
// var User = mongoose.model('user', userSchema);
// var silence = new User({ name: 'Silence' });
//
// app.get('/user', function(req, res) {
//   User.find(function(err, user) {
//     res.send("user");
//   })
// })
