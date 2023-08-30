enum CacheType {
  local,
  session
}
class Cache {
  private _storage: Storage

  constructor(isLocal: CacheType) {
    this._storage = isLocal === CacheType.local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this._storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this._storage.getItem(key)
    if (value) {
      return JSON.parse(value)
      // return value
    }
  }

  removeCache(key: string) {
    this._storage.removeItem(key)
  }
  clearCache() {
    this._storage.clear()
  }
}
export const localCache = new Cache(CacheType.local)
export const sessionCache = new Cache(CacheType.session)
