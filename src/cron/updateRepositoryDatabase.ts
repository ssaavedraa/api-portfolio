import GithubService from '../services/GithubService'
import CronJob from './CronJob'

class SyncDatabaseRepositories extends CronJob {
  constructor () {
    super('0 0 * * *', async () => {
      try {
        console.log('Updating database')
        // eslint-disable-next-line no-unused-vars
        const _databaseUpdate = await GithubService.syncDatabase()
        console.log('Database updated')
      } catch (error) {
        console.error('Error updating database', error)
      }
    })
  }
}

export default SyncDatabaseRepositories
