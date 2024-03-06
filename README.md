# Fetch_ItemList

## Start Guide

I generate the start code using [expo](https://expo.dev/). Please *not* re-run the expo init command. Instead, in this directory, simply run...

```bash
npm install
npm run ios
```

To test this app, there are a few options. If you have a smart device, I would recommend using the expo app for [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US). You can scan the QR code using your phone, or you can launch commands via the terminal. Otherwise, you can use an emulator (such as [AVD](https://developer.android.com/studio/run/emulator)). The significant portions of the source code are located in the files App.js and GroupHeader.js.

### Structure Design 
1. Utilize the GroupHeader Component to categorize all items by their listId, ensuring a concise and organized display on the main page, while also being mindful to avoid hardcoding.
2. Filtering out blank or null "name" entries **first** ensures operations like sorting and grouping are only applied to relevant data, enhancing efficiency.
3. Use FlatList for efficient rendering of long lists, as it lazily loads items on-screen and unloads off-screen items, reducing memory usage. (Source:[React Native](https://reactnative.dev/docs/scrollview))
4. The design references the category user interface of fetch Version 3.37.0.!["fetch source"](/Desktop/Chuan_Tian/assets/fetchList.jpg)

### API Notes
All data can be retrieved via API calls to `https://fetch-hiring.s3.amazonaws.com/hiring.json`, provided by Fetch.
