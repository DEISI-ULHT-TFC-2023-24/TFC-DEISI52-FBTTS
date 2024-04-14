import { createStackNavigator } from '@react-navigation/stack';
import VerEstrategia from "../../screens/VerEstrategia";

const Stack = createStackNavigator();

export const VerEstrategiaStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Ver Estratégia" component={VerEstrategia} />
    </Stack.Navigator>
);
