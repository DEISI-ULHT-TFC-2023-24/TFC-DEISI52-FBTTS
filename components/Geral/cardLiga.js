import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {StyleSheet} from "react-native";

// Define a custom left content for the card
const LeftContent = ({ image }) => <Avatar.Image source={image} size={48} />;

// Define the CardLeague component to display league information
const CardLeague = ({ league }) => (
    <Card>
        <Card.Title title={league.name} left={() => <LeftContent image={league.image} />} />
        <Card.Content>
            <Text>Country: {league.country}</Text>
            <Text>Division: {league.division}</Text>
        </Card.Content>
        <Card.Actions>
            <Button>View Details</Button>
        </Card.Actions>
    </Card>
);

export default CardLeague;

const styles = StyleSheet.create({
    country: {
        alignItems: 'center',
    }
})
