// const colors = [
//   '#F5BF6A',
//   '#D0FA9B',
//   '#77CBFA',
//   '#D0CBFB',
//   '#A3A3FF',
//     '#EDEBF0',
// ];

// const colors = [
//   'rgb(204,80,73)',
//   'rgb(214,119,34)',
//   'rgb(149,92,219)',
//   'rgb(64,169,32)',
//   'rgb(48,158,186)',
//   'rgb(54,138,209)',
//   'rgb(199,80,139)',
//   'rgb(255,147,128)',
// ];

const colors = [
  {
    color: 'rgb(255,147,128)',
    gradient:
      'repeating-linear-gradient(-45deg, #992f37 0px, #992f37 5px, #ff9380 5px, #ff9380 10px)',
  },
  {
    color: 'rgb(236,176,78)',
    gradient:
      'repeating-linear-gradient(-45deg, #c35714 0px, #c35714 5px, #ecb04e 5px, #ecb04e 10px)',
  },
  {
    color: 'rgb(198,151,255)',
    gradient:
      'repeating-linear-gradient(-45deg, #5e31c8 0px, #5e31c8 5px, #c697ff 5px, #c697ff 10px)',
  },
  {
    color: 'rgb(167,235,110)',
    gradient:
      'repeating-linear-gradient(-45deg, #167e2d 0px, #167e2d 5px, #a7eb6e 5px, #a7eb6e 10px)',
  },
  {
    color: 'rgb(64,216,208)',
    gradient:
      'repeating-linear-gradient(-45deg, #045c7f 0px, #045c7f 5px, #40d8d0 5px, #40d8d0 10px)',
  },
  {
    color: 'rgb(82,191,255)',
    gradient:
      'repeating-linear-gradient(-45deg, #0b5494 0px, #0b5494 5px, #52bfff 5px, #52bfff 10px)',
  },
  {
    color: 'rgb(255,134,166)',
    gradient:
      'repeating-linear-gradient(-45deg, #8e366e 0px, #8e366e 5px, #ff86a6 5px, #ff86a6 10px)',
  },
  {
    color: 'rgb(63,162,254)',
    gradient:
      'repeating-linear-gradient(-45deg, #3fa2fe 0px, #3fa2fe 5px, #e5424f 5px, #e5424f 10px, #ffffff 10px, #ffffff 15px)',
  },
  {
    color: 'rgb(255,144,94)',
    gradient:
      'repeating-linear-gradient(-45deg, #ff905e 0px, #ff905e 5px, #32a527 5px, #32a527 10px, #ffffff 10px, #ffffff 15px)',
  },
  {
    color: 'rgb(102,211,100)',
    gradient:
      'repeating-linear-gradient(-45deg, #66d364 0px, #66d364 5px, #d5444f 5px, #d5444f 10px, #ffffff 10px, #ffffff 15px)',
  },
  {
    color: 'rgb(34,188,226)',
    gradient:
      'repeating-linear-gradient(-45deg, #22bce2 0px, #22bce2 5px, #3da240 5px, #3da240 10px, #ffffff 10px, #ffffff 15px)',
  },
  {
    color: 'rgb(34,188,226)',
    gradient:
      'repeating-linear-gradient(-45deg, #22bce2 0px, #22bce2 5px, #ff9778 5px, #ff9778 10px, #ffda6b 10px, #ffda6b 15px)',
  },
  {
    color: 'rgb(151,145,255)',
    gradient:
      'repeating-linear-gradient(-45deg, #9791ff 0px, #9791ff 5px, #f2731d 5px, #f2731d 10px, #ffdb59 10px, #ffdb59 15px)',
  },
  {
    color: 'rgb(61,166,235)',
    gradient:
      'repeating-linear-gradient(-45deg, #3da6eb 0px, #3da6eb 5px, #eea51d 5px, #eea51d 10px, #ffffff 10px, #ffffff 15px)',
  },
];

export function getColorIndexByUsername(username: string): number {
  let charSum = 0;

  for (let charIndex = 0; charIndex < username.length; charIndex++) {
    charSum += username.charCodeAt(charIndex);
  }

  return charSum;
}

export function getColorByIndex(index: number): string {
  return colors[index % colors.length].color;
}

export function getGradientByIndex(index: number): string {
  return colors[index % colors.length].gradient;
}
