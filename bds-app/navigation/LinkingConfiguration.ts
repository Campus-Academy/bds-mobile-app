/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

 import { LinkingOptions } from '@react-navigation/native';
 import * as Linking from 'expo-linking';
 
 import { RootStackParamList } from '../types';
 
 const linking: LinkingOptions<RootStackParamList> = {
   prefixes: [Linking.makeUrl('/')],
   config: {
     screens: {
       Root: {
         screens: {
           Home: {
             screens: {
               HomeScreen: 'home',
             },
           },
           Events: {
            screens: {
              SportsScreen: 'events',
            },
          },
           Sports: {
             screens: {
               SportsScreen: 'sports',
             },
           },
           
           Administration: {
            screens: {
              SportsScreen: 'admin',
            },
          },
           Profile: {
             screens: {
               ProfileScreen: 'profile',
             },
           },
         },
       },
       AddEventModal: 'event-modal',
       AddNewModal: 'new-modal',
       ModifyNewModal: 'edit-modal',
       Login: 'login',
       SignIn: 'signin',
       NewsManagement: 'news-management',
       NotFound: '*',
     },
   },
 };
 
 export default linking;
 