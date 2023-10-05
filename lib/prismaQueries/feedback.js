export const allFeedback = {
  title: true,
  detail: true,
  id: true,
  upvotes: true,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  status: {
    select: {
      id: true,
      name: true,
    },
  },
  comments: {
    select: {
      id: true,
    },
  },
};
