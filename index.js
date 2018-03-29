
const match = (objFn, obj) => {
  const handleKeyObj = ([key, ...rest]) =>
    obj[key] !== undefined
      ? objFn[key](obj[key])
      : handleKeyObj(rest);
  return handleKeyObj(Object.keys(objFn));
};

const Some = (value) => ({
  some: value,
  value,
  map: f => Some(f(value)),
  chain: f => f(value),
  join: () => value,
  getOrElse: () => value,
  ap: (m) => m.map(value),
});

Some.of = Some;

const NoneFn = () => ({
  none: 'None',
  value: 'None',
  map: () => None,
  chain: () => None,
  join: () => None,
  getOrElse: value => value,
  ap: () => None,
});

const None = NoneFn();

None.of = () => None;

const Option = (value) =>
  value !== undefined || value !== null
    ? Some.of(value)
    : None;

Option.fromNullable = Option;

Option.of = Option;

const Right = (value) => ({
  right: value,
  value,
  map: f => Right(f(value)),
  chain: f => f(value),
  join: () => value,
  ap: m => m.map(value),
});

Right.of = Right;


const Left = (value) => ({
  left: value,
  value,
  map: _ => Left(value),
  chain: _ => value,
  join: () => value,
  ap: _ => Left(value),
});

Left.of = Left;

Either = {
  try: f => {
    return function () {
      try {
        const v = f.apply(null, arguments);
        return Right.of(v);
      } catch (err) {
        return Left.of(err);
      }
    };
  },
  fromNullable: v => v
    ? Right.of(v)
    : Left.of('No value'),
};


module.exports = {
  match,
  Some,
  None,
  Option,
  Right,
  Left,
  Either,
};
