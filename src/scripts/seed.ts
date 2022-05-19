import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { FixturesModule } from '../fixtures/fixtures.module'
import { FixturesService } from '../fixtures/fixtures.service'
;(async () => {
  const context = await NestFactory.createApplicationContext(AppModule)
  const fixturesModule = context.select<FixturesModule>(FixturesModule)
  const fixturesService = fixturesModule.get<FixturesService>(FixturesService)

  await fixturesService.resetDatabase()
  await fixturesService.country.injectCountries()
})()
  .then(() => {
    console.log(`Success!`)
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
  })
