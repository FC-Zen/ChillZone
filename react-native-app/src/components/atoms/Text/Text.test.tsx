import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from './Text';

describe('Text Component', () => {
  it('should render text correctly', () => {
    const { getByText } = render(<Text>Test Text</Text>);
    expect(getByText('Test Text')).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const { getByText } = render(<Text style={customStyle}>Styled Text</Text>);

    const textElement = getByText('Styled Text');
    expect(textElement.props.style).toEqual(customStyle);
  });
});
