// Equality via Eq
import { Eq, fromEquals, struct } from 'fp-ts/lib/Eq'
import { pipe } from 'fp-ts/lib/function'
import { some } from 'fp-ts/lib/Array'
import { Eq as EqNumber } from 'fp-ts/lib/number'
import { Eq as EqString } from 'fp-ts/lib/string'

type a = (a: number) => number
const b: a = (a: number) => 3
const c = (a: number): number => 3
// return type omission - type inference
// input type class output function HOF
const contains = <T>(eq: Eq<T>) =>
  // output start(function) 
  (elem: T) =>
    // nested output start (function)
    (elems: T[]): boolean =>
      // f(a) apply f -> a
      // pipe(a, f) a -> f
      pipe(
        elems,
        // some input function(predicate) output function
        some((x: T) => eq.equals(x, elem))
      )
// nested output end
// output end

const containsNumber = contains(EqNumber)
const containsString = contains(EqString)

const containsPerson = contains(<Eq<{
  name: string
  age: number
}>>{
    equals: (a, b) =>
      EqNumber.equals(a.age, b.age) &&
      EqString.equals(a.name, b.name)
  })

const numberRes = pipe(
  [1, 2, 3, 4, 5],
  containsNumber(3)
)

console.log(numberRes)

const personRes = pipe(
  [
    { name: 'Alice', age: 29 },
    { name: 'Bob', age: 31 }
  ],
  containsPerson({ name: 'Alice', age: 30 })
)

console.log(personRes)

// Constructors

type Person = {
  name: string
  age: number
}

// imperative
const EqPerson2 = fromEquals(
  (a: Person, b: Person) =>
    EqNumber.equals(a.age, b.age) &&
    EqString.equals(a.name, b.name)
)

// declarative
const EqPerson3 = struct<Person>({
  age: EqNumber,
  name: EqString
})