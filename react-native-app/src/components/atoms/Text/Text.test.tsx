import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from './Text';

describe('Text Component', () => {
  it('should render text correctly', () => {
    const { getByText } = render(<Text>Test Text</Text>);
    const textElement = getByText('Test Text');
    expect(textElement).toBeTruthy();
  });

  it('should apply custom styles', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const { getByText } = render(<Text style={customStyle}>Styled Text</Text>);

    const textElement = getByText('Styled Text');
    // Vérifie si les styles ont bien été appliqués
    expect(textElement.props.style).toEqual(
      expect.objectContaining(customStyle)
    );
  });
});
