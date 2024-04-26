import { struct } from 'fp-ts/lib/Eq'
import { Eq as EqNumber } from 'fp-ts/lib/number'
import { Eq as EqString } from 'fp-ts/lib/string'

export type Person = {
  name: string
  age: number
}

export const EqPerson = struct<Person>({
  age: EqNumber,
  name: EqString
})