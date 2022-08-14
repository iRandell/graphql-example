export class GraphqlClient {
  private readonly baseUrl?: string

  public constructor(baseUrl?: string) {
    this.baseUrl = baseUrl
  }

  public async execute<TResult>(
    path: string,
    query: string,
    variables: Record<string, unknown>,
  ): Promise<TResult> {
    const url = new URL(path, this.baseUrl)

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = { 'content-type': 'application/json' }

    const body = JSON.stringify({ query, variables })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
      await fetch(url, {
        method: 'POST',
        headers,
        body,
      })
    ).json()
  }
}
