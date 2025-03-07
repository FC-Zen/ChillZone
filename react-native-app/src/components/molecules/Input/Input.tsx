import React, { FC, useState } from 'react';
import {
  StyleProp,
  TextInput,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import { InputWrapper, InputIcon, InputStyles } from './style';
import { Icon, IconProps } from '@components/atoms';
import { colors } from '@theme';

export type InputProps = {
  testID?: string;
  placeholder: string;
  icon?: IconProps['name'];
  subIcon?: IconProps['name'];
  onChangeText?: (text: string) => void;
  value?: string;
  variant?: 'default' | 'password' | 'subtitled' | 'search' | 'select';
  style?: StyleProp<ViewStyle>;
  subtitle?: string;
  subtitleColor?: string;
  textSize?: number;
  data?: string[];
  onFilter?: (filteredData: string) => void;
  onSelect?: (selected: string) => void;
  disabled?: boolean;
};

export const Input: FC<InputProps> = ({
  testID,
  icon,
  subIcon,
  onChangeText,
  placeholder,
  value,
  variant = 'default',
  style,
  subtitle = '',
  subtitleColor,
  textSize,
  onFilter,
  data = [],
  onSelect,
  disabled = false,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(
    variant === 'password'
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const [isIconRotated, setIconRotated] = useState(false);

  const handleChange = (text: string) => {
    if (variant === 'select') return;
    onChangeText?.(text);
    if (onFilter) {
      onFilter(text);
    }
  };

  const handleSelect = (item: string) => {
    setSelectedValue(item);
    setDropdownVisible(false);
    setIconRotated(false);
    onSelect?.(item);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
    setIconRotated((prev) => !prev);
  };

  return (
    <View
      style={[
        InputStyles.container,
        variant === 'subtitled' &&
          subtitle !== '' &&
          InputStyles.subtitledContainer,
      ]}
    >
      <InputWrapper
        style={style}
        placeholder={placeholder}
        onChangeText={handleChange}
        value={value}
        testID={testID}
      >
        {icon && (
          <InputIcon>
            <Icon name={icon} />
          </InputIcon>
        )}
        {variant === 'select' ? (
          <TouchableOpacity
            style={[InputStyles.input, InputStyles.selectInput]}
            onPress={toggleDropdown}
            disabled={disabled}
          >
            <Text
              style={{
                flex: 1,
                color: selectedValue ? colors.black : colors.silver,
                fontSize: textSize || InputStyles.input.fontSize,
              }}
            >
              {selectedValue || placeholder}
            </Text>
            <TouchableOpacity
              style={{
                transform: [{ rotate: isIconRotated ? '180deg' : '0deg' }],
              }}
            >
              <Icon name="AngleDown" />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : (
          <TextInput
            style={[InputStyles.input, textSize ? { fontSize: textSize } : {}]}
            placeholder={placeholder}
            onChangeText={handleChange}
            value={value}
            secureTextEntry={isPasswordVisible}
            placeholderTextColor={colors.silver}
            pointerEvents={disabled ? 'none' : 'auto'}
            editable={!disabled}
            focusable={!disabled}
            testID={testID}
          />
        )}
      </InputWrapper>
      {variant === 'subtitled' && subtitle !== '' && (
        <Text style={{ color: subtitleColor }}>{subtitle}</Text>
      )}
      {variant === 'select' && isDropdownVisible && (
        <View style={InputStyles.dropdown}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={InputStyles.dropdownItem}
              onPress={() => handleSelect(item)}
            >
              <View style={InputStyles.dropdownRow}>
                {subIcon && (
                  <Icon
                    name={subIcon}
                    color={colors.resolutionBlue}
                    style={InputStyles.subIcon}
                  />
                )}
                <Text style={InputStyles.dropdownText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
