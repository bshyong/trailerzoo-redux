export default function() {
  return new Promise((resolve) => {
    resolve({
      pageInfo: {
          totalResults: 1000000,
          resultsPerPage: 5
      },
      movies: [{
          id: "uuid-1",
          publishedAt: "2015-06-09T13:00:02.000Z",
          title: "The Martian Official Trailer #1 (2015) - Matt Damon, Kristen Wiig Movie HD",
          thumbnailUrl: "https://i.ytimg.com/vi/lQqhfq87FgY/hqdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=lQqhfq87FgY",
          trailers: [{
              name: "Trailer #1",
              url: "#"
          }]
      }, {
          id: "uuid-2",
          publishedAt: "2015-06-10T16:13:12.000Z",
          title: "Fantastic Four Official Trailer #1 (2015) - Miles Teller, Michael B. Jordan Movie HD",
          thumbnailUrl: "https://i.ytimg.com/vi/wuV4BCYv-YY/hqdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=wuV4BCYv-YY",
          trailers: [{
              name: "Trailer #1",
              url: "#"
          }]
      }, {
          id: "uuid-3",
          publishedAt: "2015-06-11T16:13:12.000Z",
          title: "Zootopia Official Teaser Trailer #1 (2016) - Disney Animated Movie HD",
          thumbnailUrl: "https://i.ytimg.com/vi/5nP9hU8eUfE/hqdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=5nP9hU8eUfE",
          trailers: [{
              name: "Trailer #1",
              url: "#"
          }]
      }, {
          id: "uuid-4",
          publishedAt: "2015-06-10T13:37:38.000Z",
          title: "Regression Official Trailer #1 (2015) - Emma Watson, Ethan Hawke Movie HD",
          thumbnailUrl: "https://i.ytimg.com/vi/-pBwIsVGaL4/hqdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=-pBwIsVGaL4",
          trailers: [{
              name: "Trailer #1",
              url: "#"
          }]
      }, {
          id: "uuid-5",
          publishedAt: "2015-06-04T15:34:54.000Z",
          title: "Mission: Impossible Rogue Nation Official Trailer #2 (2015) - Tom Cruise Action Movie HD",
          thumbnailUrl: "https://i.ytimg.com/vi/hmidVepX2gQ/hqdefault.jpg",
          videoUrl: "https://www.youtube.com/watch?v=hmidVepX2gQ",
          trailers: [{
              name: "Trailer #1",
              url: "#"
          }]
      }]
    });
  });
}
