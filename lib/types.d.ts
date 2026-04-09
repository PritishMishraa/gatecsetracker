// export interface TTweet {
//   author_id: string;
//   id: string;
//   conversation_id: string;
//   text: string;
//   edit_history_tweet_ids: string[];
//   conversation: Conversation[];
// }

// export interface Conversation {
//   edit_history_tweet_ids: string[];
//   in_reply_to_user_id: string;
//   id: string;
//   text: string;
//   author_id: string;
// }

type Video = {
  index: string;
  thumbnailUrl: string;
  videoTitle: string;
  videoLink: string;
  channelName: string;
  views: string;
  uploadedTime: string;
  videoTime: string;
  videoDurationInSeconds: number;
};

type Playlist = {
  name: string;
  slug: string;
  dataFile: string;
  youtubePlaylistUrl: string;
  channelName: string;
  access: "free" | "auth";
};
