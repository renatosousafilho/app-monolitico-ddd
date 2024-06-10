import { SequelizeStorage, Umzug } from "umzug"
import { Sequelize } from "sequelize"

export default class UmzugMigrator {
  private _umzug: Umzug<Sequelize>;

  constructor(sequelize: Sequelize) {
    this._umzug = new Umzug({
      migrations: { glob: "*/infrastructure/sequelize/migrations/*.{js,ts}" },
      context: sequelize,
      storage: new SequelizeStorage({ sequelize }),
      // logger: console,
      logger: undefined,
    })
  }

  async up() {
    await this._umzug.up()
  }

  async down() {
    await this._umzug.down()
  }
}