import { ObjectId } from 'mongodb';
export const getItemsPipeline = async (items) => {
  const productIds = items.map((item) => item.productId);
  const productObjectIds = productIds.map((id) => new ObjectId(id));
  const pipeline = [
    {
      $match: {
        _id: {
          $in: productObjectIds,
        },
      },
    },
    {
      $addFields: {
        productDetails: {
          $map: {
            input: items,
            as: 'item',
            in: {
              $cond: {
                if: {
                  $eq: [
                    '$_id',
                    { $convert: { input: '$$item.productId', to: 'objectId' } },
                  ],
                },
                then: '$$item',
                else: '$$REMOVE',
              },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        quantity: {
          $arrayElemAt: ['$productDetails.quantity', 0],
        },
        size: {
          $arrayElemAt: ['$productDetails.size', 0],
        },
      },
    },
  ];
  return pipeline;
};
