export default function(
    Actions,
    Menu
) {

    return function MenuSimulation(gameSimulation) {

        const self = {};

        self.transform = {
            x     : 0,
            y     : 0,
            theta : 0,
            width : 1024,
            height: 768
        };

        let gameAction = Actions.NONE;
        let menu = null;
        let options = null;
        let highScores = [];
        resetOptions();
        showMainMenu();

        self.update = function(actions, input) {
            menu.updateFields(actions.mousePosition);
            if (actions.mouseUp !== Actions.NONE)
                processClick();
            menu.appendText(actions.text);
            if (actions.other === Actions.BACK_SPACE)
                menu.backspace();
            if (input.highScores) highScores = input.highScores;
            if (input.registerSuccess && menu.getName() === "Register")
                showMainMenu();
        };

        const processClick = function() {
            const button = menu.getSelectedButton();
            menu.handleClick();
            switch (button) {
                case "Resume":
                    return gameAction = Actions.RESUME_GAME;
                case "Join Game":
                    return showJoin();
                case "Join":
                    return gameAction = Actions.JOIN_GAME;
                case "Register":
                    return showRegistration();
                case "Submit":
                    return gameAction = Actions.REGISTER_USER;
                case "Main Menu":
                    return showMainMenu();
                case "High Scores":
                    return showHighScores();
                case "Credits":
                    return showCredits();
                case "Leave Game":
                    return gameAction = Actions.LEAVE_GAME;
                default:
                    return gameAction = Actions.NONE;
            }

        };

        self.getMenuName = function() { return menu.getName(); };

        self.getButtons = function() {
            return menu.getButtons();
        };

        self.getTextFields = () => menu.getTextFields();

        self.getAction = function() {
            const g = gameAction;
            gameAction = Actions.NONE;
            return g;
        };

        self.getValues = () => menu.getValues();

        function showJoin() {
            const menu = SubMenu("Join Game");
            menu.addTextField("username");
            menu.addTextField("password");
            menu.addButton("Join");
        }

        function showRegistration() {
            const menu = SubMenu("Register");
            menu.addTextField("username");
            menu.addTextField("password");
            // menu.addTextField( "confirm password" );
            menu.addButton("Submit");
        }

        function showMainMenu() {
            menu = Menu("Main Menu", self.transform);
            if (gameSimulation) {
                menu.addButton("Resume");
                menu.addButton("Leave Game");
            } else {
                menu.addButton("Join Game");
                menu.addButton("Register");
                menu.addButton("High Scores");
                menu.addButton("Credits");
            }
            resetOptions();
        }

        const showHighScores = function() {
            gameAction = Actions.REFRESH_SCORES;
            SubMenu("High Scores");
            resetOptions();
            options.highScores = true;
        };

        const showCredits = function() {
            SubMenu("Credits");
            resetOptions();
            options.credits = true;
        };

        const SubMenu = function(name) {
            menu = Menu(name, self.transform);
            menu.addButton("Main Menu");
            return menu;
        };

        self.getOptions = function() { return options; };

        function resetOptions() {
            options = {highScores: false, credits: false};
        }

        self.getHighScores = function() {
            return highScores;
        };

        self.getCredits = function() {
            return [
                ["Developed, with love, for CS 5410."],
                [],
                ["School", "Utah State University"],
                ["Professor", "Dr. Dean Mathias"],
                ["Developer", "Nathan Copier"],
                [],
                ["Gaussian function taken from sample code."],
                ["Background: http://www.spyderonlines.com/picture/free-space-backgrounds.html"],
                ["Brick overlay: https://pngtree.com/element/down?id=Mjg1MTQxOA==&type=1"],
                ["Steel ball: https://pixabay.com/en/balls-many-small-steel-ball-steel-1378300/"],
                ["To see more of my homework projects go to: "],
                ["https://github.com/nfcopier/homework"]
            ];
        };

        return self;

    };

}
