import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';
import PostsPage from './pages/PostsPage';
import PostDetailsPage from './pages/PostDetailsPage';
import NewPostPage from './pages/NewPost';

LogBox.ignoreLogs(['Setting a timer for a long period of time']);
const Stack = createStackNavigator();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = () => (
  <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostsPage" component={PostsPage} options={{ title: 'Posts' }} />
        <Stack.Screen name="DetailsPage" component={PostDetailsPage} options={{ title: 'Details' }} />
        <Stack.Screen name="NewPostPage" component={NewPostPage} options={{ title: 'New Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
);

export default App;
