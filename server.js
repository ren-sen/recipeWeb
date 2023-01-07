const express = require("express")
const app = express()
const path = require("path");
const expressLayouts = require("express-ejs-layouts")
const portNumber = 3000
const indexRouter = require('./routes')
process.stdin.setEncoding("utf8"); 
app.set("views", path.resolve(__dirname, "templates"));
app.set("layout", path.resolve(__dirname, "templates/layouts/layout.ejs"));
app.set("view engine", "ejs");

app.use(expressLayouts)
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter)

app.listen(portNumber, ()=> console.info(`Web server started and running at http://localhost:${portNumber}`));
const prompt = "Stop to shutdown the server: ";
process.stdout.write(prompt);
process.stdin.on('readable', () => {  /* on equivalent to addEventListener */
	let dataInput = process.stdin.read();
	if (dataInput !== null) {
        let command = dataInput.trim();
        if (command === "stop") {
			console.log("Shutting down the server");
            process.exit(0);  /* exiting */
        } else {
			/* After invalid command, we cannot type anything else */
			console.log(`Invalid command: ${command}`);
		}
        process.stdout.write(prompt);
        process.stdin.resume();
    }
});

