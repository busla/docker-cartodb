var config = {
     environment: 'development'
    ,port: 8181
    ,host: '0.0.0.0'
    ,uv_threadpool_size: undefined
    // Regular expression pattern to extract username
    // from hostname. Must have a single grabbing block.
    ,user_from_host: '^([^\\.]+)\\.'

    // Base URLs for the APIs
    //
    // See http://github.com/CartoDB/Windshaft-cartodb/wiki/Unified-Map-API
    // 
    // Base url for the Templated Maps API
    // "/api/v1/map/named" is the new API,
    // "/tiles/template" is for compatibility with versions up to 1.6.x
    ,base_url_templated: '(?:/api/v1/map/named|/tiles/template)'
    // Base url for the Detached Maps API
    // "maps" is the the new API,
    // "tiles/layergroup" is for compatibility with versions up to 1.6.x
    ,base_url_detached: '(?:/api/v1/map|/tiles/layergroup)'
    // Base url for the Inline Maps and Table Maps API
    ,base_url_legacy: '/tiles/:table'

    // Maximum number of connections for one process
    // 128 is a good value with a limit of 1024 open file descriptors
    ,maxConnections:128
    // Maximum number of templates per user. Unlimited by default.
    ,maxUserTemplates:1024
    // Seconds since "last creation" before a detached
    // or template instance map expires. Or: how long do you want
    // to be able to navigate the map without a reload ?
    // Defaults to 7200 (2 hours)
    ,mapConfigTTL: 7200
    // idle socket timeout, in milliseconds 
    ,socket_timeout: 600000
    ,enable_cors: true
    ,cache_enabled: false
    ,log_format: ':req[X-Real-IP] :method :req[Host]:url :status :response-time ms -> :res[Content-Type] (:res[X-Tiler-Profiler])'
    // If log_filename is given logs will be written
    // there, in append mode. Otherwise stdout is used (default).
    // Log file will be re-opened on receiving the HUP signal
    ,log_filename: 'logs/node-windshaft.log'
    // Templated database username for authorized user
    // Supported labels: 'user_id' (read from redis)
    ,postgres_auth_user: 'development_cartodb_user_<%= user_id %>'
    // Templated database password for authorized user
    // Supported labels: 'user_id', 'user_password' (both read from redis)
    ,postgres_auth_pass: '<%= user_password %>'
    ,postgres: {
        // Parameters to pass to datasource plugin of mapnik
        // See http://github.com/mapnik/mapnik/wiki/PostGIS
        type: "postgis",
        user: "publicuser",
        password: "public",
        host: '127.0.0.1',
        port: 5432,
        extent: "-20037508.3,-20037508.3,20037508.3,20037508.3",
        /* experimental
        geometry_field: "the_geom",
        extent: "-180,-90,180,90",
        srid: 4326,
        */
        row_limit: 65535,
        simplify_geometries: true,
        use_overviews: true, // use overviews to retrieve raster
        /*
         * Set persist_connection to false if you want
         * database connections to be closed on renderer
         * expiration (1 minute after last use).
         * Setting to true (the default) would never
         * close any connection for the server's lifetime
         */
        persist_connection: false,
        max_size: 500
    }
    ,mapnik_version: undefined
    ,mapnik_tile_format: 'png8:m=h'
    ,statsd: {
        host: 'localhost',
        port: 8125,
        prefix: 'dev.',
        cacheDns: true
        // support all allowed node-statsd options
    }
    ,renderer: {
      // Milliseconds since last access before renderer cache item expires
      cache_ttl: 60000,
      metatile: 4,
      bufferSize: 64,
      statsInterval: 5000 // milliseconds between each report to statsd about number of renderers and mapnik pool status
    }
    ,millstone: {
        // Needs to be writable by server user
        cache_basedir: '/tmp/cdb-tiler-dev/millstone-dev'
    }
    ,redis: {
        host: '127.0.0.1',
        port: 6379,
        // Max number of connections in each pool.
        // Users will be put on a queue when the limit is hit.
        // Set to maxConnection to have no possible queues.
        // There are currently 2 pools involved in serving
        // windshaft-cartodb requests so multiply this number
        // by 2 to know how many possible connections will be
        // kept open by the server. The default is 50.
        max: 50,
        returnToHead: true, // defines the behaviour of the pool: false => queue, true => stack
        idleTimeoutMillis: 1, // idle time before dropping connection
        reapIntervalMillis: 1, // time between cleanups
        slowQueries: {
            log: true,
            elapsedThreshold: 200
        },
        slowPool: {
            log: true, // whether a slow acquire must be logged or not
            elapsedThreshold: 25 // the threshold to determine an slow acquire must be reported or not
        },
        emitter: {
            statusInterval: 5000 // time, in ms, between each status report is emitted from the pool, status is sent to statsd
        }
    }
    ,sqlapi: {
        protocol: 'http',
        // If "host" is given, it will be used
        // to connect to the SQL-API without a
        // DNS lookup
        host: '127.0.0.1',
        port: 8080,
        // The "domain" part will be appended to 
        // the cartodb username and passed to
        // SQL-API requests in the Host HTTP header
        domain: 'cartodb.localhost',
        version: 'v1',
        // Maximum lenght of SQL query for GET
        // requests. Longer queries will be sent
        // using POST. Defaults to 2048
        max_get_sql_length: 2048,
        // Maximum time to wait for a response,
        // in milliseconds. Defaults to 100.
        timeout: 100
    }
    ,varnish: {
        host: 'localhost',
        port: 6082,
        secret: 'xxx',
        ttl: 86400,
        layergroupTtl: 86400 // the max-age for cache-control header in layergroup responses
    }
    // If useProfiler is true every response will be served with an
    // X-Tiler-Profile header containing elapsed timing for various 
    // steps taken for producing the response.
    ,useProfiler:true
};

module.exports = config;
