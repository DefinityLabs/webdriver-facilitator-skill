const {Facilitator, general} = require('facilitator');
const webdriver = require('.');

const facilitator = new Facilitator();

let script = `
visit "https://www.npmjs.com/signup"
fill "Name" with "David Sobreira Gouvea"
fill "Public Email" with "davidsgbr@gmail.com"
fill "Username" with "dsgouvea"
fill "Password" with "123456"
check checkbox with name "eula-agreement"
`;

general.install(facilitator);
webdriver.install(facilitator);
facilitator.exec(script);
