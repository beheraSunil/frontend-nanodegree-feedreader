/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        // The test to loops through each feed
        // in the allFeeds object and ensures it has a URL and name defined
        //  and is not empty.
        it('name and url defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toEqual("");
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toEqual("");
            }
        });

    });

    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('hidden initially', function() {
            var divClass = $('body').hasClass('menu-hidden');
            expect(divClass).toBe(true);
        });
        /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('click working', function() {
            $('.menu-icon-link').trigger("click");
            var divClassVisible = $('body').hasClass('menu-hidden');
            expect(divClassVisible).toBe(false);
            $('.menu-icon-link').trigger("click");
            var divClassHidden = $('body').hasClass('menu-hidden');
            expect(divClassHidden).toBe(true);
        });
    });

    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('at least one entires is availble', function(done) {
            var articles = $(".feed").children().length;
            expect(articles).toBeGreaterThan(0);
            done();
        });
    });

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe('New Feed Selection', function() {

        var firstFeed;
        var secondFeed;
        beforeAll(function(done) {
            loadFeed(2, function() {
                firstFeed = $(".header-title").text();
                done();
            });
        });
        beforeEach(function(done) {
            loadFeed(1, function() {
                secondFeed = $(".header-title").text();
                done();
            });
        });
        it('Content changes??', function(done) {
            console.log(firstFeed);
            console.log(secondFeed);
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());