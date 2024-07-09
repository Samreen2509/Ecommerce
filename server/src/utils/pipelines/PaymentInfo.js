export const getPaymentInfoPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'userInfo',
    },
  },
  {
    $unwind: '$userInfo',
  },
  {
    $addFields: {
      username: '$userInfo.username',
    },
  },
  {
    $project: {
      userInfo: 0,
      __v: 0,
    },
  },
];
