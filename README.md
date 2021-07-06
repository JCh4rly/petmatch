# Petmatch [WIP]
A sample ReactNative application for contacting pet owners

## Important note
This is a WIP project and is by no means a fully functional product

## Main characteristics
Petmatch is an application for pet owners interested in posting info about their pets with
the goals of mating or adopting. 

The user posts detailed info including the type of pet (dog, cat), its breed, sex and age, 
with the possibility of posting a picture. These posts are listed on the main page so other users of the app are able to select the ones that are
of interest. Filtering options should be available to help users find a perfect match for their pets.

The app should notify a user when someone hits the "Like" button on the post and so 
begin a contact, for example via an itegrated chat room. Future releases may include social networks integrations.

## What I got so far
The app is currently under development. So far there are only three screens implemented:
- Posts: Listing of published posts
- Details: Displays pet-related info including a single picture
- New post: A simple form for creating a new post

## Technical info
Petmatch is an Expo based app connected to a firebase backend, with ReactNavigation as a routing engine. The base components library is provided by Nativebase.
