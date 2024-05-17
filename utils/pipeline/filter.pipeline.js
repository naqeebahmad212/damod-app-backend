const mongoose = require("mongoose");

const queryFilterPipeline = (query) => {
  let filterQueryArray = [];
  let { search, page, limit, ...rest } = query;
  console.log(query);

  if (!search) {
    search = "";
  }
  // *Adding Search query
  filterQueryArray.push({
    $match: {
      $or: [
        { shape: { $regex: search, $options: "i" } },
        {
          certificateNo: { $regex: search, $options: "i" },
        },
        {
          price: { $regex: search, $options: "i" },
        },
        {
          weight: { $regex: search, $options: "i" },
        },
        {
          color: { $regex: search, $options: "i" },
        },
        {
          shade: {
            $regex: search,
            $options: "i",
          },
        },
        {
          clarity: {
            $regex: search,
            $options: "i",
          },
        },
        {
          sieve: {
            $regex: search,
            $options: "i",
          },
        },
        {
          lab: {
            $regex: search,
            $options: "i",
          },
        },
        {
          polish: {
            $regex: search,
            $options: "i",
          },
        },
        {
          symmetry: {
            $regex: search,
            $options: "i",
          },
        },
        {
          fluorescense: {
            $regex: search,
            $options: "i",
          },
        },
        {
          inclusion: {
            $regex: search,
            $options: "i",
          },
        },
        {
          pricePerCaret: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    },
  });
  if (search == "") filterQueryArray.pop();
  if (Object.keys(rest).length) {
    filterQueryArray.push({
      $match: {
        $and: [
          ...Object.keys(rest).map((key) => {
            let search = rest[key];
            if (
              key == "price" ||
              key == "weight" ||
              key == "size" ||
              key == "table" ||
              key == "totalDepth" ||
              key == "discount"
            ) {
              let minValue = parseFloat(search.from);
              let maxValue = parseFloat(search.to);

              if (!isNaN(minValue) && !isNaN(maxValue)) {
                return {
                  [key]: { $gte: minValue, $lte: maxValue },
                };
              }
            } else if (key == "mease1") {
              let minValue = parseFloat(search.from);
              let maxValue = parseFloat(search.to);
              if (!isNaN(minValue) && !isNaN(maxValue)) {
                return {
                  [`${key}.from`]: { $gte: minValue },
                  [`${key}.to`]: { $lte: maxValue },
                };
              }
            }
            return {
              [key]: { $regex: search, $options: "i" },
            };
          }),
        ],
      },
    });
  }

  if (page && limit) {
    // *Now filter based on Currentpage and limit

    filterQueryArray.push(
      {
        $skip: (parseInt(page) - 1) * +limit,
      },
      {
        $limit: +limit,
      }
    );
  }
  const totalCountPipeline = [
    {
      $count: "total",
    },
  ];
  return [
    {
      $facet: {
        filteredResult: filterQueryArray,
        totalCount: totalCountPipeline,
      },
    },
  ];
};

const stockFilterPipeline = () => {
  let filterQueryArray = [];
  filterQueryArray.push({
    $group: {
      _id: "$shape", // Group by shape field
      count: { $sum: 1 }, // Count the number of diamonds in each group
    },
  });
  return filterQueryArray;
};

const userSearchRecordFilterPipeline = () => {
  let filterQueryArray = [];
  filterQueryArray.push(
    {
      $unwind: "$diamond", // Deconstructs the diamond array
    },
    {
      $lookup: {
        from: "users", // The collection to perform the lookup on
        localField: "user", // The local field from the current collection
        foreignField: "_id", // The field from the collection being looked up
        as: "user", // The field where the result will be stored
      },
    },
    {
      $lookup: {
        from: "diamonds", // The collection to perform the lookup on
        localField: "diamond", // The local field from the current collection
        foreignField: "_id", // The field from the collection being looked up
        as: "diamond", // The field where the result will be stored
      },
    },
    {
      $unwind: "$user", // Deconstructs the user array
    },
    {
      $unwind: "$diamond", // Deconstructs the diamond array
    },
    {
      $project: {
        // Project the fields you want in the output
        user: "$user", // Include the populated user field
        diamond: "$diamond", // Include the populated diamond field
        createdAt: 1, // Include the createdAt date
      },
    }
  );
  return filterQueryArray;
};

const mostSearchedShapeFilterPipeline = () => {
  let filterQueryArray = [];
  filterQueryArray.push(
    {
      $unwind: "$diamond", // Deconstructs the diamond array
    },
    {
      $lookup: {
        from: "users", // The collection to perform the lookup on
        localField: "user", // The local field from the current collection
        foreignField: "_id", // The field from the collection being looked up
        as: "user", // The field where the result will be stored
      },
    },
    {
      $lookup: {
        from: "diamonds", // The collection to perform the lookup on
        localField: "diamond", // The local field from the current collection
        foreignField: "_id", // The field from the collection being looked up
        as: "diamond", // The field where the result will be stored
      },
    },
    {
      $unwind: "$user", // Deconstructs the user array
    },
    {
      $unwind: "$diamond", // Deconstructs the diamond array
    },
    {
      $group: {
        _id: "$diamond._id", // Group by diamond id
        count: { $sum: 1 }, // Count occurrences of each diamond
        users: { $addToSet: "$user._id" }, // Collect unique user ids for each diamond
      },
    },
    {
      $match: {
        count: { $gt: 1 }, // Filter out diamonds that occur more than once
      },
    },
    {
      $lookup: {
        from: "diamonds", // The collection to perform the lookup on
        localField: "_id", // The local field from the current collection
        foreignField: "_id", // The field from the collection being looked up
        as: "diamond_shape", // The field where the result will be stored
      },
    },
    {
      $unwind: "$diamond_shape", // Deconstructs the diamond_shape array
    },
    {
      $project: {
        _id: "$diamond_shape.shape", // Include the name of the shape in the output
      },
    }
  );
  return filterQueryArray;
};

module.exports = {
  queryFilterPipeline,
  stockFilterPipeline,
  userSearchRecordFilterPipeline,
  mostSearchedShapeFilterPipeline,
};
