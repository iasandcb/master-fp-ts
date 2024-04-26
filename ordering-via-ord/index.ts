// Ordering via Ord
// equivalence relation
// a = a
// a = b <=> b = a
// a = b and b = c => a = c
// partial order relation (<=)
// a ~ b and b ~ a => a = b
// Ord : partial order relation depends on equivalence relation
// Ord extend Eq
// Algebraic structures
// 1. A set, 2. Operation(s) 3. Axioms
// Magma: a binary operation f: S x S -> S (closed)
// Magma -> (associativity) -> Semigroup -> (identity) -> Monoid -> (invertibility) -> Group
// Cartesian Product (S X T) -> (subset) -> Graph
// -> (S = T) -> Relation
// -> (two rules) -> Function

import { map, sort } from 'fp-ts/lib/Array'
import { Ord as OrdNumber, Eq as EqNumber } from 'fp-ts/lib/number'
import { Ord as OrdString, Eq as EqString } from 'fp-ts/lib/string'
import { Ord as OrdDate } from 'fp-ts/lib/Date'
import { pipe } from 'fp-ts/lib/function'
import { Ord } from 'fp-ts/lib/Ord'

import { Person, EqPerson } from './eq'

const nums = pipe(
  [0, 1, 9, 2, 8, 3, 7, 4, 6, 5],
  sort(OrdNumber)
)

console.log(nums)

const dates = pipe(
  [ new Date(1997, 5, 3),
    new Date(2020, 4, 15),
    new Date(2003, 7, 9)
  ],
  sort(OrdDate),
  map((d) => d.toISOString())
)

console.log(dates)

const OrdPerson: Ord<Person> = {
  ...EqPerson,
  compare: (a, b) => OrdNumber.compare(a. age, b.age)
}

const people = pipe(
  [
    { name: 'Bob', age: 31},
    { name: 'Alice', age: 29}
  ],
  sort(OrdPerson),
  map((d) => d.name)
)

console.log(people)