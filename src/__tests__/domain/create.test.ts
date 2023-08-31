import errors from '@/data/errors.ts'
import use from '@/factories/use.ts'

describe('domain.create', () => {
  beforeEach(async (ctx) => {
    ctx.Buzz = await use('buzz', {
      credential: {
        metaid: import.meta.env.VITE_TEST_METAID,
      },
    })
  })

  test('cannot create a new buzz if it is not logined', ({ Buzz }) => {
    Buzz.logout()
    expect(() =>
      Buzz.create({
        content: 'Hello World',
      }),
    ).toThrow(errors.NOT_LOGINED)
  })

  test.skip('can create a new buzz', ({ Buzz }) => {
    expect(
      Buzz.create({
        content: 'Hello World',
      }),
    ).toBeTypeOf('object')
  })

  test.todo('cannot create a new buzz if the root is not found')
})