import { UserAppFullFragment, gql } from '@gql'
import settings from '@settings'
import { adminRequest } from '@utils/adminRequest'

export default class AbstractApp<SecretConfig, Config> {
  constructor(public userApp: UserAppFullFragment) {}

  protected get secretConfig(): SecretConfig {
    return this.userApp.secretConfig
  }

  protected get config(): Config {
    return this.userApp.config
  }

  protected get timezone(): string {
    return this.userApp.user?.metadata.timezone || settings.defaultTimezone
  }

  public async uninstall() {
    await adminRequest(DELETE_USER_APP, { id: this.userApp.id })
  }

  protected async updateSecretConfig(values: Partial<SecretConfig>) {
    this.userApp.secretConfig = { ...this.secretConfig, ...values }
    await adminRequest(UPDATE_USER_APP, {
      id: this.userApp.id,
      values: { secretConfig: this.userApp.secretConfig },
    })
  }

  protected async updateConfig(values: Partial<Config>) {
    this.userApp.config = { ...this.config, ...values }
    await adminRequest(UPDATE_USER_APP, {
      id: this.userApp.id,
      values: { config: this.userApp.config },
    })
  }
}

const UPDATE_USER_APP = gql(`
  mutation updateUserApp($id: uuid!, $values: user_app_set_input!) {
    update_user_app_by_pk(pk_columns: { id: $id }, _set: $values) {
      id
    }
  }
`)

const DELETE_USER_APP = gql(`
  mutation deleteUserApp($id: uuid!) {
    delete_user_app_by_pk(id: $id) {
      id
    }
  }
`)
