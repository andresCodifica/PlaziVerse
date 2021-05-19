'use strict'

const setupDatabase = require('./lib/db')
const setupAgenteModel = require('./models/agente')
const setupMetricModel = require('./models/metric')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgenteModel(config)
  const MetricModel = setupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)
  await sequelize.authenticate()
  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
