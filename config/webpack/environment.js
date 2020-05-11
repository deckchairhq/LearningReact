const { environment } = require('@rails/webpacker')

// https://stackoverflow.com/questions/59777625/bootstrap-styling-not-showing-when-deploying-to-heroku-a-ror-application-with-re
const webpack = require('webpack')
environment.plugins.append('Provide', new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
}))

module.exports = environment
