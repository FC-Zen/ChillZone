import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Counter } from '@components';
import { styles } from './style';

export type ItemProps = {
    id: number;
    name: string;
    type:  string;
    price: number;
    quantity: number;
    meals?: string[];
    onIncrement: () => void;
    onDecrement: () => void;
    onDelete: () => void;
};

export type CommandListProps = {
    commands: ItemProps[];
};

export const CommandList: React.FC<CommandListProps> = ({ 
    commands,
}) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.items}>
                {commands.map((command) => (
                    command.type === 'menu' ?
                    <View key={command.id} style={styles.menu}>
                        <View style={styles.item}>
                            <Text style={styles.name}>{command.name}</Text>
                            <Counter
                                quantity={command.quantity}
                                onIncrement={command.onIncrement}
                                onDecrement={command.onDecrement}
                                onDelete={command.onDelete}
                                variant='small'
                            />
                            <Text style={styles.price}>{command.price}€</Text>
                        </View>
                        {
                            command.meals?.map((meal) => (
                                <Text key={meal} style={[styles.name, { paddingLeft: 40 }]}>{meal}</Text>
                            ))
                        }
                    </View>
                    :
                    <View key={command.id} style={styles.item}>
                        <Text style={styles.name}>{command.name}</Text>
                        <Counter
                            quantity={command.quantity}
                            onIncrement={command.onIncrement}
                            onDecrement={command.onDecrement}
                            onDelete={command.onDelete}
                            variant='small'
                        />
                        <Text style={styles.price}>{command.price}€</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};