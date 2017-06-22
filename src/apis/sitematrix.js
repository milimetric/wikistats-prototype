/**
 * Gets the wikimedia sitematrix (endpoint in config) and parses it.
 */
import _ from 'lodash';
//import $ from 'jquery';
import config from '../config';

let matrix = $.ajax({

    url: config.sitematrix.endpoint,
    // wikimedia api doesn't allow CORS from non-whitelisted domains
    dataType: 'jsonp',
    // otherwise jquery takes the liberty of not caching your jsonp requests
    cache: true

}).then(function (data) {

    let result = {
        'all': 'all-projects',
        'all-projects':'all-projects'
    };

    _.forEach(data.sitematrix, function (languageGroup) {
        // special projects like commons are configured differently
        let next = languageGroup.site || languageGroup;

        _.forEach(next, function (site) {
            var urlEndpoint = site.url.replace(/https:\/\/(www\.)?/, '');
            result[site.dbname] = urlEndpoint;
            result[urlEndpoint] = site.dbname;
        });
    });

    return result;
});

export default {
    /**
     * Given a project db will return the project url from the sitematrix
     * If url is not found it will throw an error
     */
    getProjectUrl (dbname) {
        return matrix.then(function (lookup) {
            const found = lookup[dbname];
            if (!found) { throw 'Could not find url for project!'; }
            return found;
        });
    }
};
