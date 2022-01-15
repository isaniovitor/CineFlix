import React from 'react';
import { ActivityIndicator } from 'react-native';

import * as Sty from './styles';

interface IndicatorProps {
  label: string;
}

const Indicator: React.FC<IndicatorProps> = ({ label }) => {
  return (
    <Sty.IndContainer>
      <ActivityIndicator size={100} color="gray" />
      <Sty.Title>{label}</Sty.Title>
    </Sty.IndContainer>
  );
};

export default Indicator;
