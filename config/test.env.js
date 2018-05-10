'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    publicPath: 'https://teenagertestcdn.speakhi.com/front/teacher',
})