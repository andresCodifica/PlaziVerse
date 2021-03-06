'use strict'

const setupDatabase = require('./lib/db')
const setupAgenteModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgenteModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)
  await sequelize.authenticate()
  if (config.setup) {
    await sequelize.sync({ force: true })
  }
  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
