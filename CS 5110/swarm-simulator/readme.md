# Project Swarm Simulator

### Objective
This code projects provides an environment in which to test different aspects of swarm intelligence.

### How to run
- This project relies on Node. Download and install node.js from their [main page](https://nodejs.org/en/).
- Ensure that both `node` and `npm` are added to your path (this should be done automatically during installation.)
- Navigate to the project's root directory and, from the commandline execute `npm install`. This will install the project's small handful of dependencies.
- From that same directory, execute the command `npm start`. This will start a server listening on port 3000. If another port is needed instead, edit the `PORT` variable at the top of "express_app.js".
- Navigate to "localhost:3000" in any browser besides Firefox to interact with the simulator.
- You can adjust the configuration for the Agents at the top of "static/game/agent.js".
