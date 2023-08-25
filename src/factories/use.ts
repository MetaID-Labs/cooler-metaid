import Domain from '../domain.ts'

export default async function use(domainSymbol: string) {
  const domain = await import(`../schemas/${domainSymbol}.json`).then((module) => module.default)

  return new Domain(domain.name)
}
