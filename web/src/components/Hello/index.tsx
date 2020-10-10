import * as React from 'react';


function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
  }
  
export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

function Hello({ name, enthusiasmLevel = 1 }: Props) {
    if (enthusiasmLevel <= 0) {
    throw new Error('You could be a little more enthusiastic. :D');
  }
  const exclamationMarks = getExclamationMarks;
  return (
    <div className="hello">
      <div className="greeting">
        Hello {name + exclamationMarks(enthusiasmLevel)}
      </div>
    </div>
  );
}

export default Hello;