import GithubService from '../services/GithubService'
import CronJob from './CronJob'

class SyncDatabaseRepositories extends CronJob {
  constructor () {
    super('0 0 * * *', async () => {
      try {
        console.log('Updating database')
        await GithubService.syncDatabase()
        console.log('Database updated')
      } catch (error) {
        console.error('Error updating database', error)
      }
    }, {
      scheduled: true,
      timezone: 'America/Bogota'
    })
  }
}

export default SyncDatabaseRepositories
