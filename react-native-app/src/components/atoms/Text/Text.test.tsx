// src/components/atoms/Text/Text.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from './Text';

test('affiche correctement le texte', () => {
  const { getByText } = render(<Text>Bonjour</Text>); // Rendre le composant
  const textElement = getByText('Bonjour'); // Vérifie que le texte est bien dans le rendu
  expect(textElement).toBeTruthy(); // Vérifie que l'élément existe
});
// No need to implement the expect function as it is already provided by the testing framework
