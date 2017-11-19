'use strict'
var light = 'off';
var fan = 'off';
const Assist = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.assistantcodelab = functions.https.onRequest((request, response) =>
{
	const app = new Assist({request:request, response:response});
	const actionMap = new Map();
	actionMap.set('input.welcome', welcomeIntent);
	actionMap.set('input.add', caculateAdd);
	actionMap.set('input.subtract', caculateSub);
	actionMap.set('input.lighton', lighton);
	actionMap.set('input.lightoff', lightoff);
	actionMap.set('input.fanon', fanon);
	actionMap.set('input.fanoff', fanoff);
	actionMap.set('input.ssml', ssml);
	actionMap.set('input.rich', rich);
	app.handleRequest(actionMap);

	function welcomeIntent(app) 
	{
		app.tell('This is a response from webhook');
	}
	function caculateAdd(app)
	{
		var n1 = app.getArgument('numberOne');
		var n2 = app.getArgument('numberTwo');
		var num1 = parseInt(n1, 10);
		var num2 = parseInt(n2, 10);
		var result = num1 + num2;
		app.tell('The sum of two numbers is ' + result);
	}
	function caculateSub(app)
	{
		var n1 = app.getArgument('numOne');
		var n2 = app.getArgument('numTwo');
		var num1 = parseInt(n1, 10);
		var num2 = parseInt(n2, 10);
		var result = num1 - num2;
		app.tell('The subtraction of two numbers is ' + result);
	}
	function lighton(app)
	{
		if(light == 'off')
		{
			app.tell('the light is switched on');
			light = 'on';
		}else {
			app.tell('light is already switched on');
		}
	}
	function lightoff(app) 
	{
		if(light == 'on')
		{
			app.tell('the light is switched off');
			light = 'off';
		}else {
			app.tell('light is already switched off');
		}
	}
	function fanon(app)
	{
		if(fan == 'off')
		{
			app.tell('the fan is switched on');
			fan = 'on';
		}else {
			app.tell('fan is already switched on');
		}
	}
	function fanoff(app)
	{
		if(fan == 'on')
		{
			app.tell('the fan is switched off');
			light = 'off';
		}else {
			app.tell('fan is already switched off');
		}
	}
	function onIntent(app) {
		if(fan == 'off') {
			app.tell('the fan is switched on');
			fan = 'on';
		}else {
			app.tell('the fan is already on');
		}
	}
	function offIntent(app) {
		if(fan == 'on') {
			app.tell('the fan is switched off');
			fan = 'off';
		}else {
			app.tell('the fan is already off');
		}
	}
	function ssml(app) {
		app.tell("<speak>these are <say-as interpret-as='characters'>SSML</say-as> examples."
		+"I can speak in cardinal<say-as interpret-as='cardinal'>198</say-as>and "
		+"I can speak in ordinals<say-as interpret-as='ordinal'>567</say-as>"
		+"and also in digits<say-as interpret-as='characters'>234</say-as>."
		+"A paragraph as two sentences."
		+"<p><s>this is one</s><s>this is two</s></p>."
		+"I can also play sounds<audio src = 'https://actions.google.com/sounds/v1/animals/bee_buzz.ogg'></audio>."
		+"</speak>")
	}
	function rich(app) 
	{
		app.tell(app.buildRichResponse()
			.addSimpleResponse('this is the simple response')
		.addBasicCard(app.buildBasicCard("Building rich response is easy way and increase user's satisfaction"))
			.setTitle('this is the title')
			.addButton('read more', 'http://google.com')
			.setImage('https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiQxJuMqq7XAhUQ9WMKHe8OCVAQjRwIBw&url=https%3A%2F%2Fwww.almanac.com%2Fcontent%2Fbirth-month-flowers-and-their-meanings&psig=AOvVaw20Jx4Te9_ISJq_haE0htwc&ust=1510208194926103'))
	}



});
