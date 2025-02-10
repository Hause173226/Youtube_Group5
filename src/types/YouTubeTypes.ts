// export interface Video {
//   id: string;
//   snippet: {
//     title: string;
//     channelTitle: string;
//     channelId: string;
//     description: string;
//     thumbnails: {
//       high: {
//         url: string;
//       };
//     };
//   };
//   statistics: {
//     viewCount: string;
//   };
// }
export interface Video {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    channelId: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    publishedAt: string; // Thêm ngày phát hành video
  };
  statistics: {
    viewCount: number; // Đổi từ string sang number cho dễ xử lý
  };
}
