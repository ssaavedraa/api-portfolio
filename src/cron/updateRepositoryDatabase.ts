import CronJob from './CronJob'

class SyncDatabaseRepositories extends CronJob {
  constructor () {
    super('*/1 * * * *', () => console.log('logging every minute'))
  }
}

export default SyncDatabaseRepositories
