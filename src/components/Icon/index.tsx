import {
  Ionicons,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  Foundation,
  Fontisto,
  MaterialIcons,
} from '@expo/vector-icons';
import React from 'react';

interface IconProps {
  type?: string;
  name: any;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  type = 'materialCommunityIcons',
  name,
  size,
  color,
}) => {
  const iconProps = {
    name,
    size,
    color,
  };

  const icons = {
    'font-5': <FontAwesome5 {...iconProps} />,
    font: <FontAwesome {...iconProps} />,
    foundation: <Foundation {...iconProps} />,
    ionicons: <Ionicons {...iconProps} />,
    material: <MaterialIcons {...iconProps} />,
    fontisto: <Fontisto {...iconProps} />,
    materialCommunityIcons: <MaterialCommunityIcons {...iconProps} />,
  };

  return icons[type];
};

export default Icon;
