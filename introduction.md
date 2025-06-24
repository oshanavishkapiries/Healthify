GET
Get bookmark 
https://server-heathify.ddnsfree.com/api/user/bookmarks
rosponce 
{
  "success": true,
  "message": "Bookmarks fetched successfully",
  "data": {
    "blogs": [
      {
        "_id": "666000a72f1b4c1f1a1a1002",
        "title": "Top 10 Superfoods for Glowing Skin",
        "description": "Foods that help you get radiant and healthy skin naturally.",
        "image": "https://picsum.photos/1600/900?random=2",
        "categoryId": {
          "_id": "665f05fa2f1b4c1f1a1a0003",
          "category": "Beauty"
        }
      },
      {
        "_id": "666000a72f1b4c1f1a1a1001",
        "title": "Understanding Mental Health",
        "description": "A guide to understanding mental health and its importance in daily life.",
        "image": "https://picsum.photos/1600/900?random=1",
        "categoryId": {
          "_id": "665f05fa2f1b4c1f1a1a0002",
          "category": "Health"
        }
      }
    ],
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  },
  "timestamp": "2025-06-24T09:13:13.186Z"
}



POST
Set bookmark
https://server-heathify.ddnsfree.com/api/user/bookmarks
{
    "blogId":"666000a72f1b4c1f1a1a1002"
}

DELETE
remove bookmark 
https://server-heathify.ddnsfree.com/api/user/bookmarks/666000a72f1b4c1f1a1a1002