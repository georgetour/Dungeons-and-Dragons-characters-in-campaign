//Routing is used so we can navigate through pages
//and we can render templates we want where we want
Router.configure({
    layoutTemplate:'layout'
});


Router.route('/',function () {
    this.render('home');
});

Router.route('howItWorks',function () {
    this.render('howItWorks');
})

Router.route('/about',function () {
    this.render('about');
});
