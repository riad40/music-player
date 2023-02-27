import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './screens/Home';
import Library from './screens/Library';
import Settings from './screens/Settings';
import AudioPlayer from './screens/AudioPlayer';
import {DataProvider} from './context/DataContext';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Library') {
                iconName = focused ? 'library' : 'library-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Player') {
                iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#1DB954',
            tabBarInactiveTintColor: '#b3b3b3',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#000',
              borderTopWidth: 0,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              marginBottom: 4,
              fontWeight: 'bold',
            },
          })}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Library" component={Library} />
          <Tab.Screen name="Player" component={AudioPlayer} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
};

export default AppNavigator;
