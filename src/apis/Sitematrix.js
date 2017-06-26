var _ = require('lodash');

function Sitematrix() {}

// this will be a promise to the loaded cache
Sitematrix.loaded = null;

/**
 * Fetch the sitematrix and keep the cache in a promise for anyone who needs it
 */
Sitematrix.prototype.loadCache = function () {
    if (Sitematrix.loaded === null) {
        // in the special case when project is "all", resolve to "all-projects"
        var cache = {
            'all': 'all-projects',
            'all-projects':'all-projects'
        };

        Sitematrix.loaded = new $.Deferred();

        $.ajax({
            url: 'https://meta.wikimedia.org/w/api.php?action=sitematrix&formatversion=2&format=json&maxage=3600&smaxage=3600',
            // Tell jQuery we're expecting JSONP
            dataType: 'jsonp',
            //otherwise jquery takes the liberty of not caching your jsonp requests
            cache: true

        }).done(function (data) {
            cache.data = data.sitematrix;
            cache.siteLookup = {};
            // transform sitematrix in structure that allows easy o(1) lookups
            _.forEach(data.sitematrix, function (languageGroup) {
                // special projects like commons are reported differently
                var next = languageGroup.site || languageGroup;

                _.forEach(next, function (site) {
                    // Each site record is as explained in this module comment
                    var urlEndpoint = site.url.replace(/https:\/\/(www\.)?/, '');
                    cache.siteLookup[languageGroup.name + " " + site.sitename] = urlEndpoint;
                });
            });

        // fail or succeed, we resolve with the cache to make lookups easy
        }).then(function () {
            Sitematrix.loaded.resolve(cache);
        });
    }

    return Sitematrix.loaded.promise();
};

/**
 * Given a project db will return the project url as defined in teh sitematrix
 * If url is not found it will throw an error
 *
 * Jsonp request for sitematrix, wikimedia api doesn't allow CORS
 * from non-whitelisted domains
 */
Sitematrix.prototype.getProjectUrl = function (dbname) {
    var urlPromise = new $.Deferred();

    this.loadCache().then(function (cache) {
        var found = cache.siteLookup[dbname];

        if (found) {
            urlPromise.resolve(found);
        } else {
            urlPromise.reject('Could not find url for project!');
        }
    });

    return urlPromise.promise();
};

Sitematrix.prototype.getWikiList = function () {
    var urlPromise = new $.Deferred();

    this.loadCache().then(function (cache) {
        var allWikis = [];
        Object.keys(cache.data).forEach(function (key) {
            var group = cache.data[key];
            if (key === 'count'){}
            else if (key === 'specials') {
                allWikis = allWikis.concat(group.map(function (s) {
                    return {
                        title: s.sitename,
                        urlName: s.url.replace(/https:\/\/(www\.)?/, ''),
                        dbname: s.dbname
                    }
                }));
            } else {
                allWikis = allWikis.concat(group.site.map(function (s) {
                    return {
                        title: group.localname + " " + s.sitename,
                        urlName: s.url.replace(/https:\/\/(www\.)?/, ''),
                        dbname: s.dbname
                    }
                }));
            }
        })

        urlPromise.resolve(allWikis);
    });

    return urlPromise.promise();
}

export default Sitematrix;