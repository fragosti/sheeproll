import React, { useState } from 'react';
import Histogram from 'react-chart-histogram';
import { render } from 'react-dom';
import styled from 'styled-components';

import logoImg from "./img/logo.png";

const Container = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
`;

const Header = styled.h1`
`

const RollContainer = styled.div`
  display: flex;
`;

const Roll = styled.button`
  border-radius: 15px;
  height: 75px;
  width: 75px;
  margin: 15px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 150px;
  heigth: 150px;
`;

const LastRoll = styled.h2`
  font: serif;
  font-size: 96px;
`

//                 2       3     4      5      6      7      8      9      10     11     12     
//                 0       1     2      3      4      5      6      7       8     9      10   
type RollData = [number,number,number,number,number,number,number,number,number,number,number];
const labels = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const startingRollData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const maxRollBeforeReset = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5, 
  7: 6,
  8: 5,
  9: 4,
  10: 3,
  11: 2,
  12: 1,
};

const randomRoll = () => {
  const x = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
  const  y = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
  return x + y;
}

const Application: React.SFC<{}> = () => {
  const [rollData, setRollData] = useState<RollData>(startingRollData);
  const [lastRoll, setLastRoll] = useState<undefined | number>();
  const onRollClick = (shouldPersistLastRoll: boolean) => {
    const roll = randomRoll();
    if (shouldPersistLastRoll) {
      const newRollData = [...rollData];
      const rollIndex = lastRoll - 2;
      newRollData[rollIndex] += 1; 
      setRollData(newRollData);
    }
    setLastRoll(roll);
  } 
  return (
    <Container>
      <Header>Sheep Roll</Header>
      <Logo src={logoImg}/>
      <RollContainer>
        <Roll onClick={() => onRollClick(true)}>Roll</Roll>
        <Roll onClick={() => onRollClick(true)}>Re-roll</Roll>
      </RollContainer>
      {lastRoll &&
          <LastRoll>{lastRoll}</LastRoll>
        }
      <Histogram
        xLabels={labels}
        yValues={rollData}
        width='400'
        height='200'
        options={{
          fillColor: '#7ca311', 
          strokeColor: '#fffbc9'
        }}
      />
    </Container>
  )
}

render(<Application />, document.getElementById('root'));