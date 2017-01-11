'use strict';
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');

test.describe('Login', function() {
	this.timeout(30000);
	var driver;

	test.beforeEach(function() {
		var vendorDirectory = process.cwd() + '/vendor';
		process.env.PATH = vendorDirectory + ":$PATH";
		driver = new webdriver.Builder().forBrowser('firefox').build();
	});

	test.afterEach(function() {
		driver.quit();
	});

	test.it('with valid credentials', function() {
		driver.get('http://the-internet.herokuapp.com/login');
		driver.findElement({id: 'username'}).sendKeys('tomsmith');
		driver.findElement({id: 'password'}).sendKeys('SuperSecretPassword!');
		driver.findElement({css: 'button'}).click();
		driver.findElement({css: '.flash.success'}).isDisplayed().then(function(elementDisplayed) {
			assert.equal(elementDisplayed, true, 'Success message not displayed');
		});
	});
});