export class User {
  public id: string

  public name: string

  public phone: string

  public description: string

  public constructor(
    id: string,
    name: string,
    phone: string,
    description: string,
  ) {
    this.id = id
    this.name = name
    this.phone = phone
    this.description = description
  }
}
