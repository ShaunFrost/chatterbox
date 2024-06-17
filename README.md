# Chatterbox

### Firebase Realtime DB Schema

```
-DB
  -users
    -userId
      -id
      -email
      -username
      -isOnline
      -conversations
        -[userid]: conversationid
  -messages
    -conversationId
      -messageId
        -sender
        -text
        -timestamp
        -status
```
We have two main json trees in the Realtime DB.
The `users` tree stores information related to the users and reference to the conversations with other users.
The `messages` tree stores information about all the messages involved in the conversations between the users.

### Firebase Auth

Firebase login using email/password auth method is used in Chatterbox webapp.
