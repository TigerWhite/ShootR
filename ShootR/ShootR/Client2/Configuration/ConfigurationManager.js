/// <reference path="../../Scripts/endgate-0.2.0-beta1.d.ts" />
/// <reference path="../Ships/Ship.ts" />
/// <reference path="../Ships/ShipFireController.ts" />
/// <reference path="../Ships/ShipMovementController.ts" />
/// <reference path="../Server/IConfigurationDefinitions.ts" />
/// <reference path="../Ships/Abilities/Boost.ts" />
/// <reference path="../Bullets/Bullet.ts" />
/////////////////// <reference path="../HUD/Leaderboard.ts" />
/////////////////// <reference path="../HUD/DeathScreen.ts" />
/////////////////// <reference path="../Space/Map.ts" />
/// <reference path="../GameScreen.ts" />
/////////////////// <reference path="../Powerups/HealthPack.ts" />
/// <reference path="../Game.ts" />
/////////////////// <reference path="../Interfaces/IConfigurations.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
var ShootR;
(function (ShootR) {
    var ConfigurationManager = (function () {
        function ConfigurationManager(configuration) {
            // Update the prototypes from the config
            ShootR.Ship.SIZE = new eg.Size2d(configuration.shipConfig.WIDTH, configuration.shipConfig.HEIGHT);
            ShootR.ShipFireController.MIN_FIRE_RATE = eg.TimeSpan.FromMilliseconds(configuration.shipConfig.MIN_FIRE_RATE);
            ShootR.ShipMovementController.DRAG_AREA = configuration.shipMovementControllerConfig.DRAG_AREA;
            ShootR.ShipMovementController.DRAG_COEFFICIENT = configuration.shipMovementControllerConfig.DRAG_COEFFICIENT;
            ShootR.ShipMovementController.ENGINE_POWER = configuration.shipMovementControllerConfig.ENGINE_POWER;
            ShootR.ShipMovementController.MASS = configuration.shipMovementControllerConfig.MASS;
            ShootR.ShipMovementController.ROTATE_SPEED = configuration.shipMovementControllerConfig.ROTATE_SPEED * .0174532925;

            ShootR.Boost.DURATION = eg.TimeSpan.FromMilliseconds(configuration.abilityConfig.BOOST_DURATION);
            ShootR.Boost.SPEED_INCREASE = configuration.abilityConfig.BOOST_SPEED_INCREASE;

            //Bullet.BULLET_DIE_AFTER = configuration.gameConfig.BULLET_DIE_AFTER;
            ShootR.Map.SIZE = new eg.Size2d(configuration.mapConfig.WIDTH, configuration.mapConfig.HEIGHT);
            ShootR.Map.BARRIER_DEPRECATION = configuration.mapConfig.BARRIER_DEPRECATION;

            ShootR.GameScreen.MAX_SCREEN_HEIGHT = configuration.screenConfig.MAX_SCREEN_HEIGHT;
            ShootR.GameScreen.MAX_SCREEN_WIDTH = configuration.screenConfig.MAX_SCREEN_WIDTH;
            ShootR.GameScreen.MIN_SCREEN_HEIGHT = configuration.screenConfig.MIN_SCREEN_HEIGHT;
            ShootR.GameScreen.MIN_SCREEN_WIDTH = configuration.screenConfig.MIN_SCREEN_WIDTH;
            ShootR.GameScreen.SCREEN_BUFFER_AREA = configuration.screenConfig.SCREEN_BUFFER_AREA;

            ShootR.Bullet.BULLET_DIE_AFTER = eg.TimeSpan.FromMilliseconds(configuration.gameConfig.BULLET_DIE_AFTER);
            ShootR.Bullet.SIZE = new eg.Size2d(configuration.bulletConfig.WIDTH, configuration.bulletConfig.HEIGHT);

            //          $.extend(Leaderboard, configuration.leaderboardConfig);
            //$.extend(Game.prototype, configuration.gameConfig);
            //$.extend(HealthPack, configuration.healthPackConfig);
            //DeathScreen.RESPAWN_TIMER = configuration.gameConfig.RESPAWN_TIMER;
            //ShipController.REQUEST_PING_EVERY = configuration.gameConfig.REQUEST_PING_EVERY;
            $.extend(this, configuration);
        }
        return ConfigurationManager;
    })();
    ShootR.ConfigurationManager = ConfigurationManager;
})(ShootR || (ShootR = {}));
//# sourceMappingURL=ConfigurationManager.js.map