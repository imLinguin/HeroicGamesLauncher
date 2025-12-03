import { LegendaryAppName, LegendaryPlatform } from './base'

interface InstallSize {
  subcommand: 'install-size'
  appName: LegendaryAppName
  '--json'?: true
  '--install-component'?: string
  '--platform'?: LegendaryPlatform
}

export default InstallSize
