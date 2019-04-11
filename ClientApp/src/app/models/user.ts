export class User {
  public id: number
  public name: string
  public email: string
  public password: string
  public token: string
  public userAccess: string
  public database: string
  public domain: string
}

export class Globals {
  static getUser(): User {
    return <User>JSON.parse(localStorage.getItem('alpha-user'))
  }

  static setUser(user: User) {
    localStorage.setItem('alpha-user', JSON.stringify(user))
  }
}