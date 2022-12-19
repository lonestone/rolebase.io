export enum UserLocalStorageKeys {
  AlgoliaConfig = 'algolia-config-{id}',
  MagicBellConfig = 'magicbell-config',
  OrgId = 'orgId',
  ThreadDrafts = 'thread-draft-{id}',
}

export function resetUserLocalStorage() {
  for (const key in localStorage) {
    for (const keyPattern of Object.values(UserLocalStorageKeys)) {
      if (
        new RegExp('^' + keyPattern.replace(/\{id\}/, '.*') + '$').test(key)
      ) {
        localStorage.removeItem(key)
      }
    }
  }
}
