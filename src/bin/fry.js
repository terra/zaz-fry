// CommonJS node native modules
let Hapi = require('hapi');
let Good = require('good');
let Lout = require('lout');
let Scooter  = require('scooter');
let Tv = require('tv');

// ES6 Fry modules
import helpers from './helpers';
import { host, port } from '../fryconfig';

class Fry {
    constructor() {
        console.log('New Fry instance');
    }

    // Start the server
    startServer() {
        // Create a server with a host and port
        let server = new Hapi.Server('10.224.195.49', 8182, { cors: true });

        let fryAPI = {

            init(settings) {
                try {
                    server.route({
                        method: settings.method,
                        path: '/services' + settings.path,
                        handler: settings.handler,
                        config: settings.config
                    });
                } catch (moduleError) {
                    server.log('error', moduleError);
                }
            },

            log (level, msg) {
                server.log(level, msg);
            }
        };

        // Load fry modules
        helpers.loadFryModules(fryAPI);

        let options = {
            host,
            port,
            endpoint: '/debug/console'
        };

        server.pack.register({ 
            plugin: Tv, 
            options
        }, (err) => {
            if (err) {
                console.log(err);
            }
        });

        // Start the server
        server.pack.register([Good, Lout, Scooter], (err) => {
            if (err) {
                throw err; // something bad happened loading the plugin
            }

            server.start(() => {
                server.log('info', 'Server running at: ' + server.info.uri);
            });
        });
    }
}

export default Fry;