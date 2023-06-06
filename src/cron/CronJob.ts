import cron from 'node-cron'

class CronJob {
  protected schedule: string
  protected task: () => void
  protected options?: cron.ScheduleOptions

  constructor (schedule: string, task: () => void, options?: cron.ScheduleOptions) {
    this.schedule = schedule
    this.task = task.bind(this)
    this.options = options
  }

  public start () {
    cron.schedule(this.schedule, this.task, this.options)
  }
}

export default CronJob
