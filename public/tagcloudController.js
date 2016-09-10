// Create an Angular module for this plugin
var module = require('ui/modules').get('gostroy-k-46-p-exm-tagcloud');

// Minimum and maximum font size tags should have.
var maxFontSize = 32,
    minFontSize = 12;

module.controller('TagcloudController', function($scope) {

    $scope.$watch('esResponse', function(resp) {
        if (!resp) {
            $scope.tags = null;
            return;
        }

        // Retrieve the id of the configured tags aggregation
        var tagsAggId = $scope.vis.aggs.bySchemaName['tags'][0].id;
        // Retrieve the metrics aggregation configured
        var metricsAgg = $scope.vis.aggs.bySchemaName['tagsize'][0];
        console.log(metricsAgg);

        // Get the buckets of that aggregation
        var buckets = resp.aggregations[tagsAggId].buckets;

        var min = Number.MAX_VALUE,
            max = - Number.MAX_VALUE;

        // Transform all buckets into tag objects
        $scope.tags = buckets.map(function(bucket) {
            return {
                label: bucket.key
            };
        });

        // Calculate the font size for each tag
        $scope.tags = $scope.tags.map(function(tag) {
            tag.fontSize = (tag.value - min) / (max - min) * (maxFontSize - minFontSize) + minFontSize;
            return tag;
        });
        
    });
    
});