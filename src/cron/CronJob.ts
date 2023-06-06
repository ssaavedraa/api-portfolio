import cron from 'node-cron'

class CronJob {
  protected schedule: string
  protected task: () => void

  constructor (schedule: string, task: () => void) {
    this.schedule = schedule
    this.task = task.bind(this)
  }

  public start () {
    cron.schedule(this.schedule, this.task)
  }
}

export default CronJob
