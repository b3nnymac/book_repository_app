/// <reference path="../../../../typings/tsd.d.ts" />
"use strict";
var userModel_1 = require('./userModel');
function userSignin(req, res) {
    var reqUser = req.body;
    userModel_1.User.findOne({ username: reqUser.username }, function (err, user) {
        if (err) {
            req.session['User'] = {};
            res.json({ 'success': false, 'data': null, 'error': err });
        }
        else if (user !== null) {
            if (reqUser.password === user.password) {
                req.session['User'] = {
                    name: user.username,
                };
                var data = {};
                data.username = user.username;
                data.firstname = user.firstname;
                data.lastname = user.lastname;
                data.books = user.books;
                data.messages = user.messages;
                data.todo = user.todo;
                res.json({ 'success': true, 'data': data, 'error': null });
            }
        }
        else {
            req.session['User'] = {};
            res.json({ 'success': false, 'data': null, 'error': 'No User Found!' });
        }
    });
}
exports.userSignin = userSignin;
function userSignup(req, res) {
    var newUser = req.body;
    // newUser.role = 'MEMBER';
    userModel_1.User.findOne({ username: newUser.username }, function (err, user) {
        if (err) {
            res.json({ 'success': false, 'data': null, 'error': err });
        }
        else if (user === null || user === undefined) {
            userModel_1.User.create(newUser, function (err) {
                if (err) {
                    res.json({ 'success': false, 'data': null, 'error': err });
                }
                else {
                    res.json({ 'success': true, 'data': null, 'error': null });
                }
            });
        }
        else if (user.username === newUser.username) {
            res.json({ 'success': false, 'data': null, 'error': 'User Already Exits!' });
        }
    });
}
exports.userSignup = userSignup;
function userLoggedIn(req, res) {
    var username = req.params.id;
    if (req.session['User'] && req.session['User'].name == username) {
        userModel_1.User.findOne({ username: username }, function (err, user) {
            if (err) {
                req.session['User'] = {};
                res.json({ 'success': false, 'data': null, 'error': err });
            }
            else if (user !== null) {
                var data = {};
                data.username = user.username;
                data.firstname = user.firstname;
                data.lastname = user.lastname;
                data.books = user.books;
                data.messages = user.messages;
                data.todo = user.todo;
                res.json({ 'success': true, 'data': data, 'error': null });
            }
            else {
                req.session['User'] = {};
                res.json({ 'success': false, 'data': null, 'error': 'No User Found!' });
            }
        });
    }
    else {
        res.json({ 'success': false, 'data': null, 'error': 'No User Logged In!' });
    }
}
exports.userLoggedIn = userLoggedIn;
function userSignout(req, res) {
    delete req.session['User'];
    res.json({ 'success': true, 'data': null, 'error': null });
}
exports.userSignout = userSignout;
function getUsers(req, res) {
    var newUser;
    userModel_1.User.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        else if (users.length > 0) {
            res.json(users);
        }
        else {
            res.send('No Users Found!');
        }
    });
}
exports.getUsers = getUsers;
function retriveUser(req, res) {
    var reqUser = req.body;
    userModel_1.User.findOne({ username: reqUser.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user !== null) {
            res.json(user);
        }
        else {
            res.send('No Users Found!');
        }
    });
}
exports.retriveUser = retriveUser;
function createUser(req, res) {
    var newUser = req.body;
    userModel_1.User.findOne({ username: newUser.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user === null || user === undefined) {
            userModel_1.User.create(newUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send('User Created Successfully!');
                }
            });
        }
        else if (user.username === newUser.username) {
            res.send('User Already Exits!');
        }
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    var updatedUser = req.body;
    userModel_1.User.findOne({ username: updatedUser.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user.username !== updatedUser.username) {
            res.send('No User Found!');
        }
        else {
            userModel_1.User.update(updatedUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send('User Updated Successfully!');
                }
            });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    var deleteUser = req.body;
    userModel_1.User.findOne({ username: deleteUser.username }, function (err, user) {
        if (err) {
            res.send(err);
        }
        else if (user.username !== deleteUser.username) {
            res.send('No User Found!');
        }
        else {
            userModel_1.User.remove(deleteUser, function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send('User Deleted Successfully!');
                }
            });
        }
    });
}
exports.deleteUser = deleteUser;
