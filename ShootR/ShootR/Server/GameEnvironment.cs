﻿using System;
using System.Collections.Generic;
using System.Timers;
using SignalR.Hubs;

namespace Shooter
{
    public class GameEnvironment : Hub, IConnected, IDisconnect
    {
        // How frequently the Update loop is executed
        public const int UPDATE_INTERVAL = 17;
        // How frequently the Draw loop is executed.  Draw is what triggers the client side pings
        public const int DRAW_INTERVAL = 33;

        public static GameHandler gameHandler = new GameHandler();
        public static Timer updateTimer = new Timer(UPDATE_INTERVAL);
        public static Timer drawTimer = new Timer(DRAW_INTERVAL);
        public static GameTime gameTime = new GameTime();

        private static ConfigurationManager configuration = new ConfigurationManager();

        public GameEnvironment()
        {
            if (!updateTimer.Enabled)
            {
                updateTimer.Enabled = true;
                updateTimer.Elapsed += new ElapsedEventHandler(Update);
                updateTimer.Start();
            }

            if (!drawTimer.Enabled)
            {
                drawTimer.Enabled = true;
                drawTimer.Elapsed += new ElapsedEventHandler(Draw);
                drawTimer.Start();
            }
        }

        /// <summary>
        /// Sends down batches of data to the clients in order to update their screens
        /// </summary>
        public void Draw(object sender, ElapsedEventArgs e)
        {
            Clients.LoadMapInfo(gameHandler.ships, gameHandler.bulletManager.bulletsInAir, gameHandler.GetDisposedAmunition());
        }

        /// <summary>
        /// Keeps the physics and the movements of the game calculated.  This is used primarily to do server side validation.
        /// If there is an innaproprite move on the client the server will correct it.
        /// </summary>
        public void Update(object sender, ElapsedEventArgs e)
        {
            gameTime.Update();
            gameHandler.Update(gameTime);
        }

        #region Connection Methods
        public System.Threading.Tasks.Task Connect()
        {
            gameHandler.collisionManager.MonitorVehicle(gameHandler.AddShip(new Ship(new Vector2(), gameHandler.bulletManager), Context.ConnectionId));
            return null;
        }

        public System.Threading.Tasks.Task Reconnect(IEnumerable<string> groups)
        {
            return null;
        }

        /// <summary>
        /// On disconnect we need to remove the ship from our list of ships within the gameHandler.
        /// This also means we need to notify clients that the ship has been removed.
        /// </summary>
        public System.Threading.Tasks.Task Disconnect()
        {
            gameHandler.RemoveShipByKey(Context.ConnectionId);
            return Clients.RemoveShip(Context.ConnectionId);
        }

        #endregion

        #region Client Accessor Methods

        /// <summary>
        /// Called when a ship fire's a bullet
        /// </summary>
        public void fire()
        {
            gameHandler.collisionManager.MonitorAmunition(gameHandler.ships[Context.ConnectionId].WeaponController.Fire());
        }

        /// <summary>
        /// Retrieves the game's configuration
        /// </summary>
        /// <returns>The game's configuration</returns>
        public ConfigurationManager getConfiguration()
        {
            return configuration;
        }

        /// <summary>
        /// Registers the start of a movement on a clint.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to start moving</param>
        public void registerMoveStart(string movement)
        {
            //DateTime dt = DateTime.FromFileTimeUtc(when);
            Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
            gameHandler.ships[Context.ConnectionId].MovementController.StartMoving(where);
        }

        /// <summary>
        /// Registers the stop of a movement on a client.  Fires when the client presses a movement hotkey.
        /// </summary>
        /// <param name="movement">Direction to stop moving</param>
        public void registerMoveStop(string movement)
        {
            Movement where = (Movement)Enum.Parse(typeof(Movement), movement);
            gameHandler.ships[Context.ConnectionId].MovementController.StopMoving(where);
        }

        #endregion
    }
}