import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import PostsPage from './pages/PostsPage';
import PostDetailsPage from './pages/PostDetailsPage';
import NewPostPage from './pages/NewPost';

const Stack = createStackNavigator();
const App = () => (
  <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostsPage" component={PostsPage} options={{ title: "Posts" }} />
        <Stack.Screen name="DetailsPage" component={PostDetailsPage} options={{ title: "Details" }} />
        <Stack.Screen name="NewPostPage" component={NewPostPage} options={{ title: "New Post" }} />
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
);

export default App;
