// Include our custom CSS (LESS also works)
require('plugins/gostroy-k-46-p-exm-tagcloud/tagcloudController');
require('plugins/gostroy_k_46_p_exm_tagcloud/tagcloud.css');

// The provider function must return the visualization
function TagcloudProvider(Private) {
  // Load TemplateVisType
  var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
  // Include the Schemas class, which will be used to define schemas
  var Schemas = Private(require('ui/Vis/Schemas'));

  // Return a new instance describing this visualization
  return new TemplateVisType({
    name: 'gostroyTagcloud', // the internal id of the visualization
    title: 'Tagcloud', // the name shown in the visualize list
    icon: 'fa-cloud', // the class of the font awesome icon for this
    description: 'Tagcloud visualization', // description shown to the user
    template: require('plugins/gostroy_k_46_p_exm_tagcloud/tagcloud.html'), // Load the template of the visualization
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'tagsize',
        title: 'Tagsize',
        min: 1,
        max: 1,
        aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
      },
      {
        group: 'buckets',
        name: 'tags',
        title: 'Tags',
        min: 1,
        max: 1,
        aggFilter: '!geohash_grid'
      }
    ])
  });
}

// Register the above provider to the visualization registry
require('ui/registry/vis_types').register(TagcloudProvider);

