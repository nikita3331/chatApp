export type Message={
    name:String 
}   
export type messagesState={
    messageArray:Array<Message>
}

export type IntroMessage= {
    lastMessage: String;
    date: Date;
    avatarURI: String;
}