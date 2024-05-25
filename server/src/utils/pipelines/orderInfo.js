export const getOrderInfoPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'customer',
      foreignField: '_id',
      as: 'customer',
    },
  },
  {
    $lookup: {
      from: 'addresses',
      localField: 'address',
      foreignField: '_id',
      as: 'address',
    },
  },
  {
    $lookup: {
      from: 'payments',
      localField: 'paymentId',
      foreignField: '_id',
      as: 'payment',
    },
  },
  {
    $unwind: '$items',
  },
  {
    $lookup: {
      from: 'products',
      localField: 'items.productId',
      foreignField: '_id',
      as: 'items.product',
    },
  },
  {
    $unwind: '$items.product',
  },
  {
    $lookup: {
      from: 'categories',
      localField: 'items.product.category',
      foreignField: '_id',
      as: 'items.product.category',
    },
  },
  {
    $group: {
      _id: '$_id',
      orderPrice: {
        $first: '$orderPrice',
      },
      customer: {
        $first: '$customer',
      },
      address: {
        $first: '$address',
      },
      status: {
        $first: '$status',
      },
      payment: {
        $first: '$payment',
      },
      isPaymentDone: {
        $first: '$isPaymentDone',
      },
      items: {
        $push: '$items',
      },
    },
  },
  {
    $addFields: {
      customer: {
        $mergeObjects: [
          {
            _id: {
              $arrayElemAt: ['$customer._id', 0],
            },
            name: {
              $arrayElemAt: ['$customer.name', 0],
            },
            username: {
              $arrayElemAt: ['$customer.username', 0],
            },
            email: {
              $arrayElemAt: ['$customer.email', 0],
            },
          },
        ],
      },
      address: {
        $mergeObjects: ['$address'],
      },
      payment: {
        $mergeObjects: [
          {
            _id: {
              $arrayElemAt: ['$payment._id', 0],
            },
            price: {
              $arrayElemAt: ['$payment.price', 0],
            },
            stripeId: {
              $arrayElemAt: ['$payment.stripeId', 0],
            },
            status: {
              $arrayElemAt: ['$payment.status', 0],
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      _id: 1,
      orderPrice: 1,
      customer: 1,
      address: 1,
      status: 1,
      payment: 1,
      items: {
        $map: {
          input: '$items',
          as: 'item',
          in: {
            $mergeObjects: [
              {
                quantity: '$$item.quantity',
                size: '$$item.size',
              },
              {
                product: {
                  $mergeObjects: [
                    '$$item.product',
                    {
                      category: {
                        $arrayElemAt: ['$$item.product.category', 0],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  },
];
